import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { AuthService } from '../../common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, private authService: AuthService) {}

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // code: ['', Validators.required],
  });

  private loggingIn: boolean = false;
  private errorMesssage: string = '';

  login() {
    this.loggingIn = true;

    const username: string = this.loginForm.value.username;
    const password: string = this.loginForm.value.password;

    const user = {
      "uname": username,
      "pass": password
    };

    this.loginService.Login(user)
      .then((response) => {
        if (response) {
          this.authService.setToken(response.jwt);
          console.log(this.authService.getToken());
          this.router.navigate(['/home']);
        } else {
          this.errorMesssage = 'An error occured';
        }

        this.loggingIn = false;
      }
    );
  }
}
