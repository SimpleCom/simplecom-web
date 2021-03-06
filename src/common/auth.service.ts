import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IJWT } from '../interfaces/jwt.interface';

@Injectable()
export class AuthService {
  public token = new BehaviorSubject<string>('');
  public user = new BehaviorSubject<any>(undefined);

  constructor() {}

  /**
   * Sets JWT token in token behavior subjecet
   * @param {string} token
   */
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.token.next(`Bearer ${token}`);
    this.setUser(token);
  }

  /**
   * Returns JWT token string from token behavior subject
   * @returns {string}
   */
  getToken(): string {
    if (sessionStorage.getItem('token')) {
      this.setToken(sessionStorage.getItem('token'));
    }
    return this.token.getValue();
  }

  /**
   * Sets user object based on decoded token
   */
  setUser(token: string): void {
    if (token) {
      const encryptedToken = token;
      const tokenPayload = JSON.parse(atob(encryptedToken.split('.')[1]));
      if (typeof tokenPayload === 'object') {
        this.user.next(tokenPayload);
      }
    } else {
      this.user.next(undefined);
    }
  }

  /**
   * Gets user object based on decoded token
   * @returns {any}
   */
  getUser(): IJWT {
    return this.user.getValue();
  }
}
