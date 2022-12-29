import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./jwt.interceptor";
import {ErrorInterceptor} from "./error.interceptor";
import { PetsComponent } from './pets/pets.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableHeaderDirective } from './sortable-header.directive';
import { AllPetsComponent } from './all-pets-admin/all-pets.component';
import { PetComponent } from './pet/pet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PetsComponent,
    PetFormComponent,
    SortableHeaderDirective,
    AllPetsComponent,
    PetComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
