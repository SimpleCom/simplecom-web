import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';

import { CodesService } from './codes.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css'],
  providers: [ CodesService ]
})

export class CodesComponent implements OnInit {
  constructor(private fb: FormBuilder, private toastr: ToastsManager, private route: ActivatedRoute, private codesService: CodesService) {}
  public dropdownDisplay: boolean = false;
  public loading: boolean = false;
  public settingCodes: boolean = false;
  public secureKeyValue: string = '';
  public fakeKeyValue: string = '';
  public distressKeyValue: string = '';
  public inputSelected: number;

  ngOnInit() {
    this.loading = true;
    this.codesService.getAllCodes().then(res => {
      if (res && res.success) {
        if (res.data.publicPasscode !== null) {
          this.fakeKeyValue = res.data.publicPasscode;
        }
        if (res.data.securePasscode !== null) {
          this.secureKeyValue = res.data.securePasscode;
        }
        if (res.data.distressPasscode !== null) {
          this.distressKeyValue = res.data.distressPasscode;
        }
      } else {
        this.toastr.error('Unable to get codes.')
      }
      this.loading = false;
    });
  }

  setKeyCodeInput(whichInput) {
    this.inputSelected = whichInput;
  }

  showDropdown() {
    this.dropdownDisplay = !this.dropdownDisplay;
  }

  randomizeKeys() {
    this.secureKeyValue = this.generateKey();
    this.fakeKeyValue = this.generateKey();
    this.distressKeyValue = this.generateKey();
  }

  setKeyCode(key) {
    if (this.inputSelected === 0 && this.secureKeyValue.length < 6 && key !== -1) {
      this.secureKeyValue += key;
    }

    if (this.inputSelected === 0 && key === -1) {
      this.secureKeyValue = this.secureKeyValue.slice(0, this.secureKeyValue.length - 1);
    }

    if (this.inputSelected === 1 && this.fakeKeyValue.length < 6 && key !== -1) {
      this.fakeKeyValue += key;
    }

    if (this.inputSelected === 1 && key === -1) {
      this.fakeKeyValue = this.fakeKeyValue.slice(0, this.fakeKeyValue.length - 1);
    }

    if (this.inputSelected === 2 && this.distressKeyValue.length < 6 && key !== -1) {
      this.distressKeyValue += key;
    }

    if (this.inputSelected === 2 && key === -1) {
      this.distressKeyValue = this.distressKeyValue.slice(0, this.distressKeyValue.length - 1);
    }
  }

  clearCodes() {
    this.fakeKeyValue = '';
    this.secureKeyValue = '';
    this.distressKeyValue = '';
  }

  generateKey() {
    const dictionary = '0123456789ABCDEF';
    let key = '';

    for (let i = 0; i < 6; i++){
      key += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return key;
  }

  showKeyCodeBorder(e) {
    console.log(e.key);
  }

  hasDuplicates(array){
    return array.some((elm, idx) => {
        return array.lastIndexOf(elm) > idx;
    });

  }

  setCodes() {
    if (this.secureKeyValue.length < 6 || this.fakeKeyValue.length < 6 || this.distressKeyValue.length < 6) {
      this.toastr.error('Invalid key. Secure key and fake key must be 6 characters.');
      return;
    }
    if (!this.secureKeyValue.match(/[a-z]/i) || !this.fakeKeyValue.match(/[a-z]/i) || !this.distressKeyValue.match(/[a-z]/i)) {
      this.toastr.error('Keys require numbers and letters.');
      return;
    }
    if (this.hasDuplicates([this.secureKeyValue, this.fakeKeyValue, this.distressKeyValue])) {
      this.toastr.error('All keys must be unique.');
      return;
    }
    this.settingCodes = true;
    const codes = {
      'securePasscode': this.secureKeyValue,
      'publicPasscode': this.fakeKeyValue,
      'distressPasscode': this.distressKeyValue,
    };

    this.codesService.AddNewCodes(codes)
      .then(() => this.toastr.success('Codes successfully set!', 'Codes set'))
    

    this.settingCodes = false;

  }
}
