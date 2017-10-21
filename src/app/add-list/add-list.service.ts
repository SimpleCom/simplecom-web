import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IList} from "../../interfaces/list.interface";

@Injectable()
export class AddListService {

  public lists = new BehaviorSubject<IList>(<IList>{});

  constructor(private _http: RestService) {}

  saveNewList(listName: string): Promise<any> {
    return this._http.post(`${environment.constants.apiUrl}/list`, {listName});
  }

  getList(): Promise<any> {
    return this._http.get(`${environment.constants.apiUrl}/list`);
  }

}
