import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDYZ49pzrbDYG-fxiSzrqtlrMyOL-ws77g';

  //crear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http:HttpClient) { }

  logOut(){

  }

  logIn(usuario:usuarioModel){
    
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`, authData
    )
  }

  signUp(usuario:usuarioModel){
    
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, authData
    )
  }
}
