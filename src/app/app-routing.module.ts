import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponentComponent } from "./menu-component/menu-component.component";
import { DashboardComponentComponent } from "./dashboard-component/dashboard-component.component";

const routes: Routes = [
  {path: '', component: MenuComponentComponent},
  {path: 'dashboard', component: DashboardComponentComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
