import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RestService } from "./rest.service";

@Injectable()
export class AuthService {
  public token = new BehaviorSubject<string>('');

  constructor() { }

  /**
   * Sets JWT token in token behavior subjecet
   * @param {string} token
   */
  setToken(token: string): void {
    this.token.next(token);
  }

  /**
   * Returns JWT token string from token behavior subject
   * @returns {string}
   */
  getToken(): string {
    return this.token.getValue();
  }
}
