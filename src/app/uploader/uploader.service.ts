import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";

@Injectable()
export class UploaderService {
  public files: FileList;
  constructor(private _http: RestService) {}

  UploadFile(): Promise<any> {
    const fileList: FileList = this.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('EntityOid', '22');
      return this._http.post(`${environment.constants.apiUrl}/logo/upload`, formData);
    }
  }
}
