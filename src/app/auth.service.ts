import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

import 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router) { }

  authenticated() {
    return true;
  }
}
