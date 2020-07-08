import { Component, OnInit,NgZone, ViewChild, ElementRef } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shoppingCart } from '../../../classes/shoppingCart';
import { ChangeDetectorRef } from '@angular/core';
import { __await } from 'tslib';
import { CookieService } from 'angular2-cookie';
@Component({
  selector: 'app-shoping-cart-hebrew',
  templateUrl: './shoping-cart-hebrew.component.html',
  styleUrls: ['./shoping-cart-hebrew.component.css']
})
export class ShopingCartHebrewComponent implements OnInit {
  @ViewChild('namee') namee: ElementRef;
  @ViewChild('usernameemail') usernameemail: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('country') country: ElementRef;
  
  public DB: shoppingCart[];
  public Total: number;
  public num: number;
  public Address: string;
  public Country: string[] = ['Israel', 'USA', 'Germany', 'Switzerland'];
  public selectedCountry: string;
  public UserNameLogin: string;
  public FirstName: string;
  public LastName: string;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;

  constructor(public cookieService: CookieService,private ngZone: NgZone, private cd: ChangeDetectorRef,public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.getAllDBShoppingCart().subscribe((val) => {
    this.DB = val;
      for (var i = 0; i < this.DB.length; i++) {
        if (this.DB[i].SallePrice == 0)
          this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
        else
          this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;

      }
    });
    this.serverService.getTotalPrice().subscribe(val => this.Total = val);
    this.serverService.getNumProduct().subscribe(val => this.num = val);

    //this.serverService.getAllDBShoppingCart().subscribe((events) => {
    //  this.DB = events;
    //  alert(this.DB.length);
    //  alert(this.DB[0].NameBook)
    //  alert(this.DB[1].NameBook)
    //});
  }
  changePlaying() {
    __await(1000);
    this.ngZone.run(() => {
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DB = val;
        for (var i = 0; i < this.DB.length; i++) {
          if (this.DB[i].SallePrice == 0)
            this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
          else
            this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;

        }
      });
      this.serverService.getTotalPrice().subscribe(val => this.Total = val);
    });
    this.serverService.getNumProduct().subscribe(val => this.num = val);

  }

  deleteQuantity(item: shoppingCart) {
    this.serverService.postdeleteQuantity(item);//.subscribe((events) => {
    // this.router.navigateByUrl("/ShoppingCart");
    //location.reload()
    this.changePlaying();
    this.changePlaying();
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  ngOnInit() {
    this.UserNameLogin = (this.getCookie('UserName'));
    if(this.UserNameLogin||this.UserNameLogin!=''){
      this.serverService.getUserDetails().subscribe((events) => {
        this.FirstName = events.FirstNameEnglish;
        this.LastName = events.LastNameEnglish;  
        this.FirstNameHebrew = events.FirstNameHebrew;
        this.LastNameHebrew = events.LastNameHebrew; 
        this.selectedCountry = events.selectedCountry;
   console.log("user buyer:",this.FirstName, this.LastName,this.FirstNameHebrew, this.LastNameHebrew,this.selectedCountry)
       
      });
    }
    else{
      this.FirstName = "";
        this.LastName = "";  
        this.FirstNameHebrew = "";
        this.LastNameHebrew = ""; 
        this.selectedCountry = "";
    }

  }

  NavigCart() {
    this.router.navigateByUrl("/ShoppingCart");
  }
  
  AddQuantity(item: shoppingCart) {
    //alert(item.NameBook + "uu");

    //
    this.serverService.postAddQuantity(item)//.subscribe((events) => {
    //
    //this.router.navigateByUrl("/ShoppingCart");
    this.changePlaying();
    this.changePlaying(); 
    //  alert(item.NameBook + "uu");
    //});

  }
  RemoveQuantity(item: shoppingCart) {
    this.serverService.postRemoveQuantity(item)//.subscribe((events) => {
    // this.router.navigateByUrl("/ShoppingCart");
    //location.reload()
    this.changePlaying();
    this.changePlaying();
  }
  SendToTranzila() {
    this.router.navigate(['Pay', this.Total]);
  }
  SendToNew() {
    this.router.navigateByUrl("/newHebrew");

  }

  
 focusnamee() {
  this.namee.nativeElement.style.color = "#27b5e5";
}
unfocusnamee() {
  this.namee.nativeElement.style.color = "gray";
}
focuscountry() {
  this.namee.nativeElement.style.color = "#27b5e5";
}
unfocuscountry() {
  this.namee.nativeElement.style.color = "gray";
} 
focusaddress() {
  this.namee.nativeElement.style.color = "#27b5e5";
}
unfocusaddress() {
  this.namee.nativeElement.style.color = "gray";
}
 focususernameemail() {
  this.namee.nativeElement.style.color = "#27b5e5";
}
unfocususernameemail() {
  this.namee.nativeElement.style.color = "gray";
}
}
