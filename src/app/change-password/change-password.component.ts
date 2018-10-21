import { Component, OnDestroy } from '@angular/core';
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
export class ChangePasswordComponent implements OnDestroy {
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

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }
  
  newPassword() {
    if (this.newPasswordForm.value.newPassword === this.newPasswordForm.value.reNewPassword) {
      this.changingPassword = true;
      this._userService.changeUserPassword(this.user.id, this.newPasswordForm.value.newPassword).then(res => {
        if (res && res.success) {
          this.changingPassword = false;
          this._toastr.success('Password succesfully changed');
          this.newPasswordForm.controls.newPassword.patchValue('');
          this.newPasswordForm.controls.reNewPassword.patchValue('');
        } else {
          // this._toastr.error(res.error);
        }
      }).catch(err => this.changingPassword = false);
    } else {
      this._toastr.error('Passwords do not match');
    }
    
  }

}
