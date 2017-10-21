import { Injectable } from "@angular/core";
import { RestService } from "../../common/rest.service";
import { IUser } from "../../interfaces/user.interface";
import { environment } from "../../environments/environment";

@Injectable()
export class LoginService {
  constructor(private _http: RestService) {}

  /**
   * Logs a user into the server given a user object
   * @param {IUser} user
   * @returns {Promise<any>}
   */
  Login(user: IUser): Promise<any> {
    return this._http.post(`${environment.constants.apiUrl}/user/login`, user);
  }
}
