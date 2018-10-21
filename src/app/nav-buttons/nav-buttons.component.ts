import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../common/auth.service';
import { IJWT } from '../../interfaces/jwt.interface';

@Component({
  selector: 'nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent {
  public user: IJWT;
  public isAdmin: boolean = false;

  constructor(private _router: Router, private _authService: AuthService) {
    this._authService.user.subscribe(user => {
      this.user = user;
      // user id 2 = admin
      if (this.user.userTypeID === 2) {
        this.isAdmin = true;
      }
    });
  }

  checkRoute(routerLink: string) {
    return location.href.includes(routerLink)
  }
  
  
  logout() {
    this._authService.setToken('');
    this._authService.setUser(undefined);
    this._router.navigate(['/login']);
  }
}
