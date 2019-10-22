import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { PacienteService, AuthenticationService } from 'src/app/services/index.service';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import * as moment from 'moment';
import swal from 'sweetalert';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit, OnDestroy {

  titulo: string;
  paramId: string;
  suscriptor: Subscription[] = [];
  forma: FormGroup;
  paciente: Paciente;
  uidUsuario: string;
  edad: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService,
    private authService: AuthenticationService,
    public router: Router,
  ) {
    moment.locale('es');
    this.authService.getStatus().subscribe( (data) => {
      this.uidUsuario = data.uid;
    });
  }

  ngOnInit() {
    this.suscriptor.push(this.activatedRoute.params.subscribe( params => {
      this.paramId = params.id;
      if (params.id === 'nuevo') {
        this.titulo = 'Paciente nuevo';
        this.paciente = new Paciente('', '', '', '', '', '', '', moment().format('YYYY-MM-DD'));
        this.crearFormulario();
      } else {
        this.suscriptor.push(this.pacienteService.getPacienteById(this.paramId).valueChanges()
          .subscribe( (data) => {
            // console.log(data);
            this.paciente = data;
            this.crearFormulario();
            this.calcularEdad();
          })
        );
      }
    })
    );
  }

  crearFormulario() {
    this.forma = new FormGroup({
      apellido: new FormControl(this.paciente.apellido),
      nombre: new FormControl(this.paciente.nombre),
      tipoDoc: new FormControl(this.paciente.tipoDoc),
      nroDoc: new FormControl(this.paciente.nroDoc),
      fechaNac: new FormControl(this.paciente.fechaNac),
      contacto: new FormControl(this.paciente.contacto),
      domicilio: new FormControl(this.paciente.domicilio),
      nacionalidad: new FormControl(this.paciente.nacionalidad),
      sexo: new FormControl(this.paciente.sexo)
    });
  }

  guardar() {
    const paciente = this.forma.value;
    this.controlFechaNac(paciente);
    paciente.cargadoPor = this.uidUsuario;
    paciente.actualizado = moment().format('YYYY-MM-DD');
    // console.log(paciente);
    if (this.paciente._id === undefined) {
      this.pacienteService.createPaciente(paciente)
      .then( (data) => {
        // console.log(data);
        swal('Paciente creado', paciente.apellido, 'success' );
        this.router.navigate(['/paciente/' + paciente._id]);
      })
      .catch( (error) => {
        console.error(error);
      });
    } else {
      paciente._id = this.paciente._id;
      this.pacienteService.editPaciente(paciente);
    }
  }

  controlFechaNac(paciente) {
    if (this.forma.value.fechaNac) {
      if ( moment.isMoment(this.forma.value.fechaNac)) {
        paciente.fechaNac = this.forma.value.fechaNac.format('DD-MM-YYYY');
      } else {
        paciente.fechaNac = this.forma.value.fechaNac;
      }
    } else {
      paciente.fechaNac = '';
    }
  }

  calcularEdad() {
    this.edad = moment(this.forma.value.fechaNac, 'YYYYMMDD').fromNow(true);
  }

  ngOnDestroy(): void {
    this.suscriptor.forEach( (sus) => {
      sus.unsubscribe();
    });
  }

}
