import {Component, OnInit} from '@angular/core';
import {UploaderService} from "./uploader.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {environment} from "../../environments/environment";

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'page-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public uploaderForm = this.fb.group({
    file: ['', Validators.required],
  });

  public filePath: string = '';

<<<<<<< HEAD
  constructor(private toastr: ToastsManager, private _uploaderService: UploaderService, private fb: FormBuilder) {}
=======
  constructor(private _uploaderService: UploaderService, private fb: FormBuilder, private _toast: ToastsManager) {}
>>>>>>> 704462cd152c35e31935964da59b8efcbabe61e6

  ngOnInit(): void { }

  ChangeFile(event) {
    if (!environment.constants.acceptedImageTypes.filter(type => type === event.target.files[0].type).length) {
      this.filePath = '';
      this._uploaderService.files = null;
      this._toast.error('Incorrect image type');
      return;
    }
    this.filePath = event.target.value;
    this._uploaderService.files = event.target.files;
    console.log(event.target.files);
  }

  UploadFile() {
    this._uploaderService.UploadFile()
      .then(res => {
        this.toastr.success('Upload Succesful!', 'Success!');
      }).catch(err => {
        this.toastr.error('Upload Failed.', 'Error!');
      });
  }

}
