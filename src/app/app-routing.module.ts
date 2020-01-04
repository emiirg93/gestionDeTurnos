import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard]},
  { path: "registro", component: SignInComponent, canActivate: [NoAuthGuard]},
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "**", pathMatch: "full", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
