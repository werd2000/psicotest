import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
// import { SharedModule } from './shared/shared.module';
// import { PagesModule } from './pages/pages.module';

// Routes
import { APP_ROUTES } from './app.routes';


// Componentes
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BottombarComponent } from './shared/bottombar/bottombar.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    TopbarComponent,
    SidebarComponent,
    PagesComponent,
    BottombarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES
    // SharedModule,
    // PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
