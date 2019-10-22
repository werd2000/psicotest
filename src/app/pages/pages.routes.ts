import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MispacientesComponent } from './mispacientes/mispacientes.component';
// import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { TestsComponent } from './tests/tests.component';
import { ProfileComponent } from './profile/profile.component';
import { PacienteComponent } from './mispacientes/paciente.component';

const PAGESROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile/:id', component: ProfileComponent },
            { path: 'pacientes', component: MispacientesComponent },
            { path: 'paciente/:id', component: PacienteComponent },
            { path: 'tests', component: TestsComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);
