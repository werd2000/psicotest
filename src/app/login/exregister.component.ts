import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/index.service';
import { Router } from '@angular/router';
import { sonIguales } from '../lib/libreria';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

declare const gapi: any;

// const onUsuarioEmailResponse = (usuario) => {
//   console.log(usuario);
// };

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
    public _usuarioService: UsuarioService,
    public router: Router,
  ) { }

  ngOnInit() {
    // this.googleInit();
    // document.getElementById('page-top').classList.add('bg-gradient-primary');
    // this.crearFormulario();
  }

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

  // Crea el formulario de registro
  // Verifica que los passwords sean iguales con la librería sonIguales de lib
  crearFormulario() {
    this.forma = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, { validators: sonIguales('password', 'password2') });
  }

  // registrarUsuario() {
  //   if (this.forma.invalid) {
  //     return;
  //   }

  //   const usuario: UsuarioInterface = {
  //     nombres: this.forma.value.nombres,
  //     apellidos: this.forma.value.apellidos,
  //     email: this.forma.value.email,
  //     // password: this.forma.value.password,
  //     img: '',
  //     role: 'ROLE_USER',
  //     google: false
  //   };

  //   this.existeUsuario(usuario, () => {
  //     this.suscriptors.forEach( (s) => {
  //       s.unsubscribe();
  //     });
  //     if (this.usuario === null || this.usuario === undefined) {
  //       this.existe = false;
  //       console.log('no existe el usuario');
  //       this._usuarioService.crearUsuario(usuario)
  //         .then( sucess => {
  //           this.router.navigate(['/login']);
  //           return;
  //         })
  //         .catch( err => {
  //           console.log(err);
  //         });
  //     } else {
  //       if ( this.existe && this.usuario != null) {
  //         swal('Este usuario ya existe!', usuario.email, 'error');
  //       }
  //     }
  //   });

  //   // this._usuarioService.getUsuarioEmail(usuario.email)
  //   //   .subscribe( usu => {
  //   //     const usuarioBuscado = usu[0];
  //   //     if (usuarioBuscado === null || usuarioBuscado === undefined) {
  //   //       console.log('usuario null o undefined');
  //   //       this.existe = false;
  //   //       this._usuarioService.crearUsuario(usuario)
  //   //         .then( sucess => {
  //   //           this.router.navigate(['/login']);
  //   //           return;
  //   //         })
  //   //         .catch( err => {
  //   //           console.log(err);
  //   //         });
  //   //     } else {
  //   //       swal('El usuario ya existe!', usuario.email, 'error');
  //   //     }
  //   //   });

  // }

  // getUsuarioEmail(email) {
  //   this._usuarioService.getUsuarioEmail(email)
  //     .subscribe( res => {
  //       this.usuario = res[0];
  //       console.log(res[0]);
  //       return res[0];
  //     });
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

}
