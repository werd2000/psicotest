import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos
import { SharedModule } from '../shared/shared.module';

// Componentes
// El principal
import { PagesComponent } from './pages.component';
// las de las rutas
import { DashboardComponent } from './dashboard/dashboard.component';
import { MispacientesComponent } from './mispacientes/mispacientes.component';



@NgModule({
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    MispacientesComponent,
  ],
  exports: [
    DashboardComponent,
    MispacientesComponent
  ]
})
export class PagesModule { }
