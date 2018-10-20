import { Component, OnInit, Input } from '@angular/core';
import { UploaderService } from './uploader.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { environment } from '../../environments/environment';
import { IOrganization } from '../../interfaces/organizations.interface';

@Component({
  selector: 'page-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  @Input('organization') organization: IOrganization;

  public uploaderForm = this.fb.group({
    file: ['', Validators.required],
  });

  public filePath: string = '';

  constructor(private _uploaderService: UploaderService, private fb: FormBuilder, private _toast: ToastsManager) {}

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
    // console.log(event.target.files);
  }

  UploadFile() {
    // TODO: add user
    this._uploaderService.UploadFile(1)
      .then(res => {
        this._toast.success('Upload Succesful!', 'Success!');
        this.filePath = '';
        this._uploaderService.files = null;
      }).catch(err => {
        console.log(err);
        // this._toast.error('Upload Failed.', 'Error!');
      });
  }

}
