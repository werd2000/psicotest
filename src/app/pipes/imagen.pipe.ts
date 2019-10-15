import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  token: string;

  constructor() { }

  transform(img: string, tipo: string = 'usuario'): any {

    let url = 'assets/img';

    if (!img) {
      img = 'usuario_default.jpeg';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'profesional':
        url += '/profesionales/' + img;
        break;
      case 'paciente':
        url += '/pacientes/' + img;
        break;
      case 'test':
        url += '/tests/' + img;
        break;
      default:
      console.log('Tipo de imagen no válida. Usuario, Profesional, Centro Médico');
      url += '/usuario/xxx';
    }
    // console.log(url);
    return url;
  }

}
