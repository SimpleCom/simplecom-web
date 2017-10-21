import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private dropdownDisplay: boolean = false;

  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
  }

  showDropdown(){
    this.dropdownDisplay =! this.dropdownDisplay;
  }
}
