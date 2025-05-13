import { Component, Input } from '@angular/core';

const infoPilotos = [
  {
    nome: 'leclerc', classe:'leclerc-bg-color', carroImgPath: '../../assets/SF24-GRANDE.png', pilotoImgPath: '../../assets/Leclerc-dashboard.png',
    backgroundColor: '#fcabad', secondaryBgColorClass: 'leclerc-secondary-bg-color', nomeDisplay: 'Charles',
    sobrenomeDisplay: 'Leclerc', logoEquipeImgPath: '../../assets/ferrari-logo.png'
  },
  {
    nome: 'verstappen', classe:'verstappen-bg-color', carroImgPath: '../../assets/RB20-GRANDE.png', pilotoImgPath: '../../assets/Verstappen-dashboard.png',
    backgroundColor: '#7c9ae8', secondaryBgColorClass: 'verstappen-secondary-bg-color', nomeDisplay: 'Max',
    sobrenomeDisplay: 'Verstappen', logoEquipeImgPath: '../../assets/red-bull-logo.png'
  },
  {
    nome: 'norris', classe:'norris-bg-color', carroImgPath: '../../assets/MCL38-GRANDE.png', pilotoImgPath: '../../assets/Norris-dashboard.png',
    backgroundColor: '#f1c3a0', secondaryBgColorClass: 'norris-secondary-bg-color', nomeDisplay: 'Lando',
    sobrenomeDisplay: 'Norris', logoEquipeImgPath: '../../assets/mclaren-logo.png'
  }
];

@Component({
  selector: 'app-piloto-display',
  templateUrl: './piloto-display.component.html',
  styleUrls: ['./piloto-display.component.css']
})
export class PilotoDisplayComponent {

  @Input() nomeDoPiloto!: string;

  public getBackgroundColor(): string{
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.classe;
  }

  public getSecondaryBackgroundColor(){
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.secondaryBgColorClass;
  }

  public getPathPilotoImg(): string{
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.pilotoImgPath;
  }

  public getPathCarroImg(): string{
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.carroImgPath;
  }

  public getPathEquipeLogoImg(): string{
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.logoEquipeImgPath;
  }

  public getnomeDisplayPiloto(): string{
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.nomeDisplay;
  }

  public getSobrenomeDisplayPiloto(): string{
    return infoPilotos.find(piloto => this.nomeDoPiloto == piloto.nome)!.sobrenomeDisplay;
  }
}
