import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AddListService {

  constructor(private _http: RestService) {}

  /**
   * Add new list given a list name
   * @param {string} listName
   * @returns {Promise<any>}
   */
  AddNewList(listName: string): Promise<any> {
    if (environment.isTest) {
      return this._http.get('/assets/json/AddNewList.json');
    } else {
      return this._http.post(`${environment.constants.apiUrl}/list`, {listName});
    }
  }
}
