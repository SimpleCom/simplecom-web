import { Injectable } from '@angular/core';
import {RestService} from '../common/rest.service';
import {environment} from '../environments/environment';

@Injectable()
export class AppService {
  constructor (private _http: RestService) { }

  verifyIP(): Promise<any> {
    return this._http.get(environment.constants.apiUrl);
  }
}
