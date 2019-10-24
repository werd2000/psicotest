import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService, AuthenticationService, UsuarioService } from 'src/app/services/index.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  pacientes: Paciente[] = [];
  suscriptor: Subscription[] = [];
  userId: string;
  user: Usuario;

  constructor(
    private pacienteService: PacienteService,
    private authService: AuthenticationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.suscriptor.push(
      this.authService.getStatus().subscribe( (data) => {
        if (data) {
          this.userId = data.uid;
          this.suscriptor.push(
            this.usuarioService.getUserById(this.userId).valueChanges()
            .subscribe( (usu) => {
              this.user = usu;
            })
            );
        }
        // console.log('usuario: ', data.uid);
        this.suscriptor.push(
          this.pacienteService.getPacientesByField('cargadoPor', '==', this.userId).valueChanges()
          .subscribe( (resp: any) => {
            this.pacientes = resp;
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.suscriptor.forEach( (sus) => {
      sus.unsubscribe();
    });
  }

}
