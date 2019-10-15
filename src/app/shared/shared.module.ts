import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ToastsComponent } from './toasts/toasts.component';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    SidebarComponent,
    TopbarComponent,
    BottombarComponent,
    NopagefoundComponent,
    ToastsComponent,
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    BottombarComponent,
    NopagefoundComponent,
    ToastsComponent
  ]
})
export class SharedModule { }
