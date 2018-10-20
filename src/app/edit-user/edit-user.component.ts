import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';
import { OrganizationService } from '../organization/organization.service';
import { IOrganization } from '../../interfaces/organizations.interface';
import { IUSerType } from '../../interfaces/usertype.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  public editUserForm: FormGroup;
  public editingUser: boolean = false;
  public user: any;
  public userId: string = '-1';
  public organizations: Array<IOrganization> = [];
  public userTypes: Array<IUSerType> = [];
  public activatedRouteSubscription: Subscription;
    
  constructor(private _fb: FormBuilder, 
    private _userService: UserService, 
    private _activatedRoute: ActivatedRoute, 
    private _toastr: ToastsManager,
    private _organizationService: OrganizationService) {
    this.editUserForm = this._fb.group({
      uname: ['', Validators.required],
      userTypeID: ['-1', Validators.required],
      organizationID: ['-1', Validators.required],
      securePasscode: ['', Validators.required],
      publicPasscode: ['', Validators.required],
      distressPasscode: ['', Validators.required],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this._activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.userId = params.id;
        this.getUserById(this.userId);
        this.getOrganizations();
        this.getUserTypes();
      } else {
        // TODO: error handling
      }
    });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubscription) this.activatedRouteSubscription.unsubscribe();
  }

  getOrganizations() {
    this._organizationService.getAllOrganizations().then(res => {
      if (res && res.success) {
        this.organizations = res.data;
      } else {
        // TODO: error handling
      }
    });
  }

  getUserTypes() {
    this._userService.getUserTypes().then(res => {
      if (res && res.success) {
        this.userTypes = res.data;
      } else {
        // TODO: error handling
      }
    });
  }

  getUserById(userId: string | number): void {
    this._userService.getUserByUserId(userId).then(res => {
      if (res && res.success) {
        this.user = res.data;
        this.setUserForm();
      } else {
        // TODO: error handling
      }
    });
  }

  setUserForm(): void {
    this.editUserForm.controls.uname.patchValue(this.user.uname);
    this.editUserForm.controls.userTypeID.patchValue(this.user.userTypeID);
    this.editUserForm.controls.organizationID.patchValue(this.user.organizationID);
    this.editUserForm.controls.securePasscode.patchValue(this.user.securePasscode);
    this.editUserForm.controls.publicPasscode.patchValue(this.user.publicPasscode);
    this.editUserForm.controls.distressPasscode.patchValue(this.user.distressPasscode);
    this.editUserForm.controls.password.patchValue(this.user.password);
  }

  editUser(): void {
    this.editingUser = true;
    this.user = this.editUserForm.value;
    this.user.id = +this.userId;
    this._userService.updateUser(this.user).then(res => {
      if (res && res.success) {
        this._toastr.success('Succesfully updated user');
      } else {
        // TODO: error handling
      }
      this.editingUser = false;
    });
  }
}
