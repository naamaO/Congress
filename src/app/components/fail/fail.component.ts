import { Component, OnInit, NgZone } from '@angular/core';
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
  private sub: any;
  public res: any;
  constructor(public route: ActivatedRoute,public router: Router, private serverService: ServerService, private http: HttpClient) {
   // Response=447&o_cred_type=1&lang=us&ccard=&expmonth=08&myid=111111111&email=nameEmail&cred_type=1&currency=2&ccno=1111&expyear=24&supplier=bytes2
   //&notify_url_address=http://localhost:4000/notify&sum=23&benid=4ncsvp43o7ei3j1i2g7sjh80e2&ConfirmationCode=0100000&cardtype=-&cardissuer=0&cardaquirer=1&index=7&Tempref=00002001 
//  console.log("this.route.params",this.route.params);
//    this.sub = this.route.params.subscribe(params => {
//   this.res = params['Response']; // (+) converts string 'id' to a number
//   console.log("this.res",this.res);
//   this.serverService.setNotify(this.res);
//    });
   console.log("fail page!!!!!!!!!");
  }
  ngOnInit() {
    console.log("fail page on init!!!!!!!!!")
  }

}
