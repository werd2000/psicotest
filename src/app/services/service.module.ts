import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  UsuarioService,
  SubirArchivoService
} from './index.service';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    UsuarioService,
    SubirArchivoService
  ]
})
export class ServiceModule { }
