import { Injectable } from "@angular/core";
import { RestService } from "../../common/rest.service";
import { environment } from "../../environments/environment";

import { AuthService } from '../../common/auth.service';
import {IContact} from "../../interfaces/contacts.interface";

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

    console.log('here');

    return this._http.post(`${ environment.constants.apiUrl }/lists/${ id }/contacts`, body);
  }

  /**
   * Deletes list from the server
   * @param {number} listId
   * @returns {Promise<any>}
   */
  DeleteContact(listId: number, contactID: number): Promise<any> {
    return this._http.delete(`${environment.constants.apiUrl}/lists/${listId}/contacts/${contactID}`);
  }

  /**
   * Deletes list from the server
   * @param {number} listId
   * @returns {Promise<any>}
   */
  EditContact(listId: number, contact: IContact): Promise<any> {
    return this._http.put(`${environment.constants.apiUrl}/lists/${listId}/contacts/${contact.id}`, contact);
  }
}
