import { Component, OnInit, Input } from '@angular/core';
import {LogoService} from "./logo.service";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  constructor(private _logo: LogoService) {}


  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
    // TODO: need to figure out a way of getting current logo for user -jt
    // this._logo.GetLogoByUser().then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  }

}
