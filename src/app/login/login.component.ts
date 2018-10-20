import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LoginService } from './login.service';
import { AuthService } from '../../common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private toastr: ToastsManager, private router: Router, private fb: FormBuilder, private loginService: LoginService, private authService: AuthService) {}

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  private loggingIn: boolean = false;

  login() {
    this.loggingIn = true;

    const username: string = this.loginForm.value.username;
    const password: string = this.loginForm.value.password;

    const user = {
      'uname': username,
      'pass': password
    };

    this.loginService.Login(user)
      .then((response) => {
        console.log(response);
        this.authService.setToken(response.jwt);
        this.toastr.success('Login successful!', 'You\'re in!');
        this.router.navigate(['/home']);
      })
      .catch(e => { 
        this.toastr.error(`Error: ${e}`, 'Whoops!')
        this.loggingIn = false
      }
    );
  }
}
