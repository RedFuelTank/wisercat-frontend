import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../user.service";
import {LoginRequest} from "../model/login-request";
import {LoginResponse, Role} from "../model/login-response";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginResponse | undefined>;
  public currentUser: Observable<LoginResponse | undefined>;

  constructor(private userService : UserService, private router: Router) {
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
    this.router.navigate(["/home"])
  }

  isAdmin() {
    return this.currentUserSubject ? this.currentUserSubject.value?.roles.includes(Role.Admin)
      : false;
  }
}
