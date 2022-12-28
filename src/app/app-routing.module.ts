import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {PetsComponent} from "./pets/pets.component";
import {AuthGuard} from "./auth.guard";
import {PetFormComponent} from "./pet-form/pet-form.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "my-pets", component: PetsComponent, canActivate: [AuthGuard]},
  {path: "add-pets", component: PetFormComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
