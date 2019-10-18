import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService, SubirArchivoService } from 'src/app/services/index.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  imagenTemp: any;
  imagenSubir: File;
  forma: FormGroup;
  paramId: string;
  subir: boolean             = true;
  suscriptor: Subscription[] = [];
  cargando: boolean          = false;
  roles: string[]            = ['ROLE_USUARIO', 'ROLE_ADMIN'];
  usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private subirArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.paramId = params.id;
      this.suscriptor.push( this.usuarioService.getUserById(this.paramId).valueChanges()
          .subscribe( (usu: Usuario) => {
            this.cargando = true;
            this.usuario = usu;
            this.crearFormulario();
            this.cargando = false;
            })
      );
    });
  }

  crearFormulario() {
    this.forma = new FormGroup({
      nombres  : new FormControl(this.usuario.nombres, Validators.required),
      apellidos: new FormControl(this.usuario.apellidos, Validators.required),
      email    : new FormControl({value: this.usuario.email, disabled: true}),
      role     : new FormControl(this.usuario.role, Validators.required)
    });
  }

  guardar() {
    const user: Usuario = {
      _id: this.usuario._id,
      nombres: this.forma.value.nombres,
      apellidos: this.forma.value.apellidos,
      email: this.usuario.email,
      role: this.forma.value.role,
      password: ';)',
      img: this.usuario.img
    };
    this.usuarioService.editUser(user)
    .then(() => {
      swal('Usuario actualizado', user.nombres, 'success' );
    })
    .catch( (error) => {
      console.error(error);
    });
  }

  ngOnDestroy() {
    this.suscriptor.forEach( (e) => e.unsubscribe);
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image')) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    if (this.imagenSubir) {
      this.subir = true && !this.usuario.google;
    }
    // console.log(this.imagenSubir);

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  // Toma el archivo y lo lleva al servicio
  cambiarImagen() {
    this.subirArchivoService.subirArchivo( this.imagenSubir, 'usuario', this.usuario )
      .then( resp => swal('Imagen subida', 'La imagen se subió con exito', 'success'))
      .catch( error => console.error(error));
  }

}
