import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { AuthenticationService } from '../services/index.service';
import swal from 'sweetalert';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  recuerdame: boolean;
  email: string;
  auth2: any;
  suscriptors: Subscription[] = [];
  usuario: Usuario;
  existe: boolean = false;

  constructor(
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    private authenticationService: AuthenticationService
  ) {
    this.recuerdame = false;
  }

  ngOnInit() {
    // this.googleInit();
    document.getElementById('page-top').classList.add('bg-gradient-primary');
    this.crearFormulario();
  }

  // Crea el formulario de login
  // Verifica que los passwords sean iguales con la librería sonIguales de lib
  crearFormulario() {
    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      recuerdame: new FormControl(null)
    });
  }

  // ===================================================
  // Inicialización de servicio de Google
  // ===================================================
  // googleInit() {
  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //       cliente_id: '861878409740-87kpqqqft4gm5oul1l1m7fe8vqu98enb.apps.googleusercontent.com',
  //       cookiepolice: 'single_host_origin',
  //       scope: 'profile email'
  //     });
  //     this.attachSignin( document.getElementById('btnGoogle'));
  //   });
  // }

  // attachSignin( element ) {
  //   this.auth2.attachClickHandler( element, {}, (googleUser) => {
  //     const profile = googleUser.getBasicProfile();
  //     // const token = googleUser.getAuthResponse().id_token;
  //     const usuario: UsuarioInterface = {
  //       nombres: profile.ofa,
  //       apellidos: profile.wea,
  //       email: profile.U3,
  //       password: ';)',
  //       img: profile.Paa,
  //       role: 'ROLE_USER',
  //       google: true
  //     };
  //     this.existeUsuario(usuario, () => {
  //       this.suscriptors.forEach( (s) => {
  //         s.unsubscribe();
  //       });
  //       if (this.usuario === null || this.usuario === undefined) {
  //         this.existe = false;
  //         console.log('no existe el usuario google');
  //         this._usuarioService.crearUsuario(usuario)
  //           .then( sucess => {
  //             this.router.navigate(['/login']);
  //             return;
  //           })
  //           .catch( err => {
  //             console.log(err);
  //           });
  //       } else {
  //         if ( this.existe && this.usuario != null) {
  //           swal('Este usuario ya existe!', usuario.email, 'error');
  //         }
  //       }
  //     });
  //   });
  // }

  // existeUsuario(usuario, callback) {
  //   return this.suscriptors.push( this._usuarioService.getUsuarioEmail(usuario.email)
  //   .subscribe( usu => {
  //     this.usuario = usu[0];
  //     if (callback) {
  //       callback();
  //     }
  //   }));
  // }

  login() {
    const email = this.forma.value.email;
    const password = this.forma.value.password;

    this.authenticationService.loginWhitEmail(email, password)
    .then( (sucess) => {
      this.router.navigate(['/dashboard']);
      console.log(sucess);
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  loginWhith(proveedor) {
    switch (proveedor) {
      case 'google':
        this.loginGoogle();
        break;

      case 'facebook':
        this.loginFacebook();
        break;

      default:
        break;
    }
  }

  loginGoogle() {
    this.authenticationService.loginWithGoogle()
    .then( (data) => {
      if (data.additionalUserInfo.isNewUser) {
        const user = {
          _id: data.user.uid,
          nombres: data.user.displayName,
          apellidos: data.user.displayName,
          email: data.user.email,
          img: data.user.photoURL,
          role: 'ROLE_USUARIO',
          google: true
        };
        this._usuarioService.createUser(user)
          .then( (dataU) => {
            this.router.navigate(['/dashboard']);
          })
          .catch ( (error) => {
            console.log(error);
          });

      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  verificarNuevo(nuevo) {
    if (nuevo) {
      return swal('Este usuario no está registrado',
        'Desea registrarlo?',
        {
          buttons: ['No', 'Sí'],
        });
    }
  }

  loginFacebook() {
    this.authenticationService.loginWithFacebook()
    .then( (data) => {
      console.log(data);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

}
