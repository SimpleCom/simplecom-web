import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AddListService} from "./add-list.service";

@Component({
  selector: 'app-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {

  public listForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private _listService: AddListService) {}

  saveNewList(): void {
    console.log(this.listForm.value.name);
    this._listService.AddNewList(this.listForm.value.name)
      .then(res => {
        console.log(res);
        this.listForm.controls.name.patchValue('');
      }).catch(err => {
        console.log(err);
        this.listForm.controls.name.patchValue('');
    });

  }
}
