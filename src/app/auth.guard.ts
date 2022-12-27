import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService : AuthenticationService, private router : Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let currentUser = this.authenticationService.getCurrentUserValue;

    if (currentUser && currentUser.token) {
      return true;
    }
    this.router.navigate(["/login"], { queryParams: {returnUrl: state.url}})
    return false;
  }

}

