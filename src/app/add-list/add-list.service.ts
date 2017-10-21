import { Injectable } from "@angular/core";
import { RestService } from "../../common/rest.service";
import { environment } from "../../environments/environment";

import { AuthService } from '../../common/auth.service';

@Injectable()
export class AddListService {

  constructor(private _http: RestService, private authService: AuthService) {}

  /**
   * Add new list given a list name
   * @param {string} listName
   * @returns {Promise<any>}
   */
  AddNewList(listName: string): Promise<any> {
    const body = {
      "name": listName
    }

    return this._http.post2(`${ environment.constants.apiUrl }lists`, body);
  }
}
