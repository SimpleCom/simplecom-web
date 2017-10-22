import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { UpdateListService } from "./update-list.service";
import { AuthService } from '../../common/auth.service';

import * as jwt from 'jwt-decode';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css'],
  providers: [ UpdateListService ]
})
export class UpdateListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private _listService: UpdateListService, private authService: AuthService) {}

  public listForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  // public addingList: boolean = false;

  ngOnInit() {
    this._listService.GetListDetails(this.route.snapshot.params['id'])
     .then(response => {
        console.log(response);
      }).catch(e => {
        console.log(e);
      });

    this._listService.GetListContacts(this.route.snapshot.params['id'])
     .then(response => {
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
  }

  saveNewContact() {
    const contact = {
      "name": this.listForm.value.name,
      "email": this.listForm.value.email
    };

    this._listService.AddListContact(this.route.snapshot.params['id'], contact)
      .then(response => {
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
  }

  // saveNewList(): void {
  //   this.addingList = true;

  //   this._listService.AddNewList(this.listForm.value.name)
  //     .then(response => {
  //       this.addingList = false;
  //       this.listForm.controls.name.patchValue('');
  //     }).catch(e => {
  //       console.log(e);
  //     });
  // }
}
