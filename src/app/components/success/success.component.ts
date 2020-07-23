import { Component, OnInit, NgZone } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { shoppingCart } from 'src/classes/shoppingCart';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class successComponent implements OnInit {
  public sub: any;
  public response: any;
  public user: string; 
  public DB: shoppingCart[];
  constructor(public route: ActivatedRoute,public router: Router, private serverService: ServerService, private http: HttpClient,public cookieService: CookieService) {
   // Response=447&o_cred_type=1&lang=us&ccard=&expmonth=08&myid=111111111&email=nameEmail&cred_type=1&currency=2&ccno=1111&expyear=24&supplier=bytes2
   //&notify_url_address=http://localhost:4000/notify&sum=23&benid=4ncsvp43o7ei3j1i2g7sjh80e2&ConfirmationCode=0100000&cardtype=-&cardissuer=0&cardaquirer=1&index=7&Tempref=00002001 
   //this.sub = this.route.params;
   //  this.sub = this.route.params.subscribe(params => {
  //   this.response = params['response'], 
  //   this.user = params['userName']
  //    });
  this.user = this.serverService.email;
  this.setCookie(this.user);

 if(this.getCookie('UserName')){
  this.addToCart();
 }

  }
  ngOnInit() {
    console.log("success page on init! this.user",this.user)
  }
  setCookie(UaerName: string) {
    this.cookieService.put('UserName', UaerName);
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  addToCart(){
     // if(this.serverService.resNotifyTranzila==000){}
     if(this.getCookie('UserName')) {     
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DB = val;
     for (var i = 0; i < this.DB.length; i++) {
      this.DB[i].UserName = this.user;
      console.log( this.DB[i])
      let itemToDelete  =  this.DB[i];
      this.serverService.AddItemToCart(this.DB[i]).subscribe((res) => {
        if(res==1){
          console.log("this.DB[i]",itemToDelete)
          this.serverService.postRemoveQuantity(itemToDelete);
        }
        console.log(res)
      });

    }
  });
  }
  }
}
