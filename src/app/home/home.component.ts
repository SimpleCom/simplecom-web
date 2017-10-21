import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeService } from './home.service';

import { IList } from '../../interfaces/list.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private homeService: HomeService) {}

  private lists: IList;

  ngOnInit() {
    this.homeService.GetAllLists()
      .then((response) => this.lists = response);
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
