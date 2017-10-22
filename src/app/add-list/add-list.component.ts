import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AddListService } from "./add-list.service";
import { AuthService } from '../../common/auth.service';

import * as jwt from 'jwt-decode';

@Component({
  selector: 'app-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  constructor(private toastr: ToastsManager, private fb: FormBuilder, private _listService: AddListService, private authService: AuthService) {}

  public listForm = this.fb.group({
    name: ['', Validators.required],
  });

  public addingList: boolean = false;

  ngOnInit() {
  }

  saveNewList(): void {
    this.addingList = true;

    this._listService.AddNewList(this.listForm.value.name)
      .then(response => {
        this.addingList = false;
        this.listForm.controls.name.patchValue('');
        this.toastr.success('List successfully created!', 'Success!')
      }).catch(e => {
        console.log(e);
      });
  }
}
