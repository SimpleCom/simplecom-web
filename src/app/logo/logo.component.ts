import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
  }
}
