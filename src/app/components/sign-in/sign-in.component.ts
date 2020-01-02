import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { usuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  especialidad:String[] = ["Peluqueria","Manicura","alisado"]
  usuario:usuarioModel;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) { }

  registroForm = this.fb.group({
    nombre: ['',[Validators.required]],
    apellido: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['',[Validators.required,Validators.minLength(8)]],
    especialidad:[''],
    recordar:[]
  })

  ngOnInit() {
  }

  onSubmit(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.signUp(this.registroForm.value)
    .subscribe(data => {

      if(this.registroForm.get("recordar").value){
        localStorage.setItem('email',this.registroForm.get('email').value);
      }

      Swal.fire({
        showConfirmButton: false,
        allowOutsideClick: false,
        icon: 'success',
        title: 'Usuario Registrado',
        timer: 2500
      });
      setTimeout(resp =>{
        this.router.navigateByUrl('/home');
      },3000)
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error',
        text: 'Usuario Ya Registrado'
      })
    })
  }

}
