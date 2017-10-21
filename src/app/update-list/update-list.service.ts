import { Injectable } from "@angular/core";
import { RestService } from "../../common/rest.service";
import { environment } from "../../environments/environment";

import { AuthService } from '../../common/auth.service';

@Injectable()
export class UpdateListService {

  constructor(private _http: RestService, private authService: AuthService) {}

  /**
   * Gets all list details from server
   * @returns {Promise<any>}
   */
  GetListDetails(id): Promise<any> {
    return this._http.get(`${ environment.constants.apiUrl }/lists/${ id }`);
  }

  GetListContacts(id): Promise<any> {
    return this._http.get(`${ environment.constants.apiUrl }/lists/${ id }/contacts`);
  }

  // Same for editing list contact
  AddListContact(id, contact): Promise<any> {
    const body = {
      "name": contact.name,
      "email": contact.email
    };

    return this._http.post(`${ environment.constants.apiUrl }/lists/${ id }/contacts`, body);
  }
}
