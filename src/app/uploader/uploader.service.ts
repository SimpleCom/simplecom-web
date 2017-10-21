import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";
import {IJWT} from "../../interfaces/jwt.interface";
import {AuthService} from "../../common/auth.service";

@Injectable()
export class UploaderService {
  public files: FileList;
  public user: IJWT;
  constructor(private _http: RestService, private _authService: AuthService) {
    this._authService.user.subscribe((user: IJWT) => {
      this.user = user;
    });
  }

  UploadFile(): Promise<any> {
    const fileList: FileList = this.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      return this._http.post(`${environment.constants.apiUrl}/user/${this.user.id}/logo`, formData);
    }
  }
}
