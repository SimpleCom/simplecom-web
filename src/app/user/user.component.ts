import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<any> = [];
  
  constructor(private _userService: UserService, private _toast: ToastsManager, private _router: Router) {}
  
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getAllUsers().then(res => {
      if (res && res.success) {
        this.users = res.data;
      } else {
        this._toast.error('Unable to get all users.')
      }
    });
  }

  editUser(user) {
    this._router.navigate(['/users/' + user.id]);
  }

  deactivateUser(user) {
    this._userService.deactiavetUser(user).then(res => {
      if (res && res.success) {
        this.getAllUsers();
      } else {
        this._toast.error('Unable to deactivate user.')      }
    });
  }

  reactivateUser(user) {
    this._userService.reactivateUser(user).then(res => {
      if (res && res.success) {
        this.getAllUsers();
      } else {
        this._toast.error('Unable to reactivate user.')
      }
    });
  }
  
  addUser() {
    this._router.navigate(['/register']);
  }
}
