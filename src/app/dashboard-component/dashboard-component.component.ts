import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { count, map } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
  providers: [ DashboardService ]
})
export class DashboardComponentComponent {
  private nomeDoPiloto: string = '';
  public temporadaSelecionada: string = '';
  anos: string[] =[];
  gpsDisputados: number = 0;

  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

  public labelsTemporada: string[] = []

  public labelsZonaDeClassificacao = [
    'Q1', 'Q2', 'Q3'
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

  public resultadosEmTemporadaChartOptions: ChartConfiguration['options'] = {
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
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: []
  }

  public resultadosEmTemporadaPie: ChartConfiguration['data'] ={
    datasets: [
      {
        label: 'resultados 2024',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: []
  }

  public zonasDeClassificacaoChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
  };

  public zonasDeClassificacao: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'zonas de classificação 2024',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: this.labelsZonaDeClassificacao
  }

  public podiosPorTemporada: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Pódios por temporada',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: []
  }

  public pontosPorTemporada: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Pontos por temporada',
        data: [],
        fill: 'origin',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService
  ){}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.nomeDoPiloto = params['nomeDoPiloto'];
    })

    this.setGpsDisputados();
    this.getAnosCompetidos();


    this.charts?.forEach(chart => chart.update());
  }

  private setGpsDisputados(){
    this.dashboardService.getGpsDisputados(this.nomeDoPiloto).subscribe(numGpsDisputados =>{
      this.gpsDisputados = numGpsDisputados;
    })
  }

  private getAnosCompetidos(): void{
    this.dashboardService.getAnosCompetidos(this.nomeDoPiloto).subscribe(anosArr =>{
      this.anos = anosArr
      this.podiosPorTemporada.labels = [...anosArr];
      this.pontosPorTemporada.labels = [...anosArr];
      this.temporadaSelecionada = anosArr[anosArr.length - 1];

      this.getResultadosEmTemporada();
      this.charts?.forEach(chart => chart.update());
    });

  }

  private getResultadosEmTemporada(): void{
    let indiceTemporada = this.anos.findIndex(ano => ano == this.temporadaSelecionada);

    this.dashboardService.getResultadosEmTemporadaSelecionada(this.nomeDoPiloto, indiceTemporada)
      .subscribe(resultados => {
        this.resultadosEmTemporada.labels = Array.from({length: resultados.length}, (_, i) => (i+1).toString())
        this.resultadosEmTemporada.datasets[0].data = resultados
        this.resultadosEmTemporadaPie.datasets[0].data = resultados

        this.charts?.forEach(chart => chart.update());
      });

  }
}
