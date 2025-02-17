import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { count } from 'rxjs';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent {
  private nomeDoPiloto: String = '';
  anos: string[] =['2020', '2021', '2022', '2023', '2024'];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public labelsResultadosEmTemporada = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24
  ]

  public labelsTemporada = [
    2020, 2021, 2022, 2023, 2024
  ]

  public lineChartType: ChartType = 'line';
  public pieChartType: ChartType = 'pie';

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    scales: {
      y: {
        position: 'left',
      }
    },
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  };

  public resultadosEmTemporada: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'resultados 2024',
        data: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          1, 2, 3, 4
        ],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: this.labelsResultadosEmTemporada
  }

  public podiosPorTemporada: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Pódios 2024',
        data: [
          1, 2, 3, 4, 5
        ],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: this.labelsTemporada
  }

  public dnfsPorTemporada: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Pontos por temporada',
        data: [
          1, 2, 3, 4, 5
        ],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: this.labelsTemporada
  }

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.nomeDoPiloto = params['nomeDoPiloto'];
    })

    this.chart?.update();
  }
}
