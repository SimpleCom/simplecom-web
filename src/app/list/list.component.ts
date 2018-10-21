import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import { ListService } from './list.service';
import { AuthService } from '../../common/auth.service';

import { IList } from '../../interfaces/list.interface';
import { IJWT } from '../../interfaces/jwt.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  public userSubscription: Subscription;
  public listForm: FormGroup;

  public dropdownDisplay: boolean = false;
  public lists: IList;
  public addingList: boolean = false;
  public jwt: IJWT;
  public editingList: number = -1;
  public loading = false;

  constructor(public toastr: ToastsManager, private fb: FormBuilder, private router: Router, private listService: ListService, private _auth: AuthService) {
    this.userSubscription = this._auth.user.subscribe((user: IJWT) => {
      this.jwt = user;
    });
    this.listForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllLists();
  }

  getAllLists() {
    this.loading = true;
    this.listService.GetAllLists().then(res => {
      if (res && res.success) {
        this.lists = res.data;
      } else {
        this.toastr.error('Unable to get lists.')
      }
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  toggleDropdown() {
    this.dropdownDisplay = !this.dropdownDisplay;
  }

  saveNewList(): void {
    this.addingList = true;

    this.listService.AddNewList(this.listForm.value.name)
      .then(() => {
        this.addingList = false;
        this.listForm.controls.name.patchValue('');
        this.toastr.success('List successfully created!', 'List created');
        this.getAllLists();
      });
  }

  viewListDetails(list) {
    this.router.navigate(['/list/', list.id]);
  }

  deleteList(list) {
    this.listService.DeleteList(list.id)
      .then(() => {
        this.toastr.success('List successfully deleted!', 'It\'s gone');
        this.getAllLists();
      });
  }

  editList(list: IList) {
    this.editingList = list.id;
  }

  saveEditedList(list: IList) {
    this.listService.EditListName(list)
      .then(() => this.toastr.success('List successfully edited!', 'List updated'))
      .then(non => this.editingList = -1
    );
  }
}
