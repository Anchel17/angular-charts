import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { GraficoDeLinhaComponent } from './dashboard-component/graficos/grafico-de-linha/grafico-de-linha.component';
import { GraficoPieComponent } from './dashboard-component/graficos/grafico-pie/grafico-pie.component';
import { PilotoDisplayComponent } from './dashboard-component/piloto-display/piloto-display.component'


@NgModule({
  declarations: [
    AppComponent,
    MenuComponentComponent,
    DashboardComponentComponent,
    GraficoDeLinhaComponent,
    GraficoPieComponent,
    PilotoDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    NgChartsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
