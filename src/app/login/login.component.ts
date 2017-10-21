import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private fb: FormBuilder) {}

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // code: ['', Validators.required],
  });

  login() {
    this.router.navigate(['/home']);
  }
}
