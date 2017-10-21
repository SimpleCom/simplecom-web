import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../common/auth.service';

@Component({
  selector: 'nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent {
  constructor(private router: Router, private authService: AuthService) {}
  
  logout() {
    this.authService.setToken('');
    this.router.navigate(['/login']);
  }
}
