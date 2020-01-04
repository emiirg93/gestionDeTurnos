import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { usuarioModel } from "../models/usuario.model";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apiKey = "AIzaSyDYZ49pzrbDYG-fxiSzrqtlrMyOL-ws77g";
  userToken:string;

  //crear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn(usuario: usuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  signUp(usuario: usuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
    .pipe(
      map( resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;

    localStorage.setItem("token", idToken);
  }

  private leerToken():string{
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado():boolean{
    return this.userToken.length > 2;
  }
}
