import {Injectable} from "@angular/core";
import {RestService} from "../../common/rest.service";
import {environment} from "../../environments/environment";
import {IJWT} from "../../interfaces/jwt.interface";
import {AuthService} from "../../common/auth.service";

@Injectable()
export class LogoService {
  public user: IJWT;

  constructor(private _http: RestService, private _auth: AuthService) {
    this._auth.user.subscribe((user: IJWT) => {
      this.user = user;
    });
  }

  GetLogoByUser() {
    return this._http.get(`${environment.constants.apiUrl}/user/${this.user.id}/logo`);
  }
}
