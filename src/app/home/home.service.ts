import { Injectable } from "@angular/core";
import { RestService } from "../../common/rest.service";
import { environment } from "../../environments/environment";
import { IListMember } from "../../interfaces/list-member.interface";

@Injectable()
export class HomeService {
  constructor(private _http: RestService) {}

    /**
   * Add new list given a list name
   * @param {string} listName
   * @returns {Promise<any>}
   */
  AddNewList(listName: string): Promise<any> {
    const body = {
      "name": listName
    }

    return this._http.post(`${ environment.constants.apiUrl }/lists`, body);
  }
  
  /**
   * Gets all lists from server
   * @returns {Promise<any>}
   */
  GetAllLists(): Promise<any> {
    return this._http.get(`${ environment.constants.apiUrl}/lists`);
  }

  /**
   * Deletes list from the server
   * @param {number} listId
   * @returns {Promise<any>}
   */
  DeleteList(listId: number): Promise<any> {
    return this._http.delete(`${environment.constants.apiUrl}/lists/${listId}`);
  }

  /**
   * Edits list name given a list ID
   * @param {number} listId
   * @param {string} listName
   * @returns {Promise<any>}
   * @constructor
   */
  EditListName(listId: number, listName: string): Promise<any> {
    return this._http.put(`${environment.constants.apiUrl}/${listId}`, {listName});
  }

  /**
   * Adds member to list given a listID and member object
   * @param {number} listId
   * @param {IListMember} member
   * @returns {Promise<any>}
   */
  AddMemberToList(listId: number, member: IListMember): Promise<any> {
    return this._http.post(`${environment.constants.apiUrl}/${listId}`, member);
  }

  /**
   * Deletes member from list given listId and memberId
   * @param {number} listId
   * @param {number} memberId
   * @returns {Promise<any>}
   */
  DeleteMemberFromList(listId: number, memberId: number): Promise<any> {
    return this._http.delete(`${environment.constants.apiUrl}/${listId}/${memberId}`);
  }

  /**
   * Edit member on list given listId and member object
   * @param {number} listId
   * @param {IListMember} member
   * @returns {Promise<any>}
   */
  EditMemberFromList(listId: number, member: IListMember): Promise<any> {
    return this._http.put(`${environment.constants.apiUrl}/${listId}/${member._id}`, member);
  }
}
