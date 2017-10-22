import { Injectable } from "@angular/core";

import { RestService } from "../../common/rest.service";
import { environment } from "../../environments/environment";

import { ICodes } from "../../interfaces/codes.interface";

@Injectable()
export class CodesService {
  constructor(private _http: RestService) {}

  /**
   * Adds new public and secure codes to database
   * @param {ICodes} codes
   * @returns {Promise<any>}
   */
  AddNewCodes(codes: ICodes): Promise<any> {
    return this._http.put(`${ environment.constants.apiUrl }/codes`, codes);
  }

  /**
   * Gets both public and secure codes from database
   * @returns {Promise<any>}
   */
  getAllCodes(): Promise<any> {
    return this._http.get(`${ environment.constants.apiUrl }/codes`);
  }
}
