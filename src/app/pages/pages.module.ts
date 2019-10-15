import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos
import { SharedModule } from '../shared/shared.module';

// Pipe module
import { PipesModule } from '../pipes/pipes.module';

// Componentes
// El principal
import { PagesComponent } from './pages.component';
// las de las rutas
import { DashboardComponent } from './dashboard/dashboard.component';
import { MispacientesComponent } from './mispacientes/mispacientes.component';
import { TestsComponent } from './tests/tests.component';



@NgModule({
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    MispacientesComponent,
    TestsComponent,
  ],
  exports: [
    DashboardComponent,
    MispacientesComponent
  ]
})
export class PagesModule { }
