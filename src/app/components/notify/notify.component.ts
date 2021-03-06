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
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class notifyComponent implements OnInit {
  public sub: any;
  public response: any;
  public user: string; 
  public sum: string;
  public currency: string;

  constructor(public route: ActivatedRoute,public router: Router, private serverService: ServerService, private http: HttpClient) {
   // Response=447&o_cred_type=1&lang=us&ccard=&expmonth=08&myid=111111111&email=nameEmail&cred_type=1&currency=2&ccno=1111&expyear=24&supplier=bytes2
   //&notify_url_address=http://localhost:4000/notify&sum=23&benid=4ncsvp43o7ei3j1i2g7sjh80e2&ConfirmationCode=0100000&cardtype=-&cardissuer=0&cardaquirer=1&index=7&Tempref=00002001 
//  console.log("this.route.params",this.route.params);
  //  this.sub = this.route.params.subscribe(params => {
  // this.response = params['response'], 
  // this.user = params['userName'], 
  // this.sum = params['sum'], 
  // this.currency = params['currency']
  //  });

  }
  ngOnInit() {
   // console.log("notify page!!")
  }

}
