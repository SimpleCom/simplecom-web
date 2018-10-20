import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
    public changingPassword: boolean = false;
    public newPasswordForm: FormGroup;
    
  constructor(private fb: FormBuilder) {
    this.newPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required]
    });
  }
  

  newPassword(){
      this.changingPassword=true;
      console.log('hello')
  }

}
