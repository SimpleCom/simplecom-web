import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {JWTService} from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private _jwt: JWTService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._jwt.checkToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
