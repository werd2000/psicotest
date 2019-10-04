import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    SidebarComponent,
    TopbarComponent,
    BottombarComponent,
    NopagefoundComponent,
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    BottombarComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }