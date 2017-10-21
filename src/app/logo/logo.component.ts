import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  public logoForm = this.fb.group({
    file: ['', Validators.required],
  });

  private file: string = '';

  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
  }

  logoChanged(e) {
    this.file = e.srcElement.value;
  }
}
