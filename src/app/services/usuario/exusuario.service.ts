import { Injectable } from '@angular/core';

import { PRE_TABLE } from '../../config/config';

import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // public usuarios: Usuario[] = [];
  public usuario: Usuario;

  public menu;
  private existe: boolean;
  public headers;
  private usuariosCollection: AngularFirestoreCollection<UsuarioInterface>;
  usuarios: Observable<UsuarioInterface[]>;

  constructor(
    private afs: AngularFirestore
    ) {
    this.usuariosCollection = afs.collection<UsuarioInterface>(PRE_TABLE + 'usuarios');
  }

  // =====================================================================
  // Crea un usuario
  // =====================================================================
  crearUsuario( usuario: UsuarioInterface ) {
    const id = this.afs.createId();
    usuario._id = id;
    return this.usuariosCollection.doc(id).set(usuario);
  }

  // Obtengo una colección de usuarios filtrado por email
  // El email debe ser único por lo que debe regresar un solo registro
  getUsuarioEmail( email: string ) {
    return this.afs.collection<Usuario>(
      PRE_TABLE + 'usuarios', ref => ref.where('email', '==', email)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // =====================================================================
  // Login normal: usuarios y password
  // =====================================================================
  login( usuario: Usuario, recordar ) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.getUsuarioEmail(usuario.email).pipe(
      map( usu => {
        // console.log(usu);
        if ( usu.length !== 0 ) {
          if (usu[0].password === usuario.password) {
            this.usuario = usu[0];
            return usu;
          }
        }
      }));
  }

  // =====================================================================
  // Login con Google
  // =====================================================================
  loginGoogle( token: string) {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
