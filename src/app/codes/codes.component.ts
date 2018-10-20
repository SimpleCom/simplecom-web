import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CodesService } from './codes.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css'],
  providers: [ CodesService ]
})

export class CodesComponent implements OnInit {
  constructor(private fb: FormBuilder, private toastr: ToastsManager, private route: ActivatedRoute, private codesService: CodesService) {}
  private dropdownDisplay: boolean = false;
  private loading: boolean = false;
  private settingCodes: boolean = false;
  private secureKeyValue: string = "";
  private fakeKeyValue: string = "";
  private inputSelected: number;

  ngOnInit() {
    this.loading = true;
    this.codesService.getAllCodes()
      .then((response) => {
        if (response.publicPasscode !== null){
          this.fakeKeyValue = response.publicPasscode;
        }
        if (response.securePasscode !== null){
          this.secureKeyValue = response.securePasscode;
        }
        
        this.loading = false;
      })

  }

  setKeyCodeInput(whichInput) {
    this.inputSelected = whichInput;
  }

  showDropdown(){
    this.dropdownDisplay = !this.dropdownDisplay;
  }

  randomizeKeys(){
    this.secureKeyValue = this.generateKey();
    this.fakeKeyValue = this.generateKey();
  }

  setKeyCode(key) {
    if (this.inputSelected === 0 && this.secureKeyValue.length < 6 && key !== -1) {
      this.secureKeyValue += key;
    }

    if (this.inputSelected === 0 && key === -1) {
      this.secureKeyValue = this.secureKeyValue.slice(0, this.secureKeyValue.length -1);
    }

    if (this.inputSelected === 1 && this.fakeKeyValue.length < 6 && key !== -1) {
      this.fakeKeyValue += key;
    }

    if (this.inputSelected === 1 && key === -1) {
      this.fakeKeyValue = this.fakeKeyValue.slice(0, this.fakeKeyValue.length -1);
    }
  }

  clearCodes() {
    this.fakeKeyValue = '';
    this.secureKeyValue = '';
  }

  generateKey(){
    const dictionary = "0123456789ABCDEF";
    let key = "";

    for (let i = 0; i < 6; i++){
      key += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return key;
  }

  showKeyCodeBorder(e) {
    console.log(e.key);
  }

  setCodes(){
    if(this.secureKeyValue.length < 6 || this.fakeKeyValue.length < 6){
      this.toastr.error('Invalid key. Secure key and fake key must be 6 characters.');
      return;
    }
    if (!this.secureKeyValue.match(/[a-z]/i) || !this.fakeKeyValue.match(/[a-z]/i)) {
      this.toastr.error('Keys require numbers and letters.');
      return;
  }
    this.settingCodes = true;
    const codes = {
      "securePasscode": this.secureKeyValue,
      "publicPasscode": this.fakeKeyValue
    };

    this.codesService.AddNewCodes(codes)
      .then(() => this.toastr.success('Codes successfully set!', 'Codes set'))
      .catch(e => this.toastr.success(`Error: ${e}`, 'Whoops!')
    );

    this.settingCodes = false;

  }
}
