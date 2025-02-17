import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent {
  constructor(private router: Router){}

  public irParaDashboard(piloto: String){
    this.router.navigate(['/dashboard'], {queryParams: {nomeDoPiloto:piloto}});
  }
}
