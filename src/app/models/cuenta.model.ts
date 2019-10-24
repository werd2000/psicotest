export class Cuenta {
    constructor(
        public tipo: string,
        public fechaIngreso: string,
        public fechaEgreso: string,
        public fechaFinCuenta: string,
        public _id?: string
    ) { }
}
