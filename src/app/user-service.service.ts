import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Juegos} from '../app/constants';

export interface User{
  email: string;
  password: string;
  scores: Map<string,boolean[]>;
  id?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  collection: AngularFirestoreCollection<User>;
  users: Observable<User[]>
  logedInUser: User;

  constructor(private afs: AngularFirestore) { 
    this.collection = this.afs.collection('users');
    this.users = this.collection.valueChanges();
  }

  getUsers(){
    return this.users;
  }

  loginUser(user){
    this.logedInUser = user;
  }

  registerUser(email: string, password: string){

    let user = {
      'email':email,
      'password':password,
      'scores':{}
    };

    return this.afs.collection('users').add(user);
  }

  registerResult(juego: string, resultado: boolean){
    let user = this.logedInUser.email;
    let doc = this.afs.collection('users', ref => {
      return ref.where('email', '==', user);
    });

    doc.get().subscribe(ref => {
      let scores = ref.docs[0].data()['scores'];

      if(!scores) scores = {};

      if(scores[juego]) scores[juego].push(resultado);
      else scores[juego] = [resultado];
      
      this.afs.collection('users').doc(ref.docs[0].id).update({'scores':scores});
    });
    
  };

  userExists(email: string){

    return this.afs.collection('users', ref => {
      return ref.where('email', '==', email);
    });
  }
}
