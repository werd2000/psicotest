import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos
import { SharedModule } from '../shared/shared.module';

// Pipe module
import { PipesModule } from '../pipes/pipes.module';

// Componentes
// El principal
// las de las rutas
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MispacientesComponent } from './mispacientes/mispacientes.component';
import { TestsComponent } from './tests/tests.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './mispacientes/paciente.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    MispacientesComponent,
    TestsComponent,
    ProfileComponent,
    PacienteComponent,
  ],
  exports: [
    DashboardComponent,
    MispacientesComponent,
    PacienteComponent
  ]
})
export class PagesModule { }
