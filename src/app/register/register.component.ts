import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private toastr: ToastsManager, private router: Router, private fb: FormBuilder, private registerService: RegisterService) {}

  private ErrorMessage: string = "";

  public registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
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
          this.toastr.success('Registration Successful!', 'Success!');
          this.router.navigate(['/login']);
        }

        this.registering = false;
      }).catch(e => {
        console.log(e);
      });
  }

  inspectForms(){
    if ((this.registerForm.value.password !== this.registerForm.value.repassword) && this.registerForm.value.password && this.registerForm.value.repassword) {
      this.ErrorMessage = "Passwords do not match";
    }
    else{
      this.ErrorMessage = "";
    }
  }
}
