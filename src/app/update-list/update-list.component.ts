import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import { UpdateListService } from "./update-list.service";
import { AuthService } from '../../common/auth.service';

import { IContact } from "../../interfaces/contacts.interface";

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css'],
  providers: [ UpdateListService ]
})
export class UpdateListComponent implements OnInit {
  constructor(public toastr: ToastsManager, private route: ActivatedRoute, private fb: FormBuilder, private _listService: UpdateListService, private authService: AuthService) {}

  public listForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  private contacts: any = [];
  private listDetails: any = [];
  public editingContact: number = -1;

  ngOnInit() {
    this._listService.GetListDetails(this.route.snapshot.params['id'])
     .then(response => this.listDetails = response)
     .catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!'));

    this._listService.GetListContacts(this.route.snapshot.params['id'])
     .then(response => this.contacts = response.contacts)
     .catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!')
    );
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
          this.listForm.controls.name.patchValue('');
          this.listForm.controls.email.patchValue('');
          }).catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!')
        );
      }).catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!')
    );
  }

  deleteContact(contactID) {
    this._listService.DeleteContact(this.route.snapshot.params['id'], contactID)
      .then(response => {
        this._listService.GetListContacts(this.route.snapshot.params['id'])
         .then(response => this.contacts = response.contacts)
         .catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!')
        );
      }).catch(e => this.toastr.error(`Error: ${e}`, 'Whoops!')
    );
  }

  editContact(contact: IContact) {
    this.editingContact = contact.id;
  }

  saveContact(contact: IContact) {
    this._listService.EditContact(this.route.snapshot.params['id'], contact)
      .then(() => this.toastr.success('Contact successfully edited!', 'Contact edited'))
      .catch(e => this.toastr.success(`Error: ${e}`, 'Whoops!'))
      .then(non => this.editingContact = -1
    );
  }
}
