import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  public respuesta = false;
  public gano = false;
  public elegido = "";
  public arr = ['piedra', 'papel', 'tijera'];


  constructor(private us: UserServiceService) { }

  ngOnInit(): void {
    let opcion = Math.floor((Math.random() * 3) + 1);
    this.elegido = this.arr[opcion];
  }

  comprobar(opcion){
    
    if(this.respuesta) return;

    switch(opcion){
      case 'piedra':
          this.gano = this.elegido == 'tijera';
          break;
      case 'tijera':
          this.gano = this.elegido == 'papel';
          break;
      case 'papel':
          this.gano = this.elegido == 'piedra';
          break;        
      default:
        this.gano = false;
    }

    this.us.registerResult('piedrapapeltijera', this.gano);
    this.respuesta = true;
  }

  jugarDeNuevo(){
    
    let opcion = Math.floor((Math.random() * 2) + 1);
    this.elegido = this.arr[opcion];
    this.respuesta = false;
    this.gano = false;
  }

}
