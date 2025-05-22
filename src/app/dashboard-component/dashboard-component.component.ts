import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartTypeRegistry, PluginOptionsByType, TooltipCallbacks, TooltipItem, TooltipModel } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { MatSelectChange } from '@angular/material/select';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { ChartDataConfig } from '../models/ChartDataConfig';

const colorsPilotos = [
  {
    nome: 'leclerc', borderColor: '#C3151C', doughnutColors: ['#C3151C', '#CC3A40', '#D45D63', '#DD8187', '#E5A5AB', '#EEC8CE', '#F6EBF2']
  },
  {
    nome: 'verstappen', borderColor: '#223971', doughnutColors: ['#223971', '#40558A', '#5D71A3', '#7B8DBB', '#99A9D4', '#B6C5ED','#D3E1FF']
  },
  {
    nome: 'norris', borderColor: '#FF8000', doughnutColors: ['#FF8000', '#FF9933', '#FFB266', '#FFCC99', '#FFE0B3', '#FFF0D9', '#FFFAF0']
  }
];
@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
  providers: [ DashboardService ]
})
export class DashboardComponentComponent {
  public nomeDoPiloto: string = '';
  public temporadaSelecionada: string = '';
  anos: string[] =[];

  public resultadosEmTemporadaChartConfig: ChartDataConfig = new ChartDataConfig();
  public podiosPorTemporadaChartConfig: ChartDataConfig = new ChartDataConfig();
  public pontosPorTemporadaChartConfig: ChartDataConfig = new ChartDataConfig();
  public resultadosEmTemporadaPieChartConfig: ChartDataConfig = new ChartDataConfig();
  public zonasDeClassificacaoPieChartConfig: ChartDataConfig = new ChartDataConfig();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router
  ){}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.nomeDoPiloto = params['nomeDoPiloto'];
      this.getDadosParaGraficos();
    })
  }

  private getDadosParaGraficos(): void{
    this.dashboardService.getAnosCompetidos(this.nomeDoPiloto).subscribe(anosArr =>{
      this.anos = anosArr;
      this.podiosPorTemporadaChartConfig.labels = [...anosArr];
      this.pontosPorTemporadaChartConfig.labels = [...anosArr];
      this.temporadaSelecionada = this.temporadaSelecionada ? this.temporadaSelecionada : anosArr[anosArr.length - 1];

      this.getResultadosEmTemporada();
      this.getResultadosEmCarreira();
    });
  }

  private getResultadosEmTemporada(): void{
    let indiceTemporada = this.anos.findIndex(ano => ano == this.temporadaSelecionada);

    this.dashboardService.getResultadosEmTemporadaSelecionada(this.nomeDoPiloto, indiceTemporada)
      .subscribe(resultados => {
        this.resultadosEmTemporadaChartConfig.labels = Array.from({length: resultados.posicoesEmCorrida.length}, (_, i) => (i+1).toString());
        this.resultadosEmTemporadaChartConfig.datasetData = resultados.posicoesEmCorrida;
        this.resultadosEmTemporadaChartConfig.datasetLabel = `Resultados em ${this.temporadaSelecionada}`;

        let contagemResultadosEmCorrida: number[] = [];
        let contagemResultadosEmClassificacao: number[] = [];

        resultados.posicoesEmCorrida.forEach(resultado => {
          contagemResultadosEmCorrida[resultado] = (contagemResultadosEmCorrida[resultado] || 0) + 1;
        });

        contagemResultadosEmClassificacao = this.contarZonasDeClassificacao(resultados.posicoesEmClassificacao);

        this.resultadosEmTemporadaPieChartConfig.labels = this.tratarKeysContagemResultadosEmCorrida(contagemResultadosEmCorrida);
        this.resultadosEmTemporadaPieChartConfig.datasetData = contagemResultadosEmCorrida.filter(value => value != undefined);
        this.zonasDeClassificacaoPieChartConfig.datasetData = contagemResultadosEmClassificacao;
      });
  }

  private getResultadosEmCarreira(): void{
    this.dashboardService.getResultadosEmCarreira(this.nomeDoPiloto).subscribe(resultados =>{
      this.podiosPorTemporadaChartConfig.datasetData = resultados.podiosPorTemporada;
      this.podiosPorTemporadaChartConfig.datasetLabel = 'Pódios por temporada';

      this.pontosPorTemporadaChartConfig.datasetData = resultados.pontosPorTemporada;
      this.pontosPorTemporadaChartConfig.datasetLabel = 'Pontos por temporada';
    })
  }

  private contarZonasDeClassificacao(posicoesEmClassificacao: number[]){
    return posicoesEmClassificacao.reduce(
      ([q1, q2, q3], pos) => {
        if(pos > 0 && pos <= 10){
          q3++;
        }
        else if(pos > 10 && pos <= 15){
          q2++;
        }
        else if(pos >= 16 && pos <= 20){
          q1++;
        }
        return [q1, q2, q3]
      },
      [0, 0, 0]
    ).slice(0, 3);
  }

  private tratarKeysContagemResultadosEmCorrida(contagemResultadosEmCorrida: number[]): string[]{
    let keysContagemResultados = Array.from(contagemResultadosEmCorrida.keys());

    for(let i = 0; i < contagemResultadosEmCorrida.length; i++){
      if(contagemResultadosEmCorrida[i] == undefined){
        keysContagemResultados[i] = -1;
      }
    }

    let keysContagemResultadosString = keysContagemResultados.filter(value => value != -1).map(value => value.toString());

    return keysContagemResultadosString;
  }

  public getPluginsResultadosEmTemporadaLineChart(): _DeepPartialObject<PluginOptionsByType<keyof ChartTypeRegistry>>{
    return {
      tooltip : {
        callbacks : {
          title: () => '',
          label: function(tooltipItem: TooltipItem<keyof ChartTypeRegistry>) {
            return tooltipItem.raw != 0 ? `Corrida ${tooltipItem.label}, chegada: ${tooltipItem.raw}º lugar.`
            : `Corrida ${tooltipItem.label}: DNF/DNS.`;
          }
        }
      }
    }
  }

  public getPluginsResultadosPorTemporadaLineChart(legenda: string): _DeepPartialObject<PluginOptionsByType<keyof ChartTypeRegistry>>{
    return {
      tooltip : {
        callbacks : {
          title: () => '',
          label: function(tooltipItem: TooltipItem<keyof ChartTypeRegistry>) {
            return `${legenda} ${tooltipItem.label}: ${tooltipItem.raw}.`;
          }
        }
      }
    }
  }

  public getResultadosEmTemporadaTooltipCallbacks(): _DeepPartialObject<TooltipCallbacks<keyof ChartTypeRegistry, TooltipModel<keyof ChartTypeRegistry>,
  TooltipItem<keyof ChartTypeRegistry>>>{
    return {
        title: () => '',
        label: function(tooltipItem: TooltipItem<keyof ChartTypeRegistry>){
          return tooltipItem.label != '0' ? `Chegadas em ${tooltipItem.label}º lugar: ${tooltipItem.raw}.`
          : `Abandonos/Não largou: ${tooltipItem.raw}.`
      }
    }
  }

  public getZonasDeClassificacaoTooltipCallbacks(): _DeepPartialObject<TooltipCallbacks<keyof ChartTypeRegistry, TooltipModel<keyof ChartTypeRegistry>,
  TooltipItem<keyof ChartTypeRegistry>>>{
    return {
        title: () => '',
        label: function(tooltipItem){
          return tooltipItem.label != 'Q3' ? `Eliminações no ${tooltipItem.label}: ${tooltipItem.raw}`
          : `Passagens ao ${tooltipItem.label}: ${tooltipItem.raw}`
        }
    }
  }

  public mudarTemporada(selectChange: MatSelectChange){
    this.temporadaSelecionada = selectChange.value;

    this.getDadosParaGraficos();
  }

  public getTextoResultadosEmTemporadaSelecionada(textoInicial: string){
    return textoInicial.concat(` ${this.temporadaSelecionada}`);
  }

  public getChartColor(): string{
    return colorsPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.borderColor;
  }

  public getDoughnutChartColors(){
    return colorsPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.doughnutColors;
  }

  public irParaPiloto(piloto: string){
    this.temporadaSelecionada = '2024';
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { nomeDoPiloto: piloto },
      queryParamsHandling: 'merge'
    });
  }

  public irParaMenu(){
    this.router.navigate(['/']);
  }

  public openSideNav(){
    document.getElementById('sidenav')!.style.width = '40%';
  }

  public closeSideNav(){
    document.getElementById('sidenav')!.style.width = '0';
  }
}
