import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService, AuthenticationService } from 'src/app/services/index.service';
import * as moment from 'moment';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mispacientes',
  templateUrl: './mispacientes.component.html',
  styleUrls: ['./mispacientes.component.css']
})
export class MispacientesComponent implements OnInit, OnDestroy {

  pacientes: Paciente[] = [];
  userId: string;
  suscriptor: Subscription[] = [];
  cargando: boolean = true;

  constructor(
    private pacienteService: PacienteService,
    private authService: AuthenticationService
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.suscriptor.push(this.authService.getStatus().subscribe( (data) => {
        this.userId = data.uid;
        // console.log('usuario: ', data.uid);
        this.cargando = true;
        this.suscriptor.push(this.pacienteService.getPacientesByField('cargadoPor', '==', this.userId).valueChanges()
          .subscribe( (resp: any) => {
            resp.forEach((element: any) => {
              element.edad = moment(element.fechaNac, 'YYYYMMDD').fromNow(true);
            });
            this.pacientes = resp;
            // console.log(this.pacientes);
            this.cargando = false;
          })
        );
      })
    );
  }

  eliminarPaciente(pac: Paciente) {
    this.pacienteService.deletePaciente(pac._id)
    .then( (data) => {
      swal('Paciente borrado', pac.apellido, 'success' );
    })
    .catch ( (error) => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.suscriptor.forEach( (susc) => {
      susc.unsubscribe();
    });
  }

}
