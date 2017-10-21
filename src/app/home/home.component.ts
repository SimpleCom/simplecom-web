import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private lists: any = [
    {
      "id": 1,
      "name": "My First Group",
      "people": [
        {
          "id": 1,
          "name": "Person 1"
        },
        {
          "id": 2,
          "name": "Person 2"
        },
        {
          "id": 3,
          "name": "Person 3"
        },
        {
          "id": 4,
          "name": "Person 4"
        }
      ]
    },
    {
      "id": 2,
      "name": "My Second Group",
      "people": [
        {
          "id": 5,
          "name": "Person 5"
        },
        {
          "id": 6,
          "name": "Person 6"
        },
        {
          "id": 7,
          "name": "Person 7"
        },
        {
          "id": 8,
          "name": "Person 8"
        }
      ]
    }
  ];

  ngOnInit() {
    console.log(this.lists);
  }

  something(index) {
    console.log(index);
  }
}
