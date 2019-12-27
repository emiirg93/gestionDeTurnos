import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { usuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  especialidad:String[] = ["Peluqueria","Manicura","alisado"]
  usuario:usuarioModel;

  constructor(private fb:FormBuilder, private auth:AuthService) { }

  registroForm = this.fb.group({
    nombre: ['',[Validators.required]],
    apellido: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['',[Validators.required,Validators.minLength(8)]],
    especialidad:['']

  })

  ngOnInit() {
  }

  onSubmit(){
    this.auth.signUp(this.registroForm.value)
    .subscribe(data => {
      
    }, (err) => {
      console.log(err);
    })
  }

  private asignar() {
  }

}
