import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  constructor() {}


  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
  }

}
