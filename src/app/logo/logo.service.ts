import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";

@Injectable()
export class LogoService {
  constructor(private _http: RestService) {}

  /**
   * Sends file stream to server to be uploaded to s3 bucket and saves logo
   * @param logo
   * @returns {Promise<any>}
   */
  SaveLogo(logo: any): Promise<any> {
    // TODO: need to add file stream to save to server s3 bucket
    return this._http.post(`${environment.constants.apiUrl}/logo`, {logo});
  }
}
