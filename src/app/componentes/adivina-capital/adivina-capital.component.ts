import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../request-service.service';
import { Pais } from './pais';

@Component({
  selector: 'app-adivina-capital',
  templateUrl: './adivina-capital.component.html',
  styleUrls: ['./adivina-capital.component.css']
})
export class AdivinaCapitalComponent implements OnInit {
  
  paises: Pais[] = [];
  public correctas: number = 0;
  public erradas: number = 0;
  public preguntas: Pregunta[] = [];
  public indicePreguntas = 0;
  public terminado = false;

  constructor(private http: RequestService, private us: UserServiceService) {     
  }

  ngOnInit(): void {
    this.http.get().subscribe((data: any[]) => {
      this.paises = data;
      this.iniciarJuego();  
    });
  }

  comprobar(opcion){

    if(this.terminado) return;
    
    if(opcion == this.preguntas[this.indicePreguntas].opciones.indexOf(this.preguntas[this.indicePreguntas].capital)){
      this.correctas++;
    }else{
      this.erradas++;
    }

    if(this.indicePreguntas<9){
      this.indicePreguntas++;
    }
    else{
      this.terminado = true;
      this.us.registerResult('adivinalacapital', this.correctas == 10);
    }
  }
  
  reiniciar(){
    this.iniciarJuego();
    this.indicePreguntas = 0;
    this.terminado = false;
    this.erradas = 0;
    this.correctas = 0;
  }
  iniciarJuego(){
    let enUso = [];
    this.preguntas = [];
    
    for(let i=0 ; i<10 ; i++){
      let index =  Math.floor((Math.random() * this.paises.length) + 1);
      let pais = this.paises[index];

      if(enUso.includes(index)){
        i--;
        continue;
      }else{
        let capital = pais.capital;
        let nombre = pais.name;
        let bandera = pais.flag;
        let temp = [];
        let opciones = [];
        while(temp.length < 3){
          let random = Math.floor(Math.random() * this.paises.length + 1);
          if(!temp.includes(random)){
            temp.push(random);            
          }
        }

        for(let a of temp){
          opciones.push(this.paises[a].capital);
        }

        opciones.push(capital);

        this.preguntas.push(new Pregunta(opciones, capital, nombre, bandera));
      }
      
    }
  }

}

class Pregunta {

  public opciones = [];
  public capital;
  public nombre;
  public bandera;

  constructor(opciones, capital, nombre, bandera){
    this.opciones = opciones;
    this.capital = capital;
    this.nombre = nombre;
    this.bandera = bandera;
    this.mezclarOpciones();
  }

  mezclarOpciones(){
    let j, x, i, a = this.opciones;
    
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }   

  }
}
