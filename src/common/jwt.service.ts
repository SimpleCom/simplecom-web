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
    if (!this._authService.getToken()) {
      return false;
    } else {
      return true;
    }

  }
}
