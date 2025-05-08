import { Component, Input, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry, PluginOptionsByType } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataConfig } from 'src/app/models/ChartDataConfig';

@Component({
  selector: 'app-grafico-de-linha',
  templateUrl: './grafico-de-linha.component.html',
  styleUrls: ['./grafico-de-linha.component.css']
})
export class GraficoDeLinhaComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  public lineChartDataConfig!: ChartDataConfig;

  @Input()
  public lineChartOptionsPlugins!: _DeepPartialObject<PluginOptionsByType<keyof ChartTypeRegistry>>;

  @Input()
  public maxYValue!: number;

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
  }

  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: '',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ]
  }

  ngOnChanges(changes: SimpleChanges){
    this.configurarOptions();
    this.configurarChartData();
    this.chart?.update();
  }

  private configurarOptions(){
    this.lineChartOptions!.plugins = this.lineChartOptionsPlugins;
    this.lineChartOptions!.scales = {
      y: {
        position: 'left',
        min: 0,
        max: this.maxYValue
      }
    }
  }

  private configurarChartData(){
    this.chartData.datasets[0].data = this.lineChartDataConfig.datasetData;
    this.chartData.datasets[0].label = this.lineChartDataConfig.datasetLabel;
    this.chartData.labels = this.lineChartDataConfig.labels;

    this.chart?.update();
  }
}
