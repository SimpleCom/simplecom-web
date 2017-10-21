import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";

@Injectable()
export class UploaderService {
  constructor(private _http: RestService) {}

  UploadFile(event: any): Promise<any> {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('EntityOid', '22');
      return this._http.post(`${environment.constants.apiUrl}/logo/upload`, formData);
    }
  }
}
