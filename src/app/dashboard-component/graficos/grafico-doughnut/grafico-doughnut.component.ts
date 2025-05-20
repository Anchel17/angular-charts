import { Component, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry, TooltipCallbacks, TooltipItem, TooltipModel } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataConfig } from 'src/app/models/ChartDataConfig';

@Component({
  selector: 'app-grafico-doughnut',
  templateUrl: './grafico-doughnut.component.html',
  styleUrls: ['./grafico-doughnut.component.css']
})
export class GraficoDoughnutComponent {
  public pieChartType: ChartType = 'doughnut';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  public pieChartDataConfig!: ChartDataConfig;

  @Input()
  public tooltipCallbacks!: _DeepPartialObject<TooltipCallbacks<keyof ChartTypeRegistry, TooltipModel<keyof ChartTypeRegistry>,
   TooltipItem<keyof ChartTypeRegistry>>>;

  @Input()
  public labelsPieChart!: string[];

  @Input()
  public chartColors!: string[];

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
    },
    animation: false
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
    this.pieChartOptions!.plugins!.tooltip!.callbacks = this.tooltipCallbacks;
  }

  private configurarChartData(){
    this.pieChartData.datasets[0].data = this.pieChartDataConfig.datasetData;
    this.pieChartData.datasets[0].label = this.pieChartDataConfig.datasetLabel;
    this.pieChartData.datasets[0].backgroundColor = this.chartColors;
    this.pieChartData.labels = this.labelsPieChart ? this.labelsPieChart : this.pieChartDataConfig.labels;
  }
}
