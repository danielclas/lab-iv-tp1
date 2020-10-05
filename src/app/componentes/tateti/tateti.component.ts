import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../clases/juego-tateti';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  random;
  nuevoJuego : JuegoTateti;
  tateti = ["-", "-", "-"];
  movimientos = 0;
  usuario = "-";
  maquina = "-";
  botonesEleccion : boolean = false;
  botonesJuego : boolean = true;
  terminoJuego : boolean;
  band : boolean;
  nombreJugador : string;

  constructor(private us: UserServiceService) {
    this.terminoJuego = true;
    this.nuevoJuego = new JuegoTateti();
  }

  ngOnInit() {
  }

  eleccionSigno(signo) {
    this.botonesEleccion = true;
    this.botonesJuego = false;
    if (signo == "X") {
      this.usuario = "X";
      this.maquina = "O";
    }
    else {
      this.usuario = "O";
      this.maquina = "X";
    }
  }

  modificar(id) {
    if (this.nuevoJuego.lugares[id] == '-') {
      this.nuevoJuego.lugares[id] = this.usuario;

      document.images['rc' + id].src = "assets/" + this.usuario + ".png";
      document.images['rc' + id].alt = this.usuario;

      this.maquinamov();
    }
  }
  

  maquinamov()
  {
    
        this.nuevoJuego.resultado = this.nuevoJuego.signo(this.usuario, "jugador");
    
        if (this.nuevoJuego.resultado == "Gano" || this.nuevoJuego.resultado == "Perdio" || this.nuevoJuego.resultado == "Empate"){

          this.us.registerResult('tateti', this.nuevoJuego.resultado == 'Gano');
          this.band = true;
          (<HTMLInputElement>document.getElementById("botonUno")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonDos")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonTres")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonCuatro")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonCinco")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonSeis")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonSiete")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonOcho")).disabled = true;
          (<HTMLInputElement>document.getElementById("botonNueve")).disabled = true;
          this.terminoJuego = false;
        }
        else
          this.jugar();
    
  }
    
      jugar() 
      {
        this.random = Math.floor(Math.random() * 8);
        if (this.nuevoJuego.lugares[this.random] == "-") {
          this.nuevoJuego.lugares[this.random] = this.maquina;
          document.images['rc' + this.random].src = "assets/" + this.maquina + ".png";
          document.images['rc' + this.random].alt = this.maquina;
    
          this.nuevoJuego.resultado = this.nuevoJuego.signo(this.maquina, "maquina");
    

          if (this.nuevoJuego.resultado == "Gano" || this.nuevoJuego.resultado == "Perdio" || this.nuevoJuego.resultado == "Empate"){

            this.us.registerResult('tateti', this.nuevoJuego.resultado == 'Gano');
            this.band = true;
            (<HTMLInputElement>document.getElementById("botonUno")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonDos")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonTres")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonCuatro")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonCinco")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonSeis")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonSiete")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonOcho")).disabled = true;
            (<HTMLInputElement>document.getElementById("botonNueve")).disabled = true;
            this.terminoJuego = false;
          }  
        }
        else {
          this.jugar();
        }
      }

  reiniciarJuego()
  {
    document.images['rc0'].src = "assets/nothing.gif";
    document.images['rc1'].src = "assets/nothing.gif";
    document.images['rc2'].src = "assets/nothing.gif";
    document.images['rc3'].src = "assets/nothing.gif";
    document.images['rc4'].src = "assets/nothing.gif";
    document.images['rc5'].src = "assets/nothing.gif";
    document.images['rc6'].src = "assets/nothing.gif";
    document.images['rc7'].src = "assets/nothing.gif";
    document.images['rc8'].src = "assets/nothing.gif";
    (<HTMLInputElement>document.getElementById("botonUno")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonDos")).disabled = false; 
    (<HTMLInputElement>document.getElementById("botonTres")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonCuatro")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonCinco")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonSeis")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonSiete")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonOcho")).disabled = false;
    (<HTMLInputElement>document.getElementById("botonNueve")).disabled = false;
    this.terminoJuego = true;
    this.botonesJuego = true;
    this.botonesEleccion = false;
    this.nuevoJuego = new JuegoTateti();
  }
}