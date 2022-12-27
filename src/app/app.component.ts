import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";
import {LoginResponse} from "./model/login-response";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'best-friend';

  constructor(private authenticationService : AuthenticationService) {
  }

  public get getCurrentValue(): LoginResponse | undefined {
    return this.authenticationService.getCurrentUserValue
  }

  logout() {
    this.authenticationService.logout()
  }
}
