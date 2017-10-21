import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";
import {ICodes} from "../../interfaces/codes.interface";

@Injectable()
export class CodesService {
  constructor(private _http: RestService) {}

  /**
   * Adds new public and secure codes to database
   * @param {ICodes} codes
   * @returns {Promise<any>}
   */
  AddNewCodes(codes: ICodes): Promise<any> {
    return this._http.post(`${environment.constants.apiUrl}/code`, {codes});
  }

  /**
   * Deletes all code pairs from database
   * @returns {Promise<any>}
   */
  DeleteCodes(): Promise<any> {
    return this._http.delete(`${environment.constants.apiUrl}/code`);
  }

  /**
   * Edits code pair in database
   * @param {ICodes} codes
   * @returns {Promise<any>}
   */
  EditCodes(codes: ICodes): Promise<any> {
    return this._http.put(`${environment.constants.apiUrl}/code`, codes);
  }
}
