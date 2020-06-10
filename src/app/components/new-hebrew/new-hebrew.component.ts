import { Component, OnInit, NgZone } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { ChangeDetectorRef } from '@angular/core';
import { __await } from 'tslib';
import { shoppingCart } from 'src/classes/shoppingCart';

@Component({
  selector: 'app-new-hebrew',
  templateUrl: './new-hebrew.component.html',
  styleUrls: ['./new-hebrew.component.css']
})
export class NewHebrewComponent implements OnInit {
  public UserNameLogin: string;
  public ShowBlue1: boolean = true;
  public ShowBlue2: boolean = false;
  public ShowBlue3: boolean = false;
  public first_name: string[] = ['Hadas', 'Shira', 'Efrat'];
  public last_name: string[] = ['ww', 'ww', 'ww'];
  public tel: string[] = ['22', '22', '22',];
  public show: boolean;
  public showText: boolean;
  public text: string = '';
  public t: string;
  public data: string;
  public DB: book[];
  public cart: book[];
  public TRY: book;
  public DetailsBook: book;
  public ShowDetails: boolean;
  public IdDetails: number;
  public ShowColor: boolean = false;
  public num: number;
  public item2: shoppingCart;
  p: number = 1;

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef, public cookieService: CookieService,public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.getAllDBFromServerHebrew().subscribe(val => this.DB = val);
    this.serverService.getNumProduct().subscribe(val => this.num = val);


  }
  changePlaying() {
    __await(1000);

    this.ngZone.run(() => {

      this.serverService.getNumProduct().subscribe((val) => {
        this.num = val;
        this.cd.detectChanges();
      });
    });
  }

  ngOnInit() {

  }
  NavigCart() {
    this.router.navigateByUrl("/ShoppingCartHebrew");

  }
  EditItemValentire(item) {
    alert(item);
    this.text = item;
    alert(this.text);
    this.showText = !this.showText;
  }
  //add() {
  //  this.show = !this.show;

  //}
  //end() {

  //  //alert(this.t)
  //  this.first_name.push(this.t);
  //  this.t = '';
  //}

  add() {
    alert(this.first_name);
    this.serverService.getAllDBFromServerHebrew().subscribe((events) => {

      console.log(events + "kk");
      this.DB = events;
      // alert(this.t + "uu");
    });
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  AddCart(item: book) {
    // this.cart.push(item);
    //alert(item.Name);
    this.TRY = item;
    this.UserNameLogin = (this.getCookie('UserName'));
    this.item2 = new shoppingCart();

    //this.item2.Id = item.Id;
    this.item2.IdBook = item.Id;
    this.item2.NameBook = item.Name;
    this.item2.ImageBook = item.Image;
    this.item2.PriceBook = item.Price;
    this.item2.Quantity = 1
    this.item2.SallePrice = item.SallePrice;
    this.item2.UserName = this.UserNameLogin;
    if (this.UserNameLogin != "") {
      this.serverService.enterItemToCart(this.item2);
    }
    else {
      this.router.navigateByUrl("/");

    }
    this.serverService.getNumProduct().subscribe((val) => {
      this.num = val;
      this.cd.detectChanges();

    });
    this.changePlaying();
    this.changePlaying();

  }  SendToCart() {
    this.router.navigateByUrl("/ShoppingCartHebrew");
  }
  Detais(item: book) {
    // this.ShowDetails = !this.ShowDetails;
    //this.IdDetails = item.Id;
    //this.serverService.Detais(item.Id).subscribe((events) => {

    // // console.log(events + "kk");
    //  this.DetailsBook = events;
    this.router.navigate(['BookDetailsHebrew', item.Id]);
    //  // alert(this.t + "uu");
    //});
  }
  SelectFilter(Group: number) {
    this.serverService.getAllDBFromServerHebrew().subscribe((val) => {
      this.DB = val;
      this.DB = this.DB.filter(book => book.GroupBook == Group);

    });


    if (Group == 1) {
      this.ShowBlue1 = true;
      this.ShowBlue2 = false;
      this.ShowBlue3 = false;
    }

    if (Group == 2) {
      this.ShowBlue2 = true;
      this.ShowBlue3 = false;
      this.ShowBlue1 = false;
    }

    if (Group == 3) {
      this.ShowBlue3 = true;
      this.ShowBlue2 = false;
      this.ShowBlue1 = false;
    }
  }
}
