import { Component, OnInit } from '@angular/core';
//import { MatButtonModule, MatCheckboxModule, MatSelect } from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor() { }
  public show: boolean;
  public show1: boolean;
  public expandedShow: boolean;
  public showGround: boolean;
  public showRegistered: boolean;
  ngOnInit() {
  }
  borrower(brower: string) {

    if (brower == 'שמות הלווים') {
      this.show = true;
    }
    else
      if (brower == 'שם הלווה') {
      this.show = false;
    }

  }

  change_area(area: string) {
    if (area == 'אחר') {
      this.show1 = true;}
      else
      this.show1 = false;
    
  }
  expanded() {
    this.expandedShow = !this.expandedShow;
  }
  Ground() {
    this.showGround = !this.showGround;
  }
  Registered() {
    this.showRegistered = !this.showRegistered;
  }
}
