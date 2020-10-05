import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})


export class AnagramaComponent implements OnInit {

  public gano = false;
  public palabra;
  public respuestaCorrecta;
  public respuesta;
  public verificado = false;
  palabras = ['Monitor','Teclado','Mouse','Mate','Termo','Puerta','Ventana','Gabinete','Lampara','Guitarra','Estante','Arbol','Mesa','Silla','Tarea','Angular','Computadora','Escritorio','Pizarra','Impresora','Profesor','Alumno','Perro','Casa','Hogar','Objeto','Pueblo','Continente'];


  ngOnInit() {
  }

  constructor(private us: UserServiceService){
    this.desordenarPalabra();
  }

  verificar(){
    this.gano = this.respuestaCorrecta == this.respuesta;    
    this.verificado = true;

    this.us.registerResult('anagrama', this.gano);
  }

  limpiar(){
    this.verificado = false;
    this.respuesta = "";
    this.gano = false;
    this.desordenarPalabra();
  }

  desordenarPalabra(){

    let index = Math.floor((Math.random() * this.palabras.length));
    let word = this.palabras[index].toLocaleLowerCase();
    this.respuestaCorrecta = word;
    let a = word.split(""), n = a.length;
    
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
    
    this.palabra = a.join("");
  }
}
