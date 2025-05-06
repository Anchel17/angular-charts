import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry, TooltipCallbacks, TooltipItem, TooltipModel } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-pie',
  templateUrl: './grafico-pie.component.html',
  styleUrls: ['./grafico-pie.component.css']
})
export class GraficoPieComponent {
  public pieChartType: ChartType = 'pie';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  public pieChartData!: ChartConfiguration['data'];

  @Input()
  public tooltipCallbacks!: _DeepPartialObject<TooltipCallbacks<keyof ChartTypeRegistry, TooltipModel<keyof ChartTypeRegistry>,
   TooltipItem<keyof ChartTypeRegistry>>>;

  @Input()
  public datasetLabelPieChart!: string;

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

    ngOnChanges(changes: SimpleChanges){
      this.configurarOptions();
      this.chart?.update();
    }

    private configurarOptions(){
      this.pieChartOptions!.plugins!.tooltip!.callbacks = this.tooltipCallbacks;

      if(this.labelsPieChart){
        this.pieChartData.labels = this.labelsPieChart;
      }
    }
}
