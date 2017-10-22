import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { HomeService } from './home.service';
import { AuthService } from "../../common/auth.service";

import { IList } from '../../interfaces/list.interface';
import { IJWT } from "../../interfaces/jwt.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(public toastr: ToastsManager, private fb: FormBuilder, private router: Router, private homeService: HomeService, private _auth: AuthService) {
    this._auth.user.subscribe((user: IJWT) => {
      this.jwt = user;
    });
  }

  public listForm = this.fb.group({
    name: ['', Validators.required],
  });

  private dropdownDisplay: boolean = false;
  private lists: IList;
  public addingList: boolean = false;
  public jwt: IJWT;
  public editingList: number = -1;

  ngOnInit() {
    this.homeService.GetAllLists().then((response) => this.lists = response);
  }

  toggleDropdown(){
    this.dropdownDisplay = !this.dropdownDisplay;
  }

  saveNewList(): void {
    this.addingList = true;

    this.homeService.AddNewList(this.listForm.value.name)
      .then(() => {
        this.addingList = false;
        this.listForm.controls.name.patchValue('');
        this.toastr.success('List successfully created!', 'List created');
        this.homeService.GetAllLists().then((response) => this.lists = response);
      }).catch(e => this.toastr.error(`Error ${e}`, 'Whoops!'));
  }

  viewListDetails(list) {
    this.router.navigate(['/update/', list.id]);
  }

  deleteList(list) {
    this.homeService.DeleteList(list.id)
      .then(() => {
        this.toastr.success('List successfully deleted!', 'It\'s gone');
        this.homeService.GetAllLists().then((response) => this.lists = response);
      }).catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!'));
  }

  editList(list: IList) {
    this.editingList = list.id;
  }

  saveEditedList(list: IList) {
    this.homeService.EditListName(list)
      .then(() => this.toastr.success('List successfully edited!', 'List updated'))
      .catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!'))
      .then(non => this.editingList = -1
    );
  }
}
