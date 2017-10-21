import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent {
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['/home']);
  }
}
