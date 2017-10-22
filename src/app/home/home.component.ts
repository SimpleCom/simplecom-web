import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
  public jwt: IJWT;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private fb: FormBuilder, private router: Router, private homeService: HomeService, private _auth: AuthService) {
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
  

  ngOnInit() {
    this.homeService.GetAllLists()
      .then((response) => this.lists = response);
  }

  toggleDropdown(){
    this.dropdownDisplay = !this.dropdownDisplay;
  }

  saveNewList(): void {
    this.addingList = true;

    this.homeService.AddNewList(this.listForm.value.name)
      .then(response => {
        this.addingList = false;
        this.listForm.controls.name.patchValue('');
        this.toastr.success('List successfully created!', 'Success!')
      }).catch(e => {
        console.log(e);
      });
  }

  viewListDetails(list) {
    this.router.navigate(['/update/', list.id]);
  }

  deleteList(list) {
    this.homeService.DeleteList(list.id)
      .then((response) => {
        console.log(response);
        this.homeService.GetAllLists()
          .then((response) => this.lists = response);
      });
  }
}
