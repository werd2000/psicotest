export class Paciente {
    constructor(
        public apellido: string,
        public nombre: string,
        public tipoDoc: string,
        public nroDoc: string,
        public nacionalidad: string,
        public sexo: string,
        public cargadoPor: string,
        public actualizado: string,
        public domicilio?: string,
        public contacto?: string,
        public fechaNac?: string,
        public img?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }
}
