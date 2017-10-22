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

  private contacts: any = [];
  private listDetails: any = [];

  ngOnInit() {
    this._listService.GetListDetails(this.route.snapshot.params['id'])
     .then(response => {
        console.log(response);
        this.listDetails = response;
      }).catch(e => {
      });

    this._listService.GetListContacts(this.route.snapshot.params['id'])
     .then(response => {
       this.contacts = response.contacts;
        console.log(response);
      }).catch(e => {
      });
  }

  saveNewContact() {
    const contact = {
      "name": this.listForm.value.name,
      "email": this.listForm.value.email
    };

    this._listService.AddListContact(this.route.snapshot.params['id'], contact)
      .then(response => {
         this._listService.GetListContacts(this.route.snapshot.params['id'])
         .then(response => {
           this.contacts = response.contacts;
          }).catch(e => {
          });
      }).catch(e => {
      });
  }

  deleteContact(contactID) {
    this._listService.DeleteContact(this.route.snapshot.params['id'], contactID)
      .then(response => {
        this._listService.GetListContacts(this.route.snapshot.params['id'])
         .then(response => {
           this.contacts = response.contacts;
          }).catch(e => {
          });
      }).catch(e => {
      });
  }
}
