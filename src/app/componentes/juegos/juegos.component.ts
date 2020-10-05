import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  public user;
  constructor(private us: UserServiceService) {
    this.user = us.logedInUser;
  }

  ngOnInit() {
  }

}
