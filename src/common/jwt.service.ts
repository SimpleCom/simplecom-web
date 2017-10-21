import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable()
export class JWTService {

  constructor(private _authService: AuthService) { }

  /**
   * Checks to see if they have a valid auth token
   * @returns {boolean}
   */
  checkToken(): boolean {
    if (localStorage.getItem('token')) {
      this._authService.setToken(localStorage.getItem('token'));
    } else {
      return false;
    }
    if (this._authService.getToken() && this._authService.getToken() !== '') {
      const token = this._authService.getToken().split('.')[1];
      const parsedToken = JSON.parse(atob(token));
      if (new Date(parsedToken.ExpirationTime).getTime() < new Date().getTime()) {
        return false;
      } else {
        return true;
      }
    }


  }
}
