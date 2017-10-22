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
  private secureKeyValue: string = "";
  private fakeKeyValue: string = "";
  private inputSelected: number;

  ngOnInit() {
    
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
    if (this.inputSelected === 0) {
      if (this.secureKeyValue.length <= 6) {
        this.secureKeyValue += key;
      }
    }

    if (this.inputSelected === 1) {
      if (this.fakeKeyValue.length <= 6) {
        this.fakeKeyValue += key;
      }
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

  setCodes(){
    const codes = {
      "secure": this.secureKeyValue,
      "public": this.fakeKeyValue
    };
    
    this.codesService.AddNewCodes(codes)
      .then((response) =>{

        if (response) {
          this.toastr.success('Codes Set!', 'Success!');
        }

        else{
          this.toastr.error('Codes were not set.', 'Error!');
        }
      }
  
    );

  }
}
