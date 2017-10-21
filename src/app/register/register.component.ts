import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService) {}

  public registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // code: ['', Validators.required],
  });

  private registering: boolean = false;
  private errorMesssage: string = '';

  register() {
    this.registering = true;

    const username: string = this.registerForm.value.username;
    const password: string = this.registerForm.value.password;

    const user = {
      "uname": username,
      "pass": password
    };

    this.registerService.Register(user)
      .then((response) => {
        if (!response[0].error) {
          this.router.navigate['/login'];
        } else {
          this.errorMesssage = 'An error occured';
        }

        this.registering = false;
      }
    );
  }
}
