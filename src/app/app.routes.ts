import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ForgotPasswordComponent } from './login/forgot-password.component';


const APPROUTES: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(APPROUTES, {useHash: true});
