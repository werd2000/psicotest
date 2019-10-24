import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import { sonIguales } from '../lib/libreria';
import { AuthenticationService, UsuarioService } from '../services/index.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  existe: boolean = true;
  usuario: Usuario;
  auth2: any;
  suscriptors: Subscription[] = [];


  constructor(
    // tslint:disable-next-line: variable-name
    private autauthenticationService: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    document.getElementById('page-top').classList.add('bg-gradient-primary');
    this.crearFormulario();
  }

  // Crea el formulario de registro
  // Verifica que los passwords sean iguales con la librería sonIguales de lib
  crearFormulario() {
    this.forma = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }, { validators: sonIguales('password', 'password2') });
  }

  registrarUsuarioEmail() {
    const email = this.forma.value.email;
    const password = this.forma.value.password;

    this.autauthenticationService.registerWhitEmail(email, password)
    .then( (data) => {
      const user = {
        _id: data.user.uid,
        nombres: this.forma.value.nombres,
        apellidos: this.forma.value.apellidos,
        email,
        img: '',
        role: 'ROLE_USUARIO',
        google: false,
        cuenta: 'GRATUITA'
      };
      this.usuarioService.createUser(user)
        .then( (dataU) => {
          swal(
            'Usuario registrado con éxito',
            'El usuario ' + user.apellidos + ' ' + user.nombres + ' se registró correctamente',
            'success'
            );
          this.router.navigate(['/login']);
          // console.log(dataU);
        })
        .catch ( (error) => {
          console.log(error);
        });
    })
    .catch( (error) => {
      if (error.code === 'auth/email-already-in-use') {
        swal('Error', 'El email ya está siendo usado por otra cuenta.', 'error');
      }
      console.log(error);
    });
  }

  registrarUsuario(proveedor) {
    switch (proveedor) {
      case 'facebook':
        this.registrarUsuarioFacebook();
        break;

      case 'google':
          this.registrarUsuarioGoogle();
          break;

      default:
        break;
    }
  }

  // El registro con Facebook no funciona hasta que tenga una url segura
  registrarUsuarioFacebook() {
    this.autauthenticationService.registerWithFacebook()
    .then( (data) => {
      console.log(data);
      const user = {
        _id: data.user.uid,
        nombres: data.user.displayName,
        apellidos: data.user.displayName,
        email: data.user.email,
        img: data.user.photoURL,
        role: 'ROLE_USUARIO',
        google: false,
        cuenta: 'GRATUITA'
      };
    })
    .catch( (error) => {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        swal('Ya existe una cuenta con este email',
        'Este email está asociada a otra cuenta.',
        'error');
      }
    });
  }

  registrarUsuarioGoogle() {
    this.autauthenticationService.registerWithGoogle()
    .then( (data) => {
      // console.log(data);
      if (!data.additionalUserInfo.isNewUser) {
        swal('Este usuario ya está registrado',
        'Desea ingresar con esta cuenta?',
        {
          buttons: ['Quiero usar otra cuenta', 'Sí'],
        })
        .then((value) => {
          if (value) {
            this.router.navigate(['/dashboard']);
          }
        });
      } else {
        const user = {
          _id: data.user.uid,
          nombres: data.user.displayName,
          apellidos: data.user.displayName,
          email: data.user.email,
          img: data.user.photoURL,
          role: 'ROLE_USUARIO',
          google: true,
          cuenta: 'GRATUITA'
        };
        this.usuarioService.createUser(user)
          .then( (dataU) => {
            swal(
              'Usuario registrado con éxito',
              'El usuario ' + data.user.displayName + ' se registró correctamente',
              'success'
              );
            this.router.navigate(['/login']);
          })
          .catch ( (error) => {
            console.log(error);
          });
      }
    })
    .catch( (error) => {
      console.log(error);
      if (error.code === 'auth/network-request-failed') {
        swal('Error en la conexión',
        'Verifica su conexión a Internet e intente nuevamente.',
        'error');
      }
    });
  }

}
