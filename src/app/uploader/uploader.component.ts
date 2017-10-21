import {Component, OnInit} from '@angular/core';
import {UploaderService} from "./uploader.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'page-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public uploaderForm = this.fb.group({
    file: ['', Validators.required],
  });

  public file: string = '';

  constructor(private _uploaderService: UploaderService, private fb: FormBuilder) {}

  ngOnInit(): void { }

  UploadFile(event) {
    this.file = event.target.value;
    this._uploaderService.UploadFile(event)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }

}
