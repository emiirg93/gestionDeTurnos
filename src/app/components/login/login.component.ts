import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  recordar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
      ]
    ],
    password: ["", [Validators.required]],
    recordar: []
  });

  ngOnInit() {

    if(localStorage.getItem('email')){
      this.loginForm.get('email').setValue(localStorage.getItem('email'));
      this.loginForm.get('recordar').setValue('true');
    }

  }

  onSubmit() {
    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      title: "Espere por favor..."
    });

    Swal.showLoading();

    this.auth.logIn(this.loginForm.value).subscribe(
      data => {
        Swal.close();

        if(this.loginForm.get("recordar").value){
          localStorage.setItem('email',this.loginForm.get('email').value);
        }

        this.router.navigateByUrl("/home");
      },
      err => {
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error",
          text: "El usuario o la contraseña no son invalidos"
        });
      }
    );
  }
}
