import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { count, map } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { MatSelectChange } from '@angular/material/select';

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

  public resultadosEmTemporadaPieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          filter: (legendItem, data) => {
            return true
          }
        }
      }
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
        label: 'Chegadas na posição: ',
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
        position: 'bottom',
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
    this.getDadosParaGraficos();

    this.charts?.forEach(chart => chart.update());
  }

  private setGpsDisputados(){
    this.dashboardService.getGpsDisputados(this.nomeDoPiloto).subscribe(numGpsDisputados =>{
      this.gpsDisputados = numGpsDisputados;
    })
  }

  private getDadosParaGraficos(): void{
    this.dashboardService.getAnosCompetidos(this.nomeDoPiloto).subscribe(anosArr =>{
      this.anos = anosArr
      this.podiosPorTemporada.labels = [...anosArr];
      this.pontosPorTemporada.labels = [...anosArr];
      this.temporadaSelecionada = this.temporadaSelecionada ? this.temporadaSelecionada : anosArr[anosArr.length - 1];

      this.getResultadosEmTemporada();
      this.getResultadosEmCarreira();

      this.charts?.forEach(chart => chart.update());
    });

  }

  private getResultadosEmTemporada(): void{
    let indiceTemporada = this.anos.findIndex(ano => ano == this.temporadaSelecionada);

    this.dashboardService.getResultadosEmTemporadaSelecionada(this.nomeDoPiloto, indiceTemporada)
      .subscribe(resultados => {
        this.resultadosEmTemporada.labels = Array.from({length: resultados.posicoesEmCorrida.length}, (_, i) => (i+1).toString())
        this.resultadosEmTemporada.datasets[0].data = resultados.posicoesEmCorrida
        let contagemResultadosEmCorrida: number[] = [];
        let contagemResultadosEmClassificacao: number[] = [];

        resultados.posicoesEmCorrida.forEach(resultado => {
          contagemResultadosEmCorrida[resultado] = (contagemResultadosEmCorrida[resultado] || 0) + 1;
        });

        contagemResultadosEmClassificacao = this.contarZonasDeClassificacao(resultados.posicoesEmClassificacao);

        this.resultadosEmTemporadaPie.labels = Array.from(contagemResultadosEmCorrida.keys());
        this.resultadosEmTemporadaPie.datasets[0].data = contagemResultadosEmCorrida;
        this.zonasDeClassificacao.datasets[0].data = contagemResultadosEmClassificacao;

        this.charts?.forEach(chart => chart.update());
      });
  }

  private getResultadosEmCarreira(): void{
    this.dashboardService.getResultadosEmCarreira(this.nomeDoPiloto).subscribe(resultados =>{
      this.podiosPorTemporada.datasets[0].data = resultados.podiosPorTemporada;
      this.pontosPorTemporada.datasets[0].data = resultados.pontosPorTemporada;

      this.charts?.forEach(chart => chart.update());
    })
  }

  private contarZonasDeClassificacao(posicoesEmClassificacao: number[]){
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let dnf = 0;

    posicoesEmClassificacao.forEach(resultado => {
      if(resultado > 0 && resultado <= 10){
        q3++;
      }
      else if(resultado > 10 && resultado <= 15){
        q2++;
      }
      else if(resultado >= 16 && resultado <= 20){
        q1++;
      }
      else{
        dnf++;
      }
    });

    return [q1, q2, q3];
  }

  public mudarTemporada(selectChange: MatSelectChange){
    this.temporadaSelecionada = selectChange.value;

    this.getDadosParaGraficos();

    // this.charts?.forEach(chart => chart.update());
  }
}
