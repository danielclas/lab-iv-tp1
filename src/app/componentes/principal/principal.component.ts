import { log } from 'util';
import { UserServiceService } from './../../user-service.service';
import { Component, OnInit } from '@angular/core';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public user;
  public email: string;
  public password: string;
  public mensajeMalo = '';
  public mensajeBueno = '';
  public estiloMensaje = {'color': 'red'};
  public showSpinner = false;

  constructor(private us: UserServiceService) {  }

  ngOnInit() {
    this.user = this.us.logedInUser;
  }

  logOut(){
    this.user = null;
    this.us.logedInUser = null;
    this.email = '';
    this.password = '';
  }

  loginUser(){

    if(!EmailValidator.validate(this.email) ||  !this.password || this.password.length < 1){
      this.mensajeMalo = 'Los datos ingresados no son válidos';
      return;
    }

    this.showSpinner = true;

    this.us.userExists(this.email).get().subscribe(docs => {
      let exists = docs.docs.some(doc => doc.data()['password'] == this.password);

      if(!exists){
        this.mensajeMalo = 'El usuario y contraseña con el que se intenta ingresar no existe';
      }else{
        this.us.loginUser(docs.docs[0].data());
        this.user = this.us.logedInUser;
      }

      this.showSpinner = false;
    })
  }

  onChange($event){
    this.mensajeMalo = '';
    this.mensajeBueno = '';
  }

  registerUser(){

    if(!EmailValidator.validate(this.email) || !this.password || this.password.length < 1){
      this.mensajeMalo = 'Los datos ingresados no son válidos';
      return;
    }

    this.showSpinner = true;

    this.us.userExists(this.email).get().subscribe(docs => {
      let exists = docs.docs.length != 0;

      if(exists){
        this.mensajeMalo = 'Ya existe un usuario con ese correo';
      }else{
        this.us.registerUser(this.email, this.password).then(res => {
          this.mensajeBueno = 'El usuario fue registrado exitosamente';
          this.showSpinner = false;          
        });
      }
    })
  }

 

}
