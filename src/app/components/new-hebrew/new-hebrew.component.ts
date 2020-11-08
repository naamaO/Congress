import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ChangeDetectorRef } from '@angular/core';
import { __await } from 'tslib';
import { shoppingCart } from 'src/classes/shoppingCart';
import { RealExchangeService } from 'src/app/services/real-exchange.service';

@Component({
  selector: 'app-new-hebrew',
  templateUrl: './new-hebrew.component.html',
  styleUrls: ['./new-hebrew.component.css']
})
export class NewHebrewComponent implements OnInit {
  @ViewChild('DivRow') DivRow: ElementRef;
  @ViewChild('CartTooltip') CartTooltip: ElementRef;
  @ViewChild('arr1') arr1: ElementRef;
  @ViewChild('arr2') arr2: ElementRef;
  @ViewChild('arr3') arr3: ElementRef;

  public UserNameLogin: string;
  public ShowBlue1: boolean = true;
  public ShowBlue2: boolean = false;
  public ShowBlue3: boolean = false;
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
  public p: number = 1;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public Total: number = 0;
  public TotalUSD: number = 0;
  public TotalILS: number = 0;
  public TotalAfterDiscount: number = 0;
  public TotalAfterDiscountUSD: number = 0;
  public TotalAfterDiscountILS: number = 0;
  public IsMemberShip: boolean = false;
  public DBShoppingCart: shoppingCart[];
  public CART = {
    KEY: 'ShoppingCartGuest',
    contents: []
  }
  public NUM = {
    KEY: 'ShoppingCartNum',
    num: 0
  }
  public TOTAL = {
    KEY: 'ShoppingCartTotal',
    total: 0
  }

  public TOTALUSD = {
    KEY: 'ShoppingCartTotalUSD',
    total: 0
  }
  public TOTALILS = {
    KEY: 'ShoppingCartTotalILS',
    total: 0
  }

  public CURRENCYCODE = {
    KEY: 'CurrencyCode',
    code: '2'
  }

