class Persona{
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number){
        this.nombre = nombre;
        this.edad = edad
    }

    mostrarDetalles(){
        console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}`);
    }
}