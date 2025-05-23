import { Component, HostListener, Input, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
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

  @Input()
  public chartColor!: string;

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 1.5
  }

  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: '',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        backgroundColor: '#ff0000',
        borderColor: '#00ff00',
        pointBackgroundColor: '#000',
      }
    ]
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
    this.chart?.render();
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
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  private configurarChartData(){
    this.chartData.datasets[0].data = this.lineChartDataConfig.datasetData;
    this.chartData.datasets[0].label = this.lineChartDataConfig.datasetLabel;
    this.chartData.datasets[0].backgroundColor = this.chartColor;
    this.chartData.datasets[0].borderColor = this.chartColor;
    this.chartData.labels = this.lineChartDataConfig.labels;

    this.chart?.update();
  }
}
