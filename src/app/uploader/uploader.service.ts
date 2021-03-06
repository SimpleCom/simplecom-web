import { Injectable } from '@angular/core';
import { RestService } from '../../common/rest.service';
import { environment } from '../../environments/environment';
import { IJWT } from '../../interfaces/jwt.interface';
import { AuthService } from '../../common/auth.service';

@Injectable()
export class UploaderService {
  public files: FileList;
  constructor(private _http: RestService) {}

  UploadFile(organizationId: string | number): Promise<any> {
    const fileList: FileList = this.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      return this._http.post(`${environment.constants.apiUrl}/organization/${organizationId}/logo`, formData);
    }
  }
}
