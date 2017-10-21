import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodesService } from './codes.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css'],
  providers: [ CodesService ]
})

export class CodesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private codesService: CodesService) {}
  private dropdownDisplay: boolean = false;
  private secureKeyValue: string = "Enter Secure Key";
  private fakeKeyValue: string = "Enter Fake Key";

  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
  }

  showDropdown(){
    this.dropdownDisplay = !this.dropdownDisplay;
  }

  randomizeKeys(){
    this.secureKeyValue = this.generateKey();
    this.fakeKeyValue = this.generateKey();
  }

  generateKey(){
    const dictionary = "0123456789ABCDEF"; //list of possible values
    let key = "";

    //generate key
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
  }

  deleteCodes(){  
    this.codesService.DeleteCodes();
  }
}
