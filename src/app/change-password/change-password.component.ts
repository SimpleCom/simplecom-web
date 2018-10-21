import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user/user.service';
import { IJWT } from '../../interfaces/jwt.interface';
import { AuthService } from '../../common/auth.service';
import { Subscription } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
    public changingPassword: boolean = false;
    public newPasswordForm: FormGroup;
    public user: IJWT;
    public authSubscription: Subscription;
    
  constructor(private fb: FormBuilder, private _userService: UserService, private _authService: AuthService, private _toastr: ToastsManager) {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required]
    });
    this.authSubscription = this._authService.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
  

  newPassword() {
    if (this.newPasswordForm.value.newPassword === this.newPasswordForm.value.reNewPassword) {
      this.changingPassword = true;
      this._userService.changeUserPassword(this.user.id, this.newPasswordForm.value.newPassword).then(res => {
        console.log(res);
      });
    } else {
      this._toastr.error('Passwords do not match');
    }
    
  }

}
