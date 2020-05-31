import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(public router: Router) { }
 
  ngOnInit() {
  }

  ClickSend() {
    this.router.navigateByUrl("/page");

  }
}
