import { Component, Input, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry, PluginOptionsByType } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-de-linha',
  templateUrl: './grafico-de-linha.component.html',
  styleUrls: ['./grafico-de-linha.component.css']
})
export class GraficoDeLinhaComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  public resultados!: ChartConfiguration['data'];

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

  ngOnChanges(changes: SimpleChanges){
    this.configurarOptions();
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
}
