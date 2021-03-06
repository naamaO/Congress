import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.css']
})
export class failComponent implements OnInit {
  @ViewChild('Top') Top: ElementRef;

  public sub: any;
  public response: any;
  public user: string; 
  constructor(public route: ActivatedRoute,public router: Router, private serverService: ServerService, private http: HttpClient) {
    console.log("fail page on init!")

    this.sub = this.route.params.subscribe(params => {
      this.response = params['response'], 
      this.user = params['userName']
       });
  }
  ngOnInit() {
    document.getElementById("Top").scrollIntoView();

    console.log("fail page on init!")
  }

}
