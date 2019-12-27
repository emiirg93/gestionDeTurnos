import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  loginForm = this.fb.group({
    email: [
      "",[Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]
    ],
    password: ["", [Validators.required]]
  });

  ngOnInit() {}

  onSubmit() {
    this.auth.logIn(this.loginForm.value)
    .subscribe((data)=>{
      console.log(data);
    }, (err)=>{
      console.log()
    })
  }
}
