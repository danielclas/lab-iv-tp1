
import { KeyValue } from '@angular/common';
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { User, UserServiceService } from './../../user-service.service';
import {Juegos} from '../../constants';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

  public showSpinner = true;
  public listado = [];

  constructor(private us: UserServiceService) {
    this.us.getUsers().subscribe(users => {
      this.listado = [];
      users.forEach(user => {
        let jugador = user.email;
        let scores = JSON.parse(JSON.stringify(user.scores));
        for(let juego in scores){
          for(let resultado of scores[juego]){
            let nombre = this.formatearNombre(juego);
            let res = resultado ? 'Ganó' : 'Perdió';
            
            this.listado.push({
              'nombre':nombre,
              'jugador':jugador,
              'resultado':res
            })
          }
        }
      });
      this.showSpinner = false;
    });
   }

  ngOnInit() {
  }

  formatearNombre(nombre: string){
    return Juegos[nombre];
  }

}
