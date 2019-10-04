import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos
import { SharedModule } from '../shared/shared.module';

// Rutas
// import { PAGES_ROUTES } from './pages.routes';

// Pipe module
// import { PipesModule } from '../pipes/pipes.module';


// Componentes
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { PacientesComponent } from './pacientes/pacientes.component';
// import { PacienteComponent } from './pacientes/paciente.component';
// import { PacientePrincipalComponent } from '../components/forms/paciente/pacientePrincipal.component';
// import { UsuarioComponent } from './usuario/usuario.component';
// import { UsuariosComponent } from './usuario/usuarios.component';
// import { DomicilioComponent } from '../components/forms/domicilio/domicilio.component';
// import { ContactoComponent } from '../components/forms/contacto/contacto.component';
// import { FamiliaComponent } from '../components/forms/familia/familia.component';
// import { SsocialComponent } from '../components/forms/ssocial/ssocial.component';
// import { PersonalComponent } from './personal/personal.component';
// import { EmpleadoComponent } from './personal/empleado.component';
// import { EmpleadoPrincipalComponent } from '../components/forms/empleado/empleadoPrincipal.component';
// import { ProfesionComponent } from '../components/forms/profesion/profesion.component';
// import { UploadComponent } from '../components/forms/upload/upload.component';
// import { AreasComponent } from './areas/areas.component';
// import { AreaComponent } from './areas/area.component';
// import { TipoContactosComponent } from './tipo-contacto/tipo-contactos.component';
// import { TipoContactoComponent } from './tipo-contacto/tipo-contacto.component';
// import { TurnosComponent } from './turnos/turnos.component';
// import { AddTurnoComponent } from './turnos/add-turno.component';
// import { TurnosPacienteComponent } from './pacientes/turnos-paciente.component'
// import { CardTurnoComponent } from './turnos/card-turno.component';
// import { PersonalTurnosComponent } from './personal/personal-turnos.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // PipesModule,
    // PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    // DashboardComponent,
    // PacientesComponent,
    // PacienteComponent,
    // PacientePrincipalComponent,
    // UsuarioComponent,
    // UsuariosComponent,
    // DomicilioComponent,
    // ContactoComponent,
    // FamiliaComponent,
    // SsocialComponent,
    // PersonalComponent,
    // EmpleadoComponent,
    // EmpleadoPrincipalComponent,
    // ProfesionComponent,
    // UploadComponent,
    // AreasComponent,
    // AreaComponent,
    // TipoContactosComponent,
    // TipoContactoComponent,
    // TurnosComponent,
    // AddTurnoComponent,
    // TurnosPacienteComponent,
    // CardTurnoComponent,
    // PersonalTurnosComponent,
  ],
  exports: [
    // DashboardComponent,
    // PacientePrincipalComponent,
    // UsuarioComponent,
    // UsuariosComponent,
    // DomicilioComponent,
    // ContactoComponent,
    // FamiliaComponent,
    // SsocialComponent,
    // EmpleadoPrincipalComponent,
    // ProfesionComponent,
    // UploadComponent,
    // AreasComponent,
    // AreaComponent,
    // TipoContactosComponent,
    // TipoContactoComponent,
    // TurnosComponent,
    // TurnosPacienteComponent,
    // CardTurnoComponent,
  ],
  entryComponents: [
    // AddTurnoComponent
  ],
})
export class PagesModule { }
