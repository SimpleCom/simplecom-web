import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { HomeService } from './home.service';

import { IList } from '../../interfaces/list.interface';
import {AuthService} from "../../common/auth.service";
import {IJWT} from "../../interfaces/jwt.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public jwt: IJWT;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private route: ActivatedRoute, private homeService: HomeService, private _auth: AuthService) {
    this._auth.user.subscribe((user: IJWT) => {
      this.jwt = user;
    });
  }

  private lists: IList;

  ngOnInit() {
    this.homeService.GetAllLists()
      .then((response) => this.lists = response);
  }

  viewListDetails(list) {
    this.router.navigate(['/update/', list.id]);
  }

  deleteList(list) {
    this.homeService.DeleteList(list.id)
      .then((response) => {
        console.log(response);
        this.homeService.GetAllLists()
          .then((response) => this.lists = response);
      });
  }
}
