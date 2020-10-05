import { Component, OnInit } from '@angular/core';
import { UserServiceService, User } from './../../user-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public showSpinner = true;
  users: User[];

  constructor(private userService: UserServiceService) {    
  }
  
  ngOnInit() {   
  }
  
}
