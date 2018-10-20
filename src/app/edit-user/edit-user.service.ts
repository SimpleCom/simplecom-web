import { Injectable } from '@angular/core';
import { RestService } from '../../common/rest.service';

@Injectable()
export class EditUserService {
  
  constructor(private _rest: RestService) {}
}
