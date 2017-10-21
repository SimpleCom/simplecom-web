import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ILogin} from "../interfaces/login.interface";

@Injectable()
export class AuthService {
  public token = new BehaviorSubject<string>('');

  constructor(private http: Http, private router: Router) { }

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

  /**
   * Calls login to the server, passes username and password
   */
  login(login: ILogin): void {
    // todo -jt
  }

  /**
   * Calls register to server, passes username and password
   */
  register(login: ILogin): void {
    // todo -jt
  }

  /**
   * Passes invite code to server and returns if it's valid or not
   * @param {string} inviteCode
   * @returns {boolean}
   */
  checkInviteCode(inviteCode: string): boolean {
    return true;
  }
}
