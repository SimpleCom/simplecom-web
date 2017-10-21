import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class RestService {

  public token = '';

  constructor(private _auth: AuthService, private _http: Http, private _router: Router) {
    this._auth.token.subscribe((token) => {
      this.token = token;
    });
  }

  /**
   * Abstracts HTTP POST
   * @param url {string}
   * @param body {any}
   * @returns {Promise<Observable<any>|T>}
   */
  post(url: string, body: any): Promise<any> {
    return this._http.post(url, body, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => {
        this.handleError(err);
      });
  }

  /**
   * Abstracts HTTP GET
   * @param url {string}
   * @returns {Promise<Observable<any>|T>}
   */
  get(url: string): Promise<any> {
    return this._http.get(url, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => {
        this.handleError(err);
      });
  }

  /**
   * Lets use set build options with auth token header on abstracted HTTP calls
   * @returns {{headers: Headers}} {RequestOptionsArgs}
   */
  buildOptions(): RequestOptionsArgs {
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', this.token);
    return options;
  }

  /**
   * Error handking for these calls
   * @param error {any}
   * @returns {any}
   */
  handleError(error: any): Observable<any> {
    if (error.status === 401 || error.statusText === 'Missing auth token') {
      this._router.navigate(['/login']);
    } else {
      return Observable.throw(error);
    }
  }
}