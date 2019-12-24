import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { usuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  especialidad:String[] = ["Peluqueria","Manicura","alisado"]
  usuario:usuarioModel;

  constructor(private fb:FormBuilder) { }

  registroForm = this.fb.group({
    nombre: ['',[Validators.required]],
    apellido: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password1: ['',[Validators.required,Validators.minLength(8)]],
    password2:['',[Validators.required]],
    especialidad:['']

  })

  ngOnInit() {
  }

  onSubmit(){
    this.usuario = new usuarioModel();
    console.log(this.usuario.nombre);
  }

  asignar(form:FormBuilder){
    this.usuario.nombre = this.registroForm.get('nombre').value;
  }

}
