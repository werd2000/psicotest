import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: AngularFirestoreDocument<Usuario>;
  private usuariosCollection: AngularFirestoreCollection<UsuarioInterface>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.usuariosCollection = afs.collection<UsuarioInterface>('psi-usuarios');
  }

  getUsers() {
    return this.usuariosCollection.valueChanges();
  }

  getUserById(uid: string) {
    return this.afs.doc<Usuario>('psi-usuarios/' + uid);
  }

  createUser(user) {
    return this.usuariosCollection.doc(user._id).set(user);
    // return this.usuariosCollection.add(user);
  }

  editUser(user) {
    console.log(user);
    return this.usuariosCollection.doc(user._id).update(user);
  }

}
