import { Component, ViewContainerRef } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../common/auth.service';
import { IJWT } from '../interfaces/jwt.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: IJWT;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private _auth: AuthService) {
    this.toastr.setRootViewContainerRef(vcr);
    this._auth.user.subscribe(user => {
      this.user = user;
    });
  }
}
