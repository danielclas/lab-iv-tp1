import { UserServiceService, User } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  public showSpinner = true;
  users: User[];

  constructor(private userService: UserServiceService) {
  }
    


  ngOnInit() {
    this.showSpinner = true;
    this.userService.getUsers().subscribe(a => {
      this.users = a;
      this.showSpinner = false;
    });
  }


}
