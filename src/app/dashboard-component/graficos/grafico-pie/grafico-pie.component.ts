import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry, TooltipCallbacks, TooltipItem, TooltipModel } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataConfig } from 'src/app/models/ChartDataConfig';

@Component({
  selector: 'app-grafico-pie',
  templateUrl: './grafico-pie.component.html',
  styleUrls: ['./grafico-pie.component.css']
})
export class GraficoPieComponent {
  public pieChartType: ChartType = 'pie';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  public pieChartDataConfig!: ChartDataConfig;

  @Input()
  public tooltipCallbacks!: _DeepPartialObject<TooltipCallbacks<keyof ChartTypeRegistry, TooltipModel<keyof ChartTypeRegistry>,
   TooltipItem<keyof ChartTypeRegistry>>>;

  @Input()
  public labelsPieChart!: string[];

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          filter: (legendItem, data) => {
            return true
          }
        }
      },
      tooltip: {
        callbacks: {}
      }
    }
  }

  public pieChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: '',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: []
  }

    ngOnChanges(changes: SimpleChanges){
      this.configurarOptions();
      this.configurarChartData();
      this.chart?.update();
    }

    private configurarOptions(){
      this.pieChartOptions!.plugins!.tooltip!.callbacks = this.tooltipCallbacks;
    }

    private configurarChartData(){
      this.pieChartData.datasets[0].data = this.pieChartDataConfig.datasetData;
      this.pieChartData.datasets[0].label = this.pieChartDataConfig.datasetLabel;
      this.pieChartData.labels = this.labelsPieChart ? this.labelsPieChart : this.pieChartDataConfig.labels;
    }
}
