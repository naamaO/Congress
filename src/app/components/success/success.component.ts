import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild,NgZone } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../classes/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CartWithAdrdess } from 'src/classes/CartWithAddress';
import { shoppingCart } from 'src/classes/shoppingCart';
import { debug } from 'util';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class successComponent implements OnInit {
  @ViewChild('Top') Top: ElementRef;

  public newUser: any;
  public sub: any;
  public Rout: string;
  public response: any;
  public user: string;
  public DBAddress: CartWithAdrdess[];
  public a: CartWithAdrdess;
  public DB: shoppingCart[];
  public RoutNum: number;
  public RoutNum1: number;
  public USERNAME = {
    KEY: 'UserName',
    UserName: null
  }
  public UserToRegistration = {
    KEY: 'UserToRegistration',
    contents: new User()
  };
  constructor(public route: ActivatedRoute,public router: Router, private serverService: ServerService, private http: HttpClient,public cookieService: CookieService) {
    console.log("success page on init! this.user")

    // Response=447&o_cred_type=1&lang=us&ccard=&expmonth=08&myid=111111111&email=nameEmail&cred_type=1&currency=2&ccno=1111&expyear=24&supplier=bytes2
   //&notify_url_address=http://localhost:4000/notify&sum=23&benid=4ncsvp43o7ei3j1i2g7sjh80e2&ConfirmationCode=0100000&cardtype=-&cardissuer=0&cardaquirer=1&index=7&Tempref=00002001 
   //this.sub = this.route.params;
   //  this.sub = this.route.params.subscribe(params => {
  //   this.response = params['response'], 
  //   this.user = params['userName']
    //    });
    console.log("success");
    this.RoutNum = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');
    this.RoutNum1 = +this.cookieService.get('setCookieRoutNewMember');

    this.Rout = this.getCookie('RoutTranzilaSuccessJewishStudies');
    debugger
    this.RoutNum = +this.Rout;
    console.log(this.RoutNum , "routNum");

    //this.newUser = new User();
    //this.newUser = this.getCookieNewUserToSendToTranzila('NewUserToSendToTranzila');
    //this.newUser.Email = this.getCookie('UserName');
    //this.newUser.FirstNameHebrew = this.getCookie('FirstNameHebrew');
    //this.newUser.LastNameHebrew = this.getCookie('LastNameHebrew');
    //this.newUser.FirstNameEnglish = this.getCookie('FirstNameEnglish');
    //this.newUser.LastNameEnglish = this.getCookie('LastNameEnglish');
    //this.newUser.Bio = this.getCookie('Bio');
    //this.newUser.NumberPhone2 = this.getCookie('NumPhone1');
    //this.newUser.Address = this.getCookie('AddressUserNew');
    //this.newUser.selectedCountry = this.getCookie('CountryUserNew');
    //this.newUser.Language = this.getCookie('LanguageUserNew');
    //this.newUser.MemberShip = + this.getCookie('MemberShipUserNew');
    //this.newUser.selectedTitle = this.getCookie('TitleUserNew');
    //this.serverService.Registration(this.newUser);
    debugger;
    this.user = this.serverService.LoginUserName;
    if (this.getCookie('UserName') ) {
      this.user = this.getCookie('UserName');
      console.log("cookie");

    }
    else {
      let _username = window.localStorage.getItem(this.USERNAME.KEY);
      this.user = _username;
      this.setCookie(this.user);
      console.log("localstorage");

    }
  this.setCookie(this.user);

    if (this.user && (this.RoutNum == 2)) {
      console.log("addToCart1");

  this.addToCart();
    }
    else {
      debugger
      console.log("rout1success");
      this.newUser = new User();
      //this.OldUser = this.getCookie2('UserNewMemberAccount');

      this.newUser = this.getCookieNewUserToSendToTranzila('UserNewMemberAccount');
      this.newUser = this.getCookie2('UserNewMemberAccount');
      let _User = window.localStorage.getItem(this.UserToRegistration.KEY);
      this.newUser = JSON.parse(_User);

      //this.newUser.FirstNameHebrew = this.getCookie('FirstNameHebrew');
      //this.newUser.LastNameHebrew = this.getCookie('LastNameHebrew');
      //this.newUser.FirstNameEnglish = this.getCookie('FirstNameEnglish');
      //this.newUser.LastNameEnglish = this.getCookie('LastNameEnglish');
      //this.newUser.Bio = this.getCookie('Bio');
      //this.newUser.NumberPhone2 = this.getCookie('NumPhone1');
      //this.newUser.Address = this.getCookie('AddressUserNew');
      //this.newUser.selectedCountry = this.getCookie('CountryUserNew');
      //this.newUser.Language = this.getCookie('LanguageUserNew');
      //this.newUser.MemberShip = + this.getCookie('MemberShipUserNew');
      //this.newUser.selectedTitle = this.getCookie('TitleUserNew');
      this.serverService.Registration(this.newUser);

    }
  }
  getCookie2(key: string) {
    return this.cookieService.getObject(key);
  }
  ngOnInit() {
    document.getElementById("Top").scrollIntoView();

    console.log("success!!!!!");

   console.log("success page on init! this.user")
  }
  setCookie(UaerName: string) {
    console.log("username!!!!!");

    this.cookieService.put('UserName', UaerName);
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  getCookieNewUserToSendToTranzila(key: string) {
    return this.cookieService.getObject(key);
  }
  addToCart() {
    console.log("addToCart1");

     // if(this.serverService.resNotifyTranzila==000){}
     if(this.getCookie('UserName')) {     
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DB = val;
        //var DBAddress: CartWithAdrdess[this.DB.length];

        for (var i = 0; i < this.DB.length; i++) {
          debugger;
          var arr = {};
          this.a = new CartWithAdrdess();
          //this.DBAddress = this.DB;
          //this.DBAddress[i].UserName = this.user;
          //this.DBAddress[i].Id = this.DB[i].Id;
          //this.DBAddress[i].IdBook = this.DB[i].IdBook;
          //this.DBAddress[i].NameBook = this.DB[i].NameBook;
          //this.DBAddress[i].PriceBook = this.DB[i].PriceBook;
          //this.DBAddress[i].ImageBook = this.DB[i].ImageBook;
          //this.DBAddress[i].Quantity = this.DB[i].Quantity;
          //this.DBAddress[i].SallePrice = this.DB[i].SallePrice;
          //this.DBAddress[i].Total = this.DB[i].Total;

          this.a.UserName = this.user;
          this.a.Id = this.DB[i].Id;
          this.a.IdBook = this.DB[i].IdBook;
          this.a.NameBook = this.DB[i].NameBook;
          this.a.PriceBook = this.DB[i].PriceBook;
          this.a.ImageBook = this.DB[i].ImageBook;
          this.a.Quantity = this.DB[i].Quantity;
          this.a.SallePrice = this.DB[i].SallePrice;
          this.a.Total = this.DB[i].Total; if (this.getCookie('address')) {
            debugger;
            //this.DBAddress[i].Address = this.getCookie('address');
            this.a.Address = this.getCookie('address');
           // this.arr.push(this.a);

          }
          if (this.getCookie('address2')) {
            debugger;
            //this.DBAddress[i].Address = this.getCookie('address2');
            this.a.Address = this.getCookie('address2');
            //this.arr.push(this.a);
          }
           
          else {
            // console.log( this.DB[i])
            let itemToDelete = this.DB[i];
            this.serverService.AddItemToCart(this.a).subscribe((res) => {
              if (res == 1) {
                //  console.log("this.DB[i]",itemToDelete)
                this.serverService.postRemoveQuantity(itemToDelete);
              }
              //  console.log(res)
            });

          }
        }
        this.clearAllData();
  });
 
    }

  }
  clearAllData() {
    window.localStorage.removeItem('CART');
    window.localStorage.removeItem('CARTMEMBERSHIP');
    window.localStorage.removeItem('NUM');
    window.localStorage.removeItem('TOTAL');
    // this.cookieService.remove('UserName');-Remains in cookies
    this.cookieService.remove('Total');
    this.cookieService.remove('Currency');
    this.cookieService.remove('Lang');
    this.cookieService.remove('ilang');
    this.cookieService.remove('contact');
    this.cookieService.remove('address');
    this.cookieService.remove('contact2');
    this.cookieService.remove('address2');
    this.cookieService.remove('RoutTranzilaSuccessJewishStudies');
  }
}
