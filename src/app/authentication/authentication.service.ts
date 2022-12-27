import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../user.service";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginResponse | undefined>;
  public currentUser: Observable<LoginResponse | undefined>;

  constructor(private userService : UserService) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.currentUserSubject = new BehaviorSubject(currentUserJson)
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginRequest: LoginRequest) : Observable<LoginResponse>{
    return this.userService.login(loginRequest).pipe(
      map((response : LoginResponse) => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      })
    )
  }

  public get getCurrentUserValue(): LoginResponse | undefined {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(undefined);
  }
}
