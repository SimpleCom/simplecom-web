import {Injectable} from "@angular/core";
import {IUser} from "../../interfaces/user.interface";
import {environment} from "../../environments/environment";
import {RestService} from "../../common/rest.service";

@Injectable()
export class RegisterService {
  constructor(private _http: RestService) {}

  /**
   * Registers a user on the server given a user object
   * @param {IUser} user
   * @returns {Promise<any>}
   */
  Register(user: IUser): Promise<any> {
    return this._http.post(`${environment.constants.apiUrl}/user/register`, user);
  }
}
