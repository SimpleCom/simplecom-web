import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RestService } from '../../common/rest.service';
import { environment } from '../../environments/environment';
import { IUSerType } from '../../interfaces/usertype.interface';

@Injectable()
export class UserService {
  
  constructor(private _rest: RestService) {}

  getAllUsers(): Promise<any> {
    return this._rest.get(`${environment.constants.apiUrl}/user/list`);
  }

  deactiavetUser(user): Promise<any> {
    return this._rest.put(`${environment.constants.apiUrl}/user/${user.id}/status`, {status: 0});
  }

  reactivateUser(user): Promise<any> {
    return this._rest.put(`${environment.constants.apiUrl}/user/${user.id}/status`, {status: 1});
  }

  getUserByUserId(userId: number | string): Promise<any> {
    return this._rest.get(`${environment.constants.apiUrl}/user/${userId}`);
  }

  updateUser(user: any): Promise<any> {
    return this._rest.put(`${environment.constants.apiUrl}/user/${user.id}`, user);
  }

  getUserTypes(): Promise<any> {
    return this._rest.get(`${environment.constants.apiUrl}/user/types`);
  }

}
