import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  colors = ['red', 'indigo', 'grey', 'green', 'blue', 'black', 'darkorange', 'gold'];
  public juegoTerminado = false;
  public matriz = [];
  public estilos = [];
  public acertados = 0;
  public mensajeVictoria = '';
  public seleccionados = 0;
  revelados = [];
  revelado = '';
  reveladoCords = [0,0];
  respuesta = [];

  constructor(private us: UserServiceService) {
    this.initMatriz();
  }

  ngOnInit(): void {
  }

  initMatriz(){

    let map = new Map<string,number>();

    //Armo la matriz
    for(let i=0 ; i<4 ; i++){
      let arr = [];
      let arr2 = [];
      for(let j=0 ; j<4 ; j++){
        let index = Math.floor(Math.random() * this.colors.length);
        let color = this.colors[index];

        if(!map.has(color)){
          map.set(color, 1);
          arr.push(color);
          arr2.push({'background-color': 'transparent'});
        }else{
          if(map.get(color) == 1){
            map.set(color, 2);
            arr.push(color);      
            arr2.push({'background-color': 'transparent'});
          }else{
            j--;
          }
        }  
      }
      
      this.matriz.push(arr);
      this.estilos.push(arr2);
    }
  }

  revelarColor(row, col){

    if(this.acertados == 8) return;
    if(this.revelados.includes(row+""+col)) return;
    if(this.seleccionados == 2) return;

    let color = this.matriz[row][col];

    if(this.revelado == ''){
      this.estilos[row][col] = {'background-color':color};
      this.revelado = color;
      this.reveladoCords = [row, col];
      this.seleccionados++;
    }else if(this.revelado == color){      
      this.estilos[row][col] = {'background-color':color};
      this.acertados++;
      this.revelados.push(row+""+col);
      
      if(this.acertados == 8){
        this.mensajeVictoria = 'Usted ha ganado!';
        this.us.registerResult('memotest', true);
      }

      this.revelado = '';
      this.seleccionados = 0;
    }else{
      this.estilos[row][col] = {'background-color':color};
      this.seleccionados++;
      setTimeout(() => {
        this.revelado = '';
        this.seleccionados = 0;
        this.estilos[row][col] = {'background-color':'transparent'};
        this.estilos[this.reveladoCords[0]][this.reveladoCords[1]] = {'background-color':'transparent'};
      }, 2000);
    }
    

        
  }

  reiniciarJuego(){

    this.mensajeVictoria = '';
    this.estilos = [];
    this.matriz = [];
    this.acertados = 0;
    this.revelados = [];
    this.initMatriz();
  }

}
