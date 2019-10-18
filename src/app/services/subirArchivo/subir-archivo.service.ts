import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  private CARPETA_IMAGENES = 'psico-img';

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  subirArchivo( archivo: File, tipo: string, objeto: Usuario ) {

    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    let nombreArchivo;
    switch (tipo) {
      case 'usuario':
        nombreArchivo = `${objeto._id}-${new Date().getMilliseconds()}.${extension}`;
        break;

      case 'profesional':
        nombreArchivo = `${objeto._id}-${new Date().getMilliseconds()}.${extension}`;
        break;

      case 'paciente':
        nombreArchivo = `${objeto._id}-${new Date().getMilliseconds()}.${extension}`;
        break;

      case 'empresa':
        nombreArchivo = `${objeto._id}-${new Date().getMilliseconds()}.${extension}`;
        break;

      case 'informe':
        nombreArchivo = archivo.name;
        break;

      default:
        break;
    }

    if (objeto.img) {
      const objet = objeto.img.split('/');
      const obje = objet[7].split('?');
      const obj = obje[0].split('%2F');
      const ob = obj.join('/');
      const desertRef = this.storage.ref(`${ob}`);
      desertRef.delete()
        .subscribe(r => {
          console.log(r);
        });
    }

    const ref = this.storage.ref(`/${this.CARPETA_IMAGENES}/${tipo}/${nombreArchivo}`);
    return ref.put(archivo)
      .then( resp => {
        resp.ref.getDownloadURL().then( r => {
          objeto.img = r;
          this.guardarImagen(tipo, objeto);
        });
        return objeto;
      });

  }

  private guardarImagen(tipo: string, objeto: Usuario) {
    switch (tipo) {
      case 'usuario':
        return this.afs.collection('psi-usuarios').doc(objeto._id).set(objeto);

      // case 'profesional':
      //   return this.afs.collection('profesionales').doc(objeto._id).set(objeto);

      // case 'paciente':
      //   return this.afs.collection('pacientes').doc(objeto._id).set(objeto);

      // case 'empresa':
      //   return this.afs.collection('establecimiento').doc(objeto._id).set(objeto);
      default:
        break;
    }
  }
}
