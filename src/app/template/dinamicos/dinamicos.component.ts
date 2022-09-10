import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre : string ;
  favoritos : Favorito[];
}

interface Favorito {
  id :  number ;
  nombre : string ;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  @ViewChild( 'miFormulario' ) miFormulario! : NgForm;

  nuevoJuego: string ='';

  persona : Persona = {
    nombre : 'Susy',
    favoritos : [
      { id: 1 , nombre: 'Desing Home' },
      { id: 2 , nombre: 'Diamond Dash' },
      { id: 3 , nombre: 'Mi Hogar' }
    ]
  }


  agregarJuego() {
    const nuevoFavorito : Favorito = {
      id : this.persona.favoritos.length + 1,
      nombre : this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito });
    this.nuevoJuego = '';
  }

  eliminar( index : number ) {
    this.persona.favoritos.splice( index, 1 );
  }



  nombreValido() : boolean {
    return this.miFormulario?.controls["nombre"]?.invalid &&
           this.miFormulario?.controls["nombre"]?.touched;
  }

  guardar(){
    console.log('Formulario posteado');
  }

}
