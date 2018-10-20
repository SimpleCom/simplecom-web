import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RestService } from '../../common/rest.service';
import { environment } from '../../environments/environment';
import { IUSerType } from '../../interfaces/usertype.interface';
import { IOrganization } from '../../interfaces/organizations.interface';

@Injectable()
export class OrganizationService {
  
  constructor(private _rest: RestService) {}

  getAllOrganizations(): Promise<any> {
    return this._rest.get(`${environment.constants.apiUrl}/organization`);
  }

  addNewOrganization(name: string): Promise<any> {
    return this._rest.post(`${environment.constants.apiUrl}/organization`, {name});
  }

  updateOrganization(organization: IOrganization): Promise<any> {
    return this._rest.put(`${environment.constants.apiUrl}/organization/${organization.id}`, organization);
  }

  deleteOrganization(organization: IOrganization): Promise<any> {
    return this._rest.delete(`${environment.constants.apiUrl}/organization/${organization.id}`);
  }

}
