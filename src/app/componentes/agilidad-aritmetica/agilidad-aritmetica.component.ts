import { UserServiceService } from './../../user-service.service';
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 

  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  private subscription: Subscription;
  ngOnInit() {

  }

  constructor(private us: UserServiceService) {
     this.ocultarVerificar=false;
     this.Tiempo=5; 
     this.NuevoJuego();
  }

  NuevoJuego() {
  this.ocultarVerificar=false;
  this.nuevoJuego = new JuegoAgilidad();
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);

  }

  verificar(){
    this.ocultarVerificar=true;
    clearInterval(this.repetidor);   
    this.nuevoJuego.calcularGano();
    this.us.registerResult('agilidadaritmetica', this.nuevoJuego.gano);
  }  

}
