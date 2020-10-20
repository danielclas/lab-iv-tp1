import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url: string = "https://restcountries.eu/rest/v2/all";

  constructor(private http: HttpClient) { }

  public get(){
    return this.http.get(this.url);
  }
}
