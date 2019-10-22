import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  paciente: AngularFirestoreDocument<Paciente>;
  private pacientesCollection: AngularFirestoreCollection<PacienteInterface>;


  constructor(
    private afs: AngularFirestore
  ) {
    this.pacientesCollection = afs.collection<PacienteInterface>('psi-pacientes');
  }

  getPacientes() {
    return this.pacientesCollection.valueChanges();
  }

  getPacientesByField(campo: string, signo: any, valor: string) {
    // return this.pacientesCollection.ref.where(campo, signo, valor).get();
    return this.afs.collection('psi-pacientes', ref => ref.where(campo, signo, valor));
  }

  getPacienteById(uid: string) {
    return this.afs.doc<Paciente>('psi-pacientes/' + uid);
  }

  createPaciente(paciente) {
    // return this.pacientesCollection.doc(paciente._id).set(paciente);
    // return this.pacientesCollection.add(paciente);
    const id = this.afs.createId();
    paciente._id = id;
    return this.afs.collection('psi-pacientes').doc(id).set(paciente);
  }

  editPaciente(paciente) {
    // console.log(paciente);
    return this.pacientesCollection.doc(paciente._id).update(paciente);
  }

  deletePaciente(idPaciente: string) {
    // console.log(idPaciente);
    return this.afs.collection('psi-pacientes').doc(idPaciente).delete();
  }

}