  constructor(private ngZone: NgZone, private realExchangeService: RealExchangeService, private cd: ChangeDetectorRef, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    //get list of shopping cart//if login
    var bookActualPrice, bookActualPriceUSD, bookActualPriceILS;

    if (this.getCookie('UserName')) {
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DBShoppingCart = val;
        for (var i = 0; i < this.DBShoppingCart.length; i++) {
          if (this.DBShoppingCart[i].SallePrice == 0) {
            bookActualPrice = this.DBShoppingCart[i].PriceBook;
            bookActualPriceUSD = this.DBShoppingCart[i].PriceUSD;
            bookActualPriceILS = this.DBShoppingCart[i].PriceILS;
          }
          else {
            bookActualPrice = this.DBShoppingCart[i].SallePrice;
            bookActualPriceUSD = this.DBShoppingCart[i].SalePriceUSD;
            bookActualPriceILS = this.DBShoppingCart[i].SalePriceILS;
          }
          this.DBShoppingCart[i].Total = bookActualPrice * this.DBShoppingCart[i].Quantity;
          this.DBShoppingCart[i].TotalUSD = bookActualPriceUSD * this.DBShoppingCart[i].Quantity;
          this.DBShoppingCart[i].TotalILS = bookActualPriceILS * this.DBShoppingCart[i].Quantity;
        }
      });
      this.serverService.getTotalPrice().subscribe((values) => {

        this.Total = values['Total'];
        this.TotalUSD = values['TotalUSD'];
        this.TotalILS = values['TotalILS'];


        this.UserNameLogin = this.getCookie('UserName');
        if (this.UserNameLogin) {
          this.serverService.getUserDetails().subscribe((events) => {
            this.FirstNameHebrew = events.FirstNameHebrew;
            this.LastNameHebrew = events.LastNameHebrew;
            if (events.MemberShip > -1)
              this.IsMemberShip = true;
            if (this.IsMemberShip) {
              // this.serverService.setTotal();
              if (this.Total > 0) {
               this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
              }
            }
          })
        }
      });      //get list of all books
      // this.serverService.getAllDBFromServerHebrew().subscribe(val => this.DB = val);
      this.serverService.getNumProduct().subscribe(val => this.num = val);
    }
    else {
      if (!this.DBShoppingCart) {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(this.CART.KEY);
        if (_contents) {
          this.CART.contents = JSON.parse(_contents);
          this.DBShoppingCart = this.CART.contents;
          console.log("this.DBShoppingCart", this.DBShoppingCart)

          if (this.DBShoppingCart.length > 0) {
            for (var i = 0; i < this.DBShoppingCart.length; i++) {
                             if (this.DBShoppingCart[i].SallePrice == 0) {
                  bookActualPrice = this.DBShoppingCart[i].PriceBook;
                  bookActualPriceUSD = this.DBShoppingCart[i].PriceUSD;
                  bookActualPriceILS = this.DBShoppingCart[i].PriceILS;
                }
                else {
                  bookActualPrice = this.DBShoppingCart[i].SallePrice;
                  bookActualPriceUSD = this.DBShoppingCart[i].SalePriceUSD;
                  bookActualPriceILS = this.DBShoppingCart[i].SalePriceILS;
                }

                this.DBShoppingCart[i].Total = bookActualPrice * this.DBShoppingCart[i].Quantity;
                this.DBShoppingCart[i].TotalUSD = bookActualPriceUSD * this.DBShoppingCart[i].Quantity;
                this.DBShoppingCart[i].TotalILS = bookActualPriceILS * this.DBShoppingCart[i].Quantity;

                this.Total+=this.DBShoppingCart[i].Total;
                this.TotalUSD+=this.DBShoppingCart[i].TotalUSD;
                this.TotalILS+=this.DBShoppingCart[i].TotalILS;
               
            }
          } else {
            //dummy test data
            this.CART.contents = [];
            let _cart = JSON.stringify(this.CART.contents);
            localStorage.setItem(this.CART.KEY, _cart);
            // CART.sync();
            this.DBShoppingCart = this.CART.contents;
          }
          let _num = localStorage.getItem(this.NUM.KEY);
          if (parseInt(_num) > 0) {
            this.NUM.num = parseInt(_num);
            this.num = parseInt(_num);
          }
          else {
            this.NUM.num = 0;
            let _num = JSON.stringify(this.NUM.num);
            localStorage.setItem(this.NUM.KEY, _num);
            this.num = 0;
          }
          let _total = localStorage.getItem(this.TOTAL.KEY);
          let _totalUSD = localStorage.getItem(this.TOTALUSD.KEY);
          let _totalILS = localStorage.getItem(this.TOTALILS.KEY);

          if (parseInt(_total) > 0) {
            this.TOTAL.total = parseInt(_total);
            this.TOTALUSD.total = parseInt(_total);
            this.TOTALILS.total = parseInt(_total);

            this.Total = parseInt(_total);
            this.TotalUSD = parseInt(_totalUSD);
            this.TotalILS = parseInt(_totalILS);
          }
          else {
            this.TOTAL.total = 0;
            this.TOTALUSD.total = 0;
            this.TOTALILS.total = 0;

            let _total = JSON.stringify(this.TOTAL.total);
            let _totalUSD = JSON.stringify(this.TOTALUSD.total);
            let _totalILS = JSON.stringify(this.TOTALILS.total);

            localStorage.setItem(this.TOTAL.KEY, _total);
            localStorage.setItem(this.TOTALUSD.KEY, _totalUSD);
            localStorage.setItem(this.TOTALILS.KEY, _totalILS);

            this.Total = 0;
            this.TotalUSD = 0;
            this.TotalILS = 0;
          }
        }
      }
    }
    console.log("this.DBShoppingCart", this.DBShoppingCart)

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

    this.serverService.getAllDBFromServerHebrew().subscribe(
      resp => {
        this.DB = resp;
        this.DB = this.DB.filter(book => book.GroupBook == 1);
      },
      error => {
        console.log(error)
      });
    this.UserNameLogin = this.getCookie('UserName');
    if (this.UserNameLogin) {
      console.log(this.UserNameLogin)
    }
    else if (!this.UserNameLogin || this.UserNameLogin == null) {
      let _num = localStorage.getItem(this.NUM.KEY);
      if (_num) {
        this.NUM.num = JSON.parse(_num);
      }
      let _total = localStorage.getItem(this.TOTAL.KEY);
      let _totalUSD = localStorage.getItem(this.TOTALUSD.KEY);
      let _totalILS = localStorage.getItem(this.TOTALILS.KEY);
      if (_total) {
        this.TOTAL.total = JSON.parse(_total);
        this.TOTALUSD.total = JSON.parse(_totalUSD);
        this.TOTALILS.total = JSON.parse(_totalILS);
      }
      this.IsMemberShip = false;

    }

  }
  OpenTooltip() {
    if (document.getElementById("CartTooltip").classList.contains("CartTooltip"))
      document.getElementById("CartTooltip").classList.remove("CartTooltip");
    else
      document.getElementById("CartTooltip").classList.add("CartTooltip");

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
    this.serverService.getAllDBFromServerHebrew().subscribe((events) => {
      console.log(events);
      this.DB = events;
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
    this.item2.PriceUSD = item.PriceUSD;
    this.item2.PriceILS = item.PriceILS;

    this.item2.Quantity = 1
    this.item2.SallePrice = item.SallePrice;
    this.item2.SalePriceUSD = item.SalePriceUSD;
    this.item2.SalePriceILS = item.SalePriceILS;

    this.item2.UserName = this.UserNameLogin;
    this.item2.Currency = item.Currency;
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

  }
  getDiscountTotal(Total, TotalUSD, TotalILS) {
    let discount = Total * (20 / 100);
    this.TotalAfterDiscount = Total - discount;
    this.TotalAfterDiscountUSD = 0.8 * TotalUSD;
    this.TotalAfterDiscountILS = 0.8 * TotalILS;
  }

  SendToCart() {
    this.router.navigateByUrl("/ShoppingCartHebrew");
  }
  SendToTranzila() {
    this.router.navigate(['Pay', this.Total]);
  }
  SendToSignIn() {
    this.router.navigateByUrl("/UserPass/2");
  }

  isSignIn() {
    this.UserNameLogin = this.getCookie('UserName');
    if (this.UserNameLogin != undefined) {
      return true;
    }
    else {
      return false;
    }
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
      this.arr1.nativeElement.style.display = "block";
      this.arr2.nativeElement.style.display = "none";
      this.arr3.nativeElement.style.display = "none";

      document.getElementById("DivRow").classList.add("divNew");
      document.getElementById("DivRow").classList.remove("divNew2");
      document.getElementById("DivRow").classList.remove("divNew3");
      this.ShowBlue1 = true;
      this.ShowBlue2 = false;
      this.ShowBlue3 = false;
    }

    if (Group == 2) {
      this.arr2.nativeElement.style.display = "block";
      this.arr1.nativeElement.style.display = "none";
      this.arr3.nativeElement.style.display = "none";

      document.getElementById("DivRow").classList.add("divNew2");
      document.getElementById("DivRow").classList.remove("divNew3");
      document.getElementById("DivRow").classList.remove("divNew");
      this.ShowBlue2 = true;
      this.ShowBlue3 = false;
      this.ShowBlue1 = false;
    }

    if (Group == 3) {
      this.arr3.nativeElement.style.display = "block";
      this.arr2.nativeElement.style.display = "none";
      this.arr1.nativeElement.style.display = "none";

      document.getElementById("DivRow").classList.add("divNew3");
      document.getElementById("DivRow").classList.remove("divNew2");
      document.getElementById("DivRow").classList.remove("divNew");
      this.ShowBlue3 = true;
      this.ShowBlue2 = false;
      this.ShowBlue1 = false;
    }
  }
}
