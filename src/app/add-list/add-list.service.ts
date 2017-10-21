import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AddListService {

  constructor(private _http: RestService) {}

  saveNewList(listName: string): Promise<any> {
    return this._http.post(`${environment.constants.apiUrl}/list`, {listName});
  }

  getList(): Promise<any> {
    return this._http.get(`${environment.constants.apiUrl}/list`);
  }

}
