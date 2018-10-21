import { Component, OnInit } from '@angular/core';
import { OrganizationService } from './organization.service';
import { IOrganization } from '../../interfaces/organizations.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  public loading: boolean = false;
  public dropdownDisplay: boolean = false;
  public addingOrg: boolean = false;
  public editingOrg: number = -1;
  public organizations: Array<IOrganization> = [];
  public organizationForm: FormGroup;

  constructor(private _organizationService: OrganizationService, private _fb: FormBuilder, private _toastr: ToastsManager) {
    this.organizationForm = this._fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loading = true;
    this.getAllOrganizations();
  }

  getAllOrganizations() {
    this._organizationService.getAllOrganizations().then(res => {
      if (res && res.success) {
        this.organizations = res.data;
      } else {
        this._toastr.error('Unable to get all organizations.')
      }
      this.loading = false;
    });
  }

  toggleDropdown() {
    this.dropdownDisplay = !this.dropdownDisplay;
  }
  
  saveNewOrganization(): void {
    this.addingOrg = true;

    this._organizationService.addNewOrganization(this.organizationForm.value.name)
      .then(() => {
        this.addingOrg = false;
        this.organizationForm.controls.name.patchValue('');
        this._toastr.success('List successfully created!', 'List created');
        this.getAllOrganizations();
      });
  }

  editOrganization(organization: IOrganization) {
    this.editingOrg = organization.id;
  }


  saveEditedOrganization(organization: IOrganization) {
    this._organizationService.updateOrganization(organization)
      .then(() => this._toastr.success('List successfully edited!', 'List updated'))
      .then(non => this.editingOrg = -1
    );
  }

  deleteOrganization(organization: IOrganization) {
    this._organizationService.deleteOrganization(organization)
      .then((res) => {
        if (res && res.success) {
          this._toastr.success('List successfully deleted!', 'It\'s gone');
          this.getAllOrganizations();
        } else {
          this._toastr.error('Unable to delete list.')
        }
       
      });
  }
}
