import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PilotoDTO } from "../models/PilotoDTO";
import { map, Observable } from "rxjs";
import { ResultadosEmTemporadaDTO } from "../models/ResultadosEmTemporadaDTO";
import { ResultadosEmCarreiraDTO } from "../models/ResultadosEmCarreiraDTO";

@Injectable()
export class DashboardService{
  private path = '../assets/dados/{nomeDoPiloto}.json'

  constructor(private httpClient: HttpClient){}

  public getAnosCompetidos(nomeDoPiloto: string): Observable<string[]>{
    this.path = this.replaceStringNomeDoPiloto(nomeDoPiloto);
    return this.httpClient.get<PilotoDTO>(this.path).pipe(
      map(piloto => piloto.temporadas)
    );
  }

  public getGpsDisputados(nomeDoPiloto: string): Observable<number>{
    this.path = this.replaceStringNomeDoPiloto(nomeDoPiloto);

    return this.httpClient.get<PilotoDTO>(this.path).pipe(
      map(piloto => piloto.gpsDisputados)
    );
  }

  public getResultadosEmTemporadaSelecionada(nomeDoPiloto: string, indiceTemporada: number): Observable<ResultadosEmTemporadaDTO>{
    this.path = this.replaceStringNomeDoPiloto(nomeDoPiloto);

    let resultadosEmTemporadaDTO: ResultadosEmTemporadaDTO;

    return this.httpClient.get<PilotoDTO>(this.path).pipe(
      map(piloto => {
        return resultadosEmTemporadaDTO = {
          posicoesEmCorrida: piloto.resultados[indiceTemporada],
          posicoesEmClassificacao: piloto.posicaoEmClassificacao[indiceTemporada]
        }
      })
    );
  }

  public getResultadosEmCarreira(nomeDoPiloto: string){
    this.path = this.replaceStringNomeDoPiloto(nomeDoPiloto);

    let resultadosEmCarreiraDTO: ResultadosEmCarreiraDTO;

    return this.httpClient.get<PilotoDTO>(this.path).pipe(
      map(piloto => {
        return resultadosEmCarreiraDTO = {
          podiosPorTemporada: piloto.podiosPorTemporada,
          pontosPorTemporada: piloto.pontosPorTemporada
        }
      })
    );
  }

  private replaceStringNomeDoPiloto(nomeDoPiloto: string): string{
    return this.path.replace("{nomeDoPiloto}", nomeDoPiloto);
  }

}
