import { Component, OnInit, NgZone  } from '@angular/core'
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
import { group } from '@angular/animations';
import { HostListener } from "@angular/core";
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
 
  public screenHeight: number;
  public screenWidth: number;
  public UserNameLogin: string;
  public ShowBlue1: boolean = true;
  public ShowBlue2: boolean=false;
  public ShowBlue3: boolean=false;
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
  //playing: boolean = false;
  p: number = 1;
  changeImg: boolean;
  public Total: number;
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
  constructor(private ngZone: NgZone,private cd: ChangeDetectorRef,public cookieService: CookieService,public router: Router, private serverService: ServerService, private http: HttpClient) {
    // this.serverService.getAllDBFromServer().subscribe(val => this.DB = val);
   //get list of shopping cart//if login
if(this.getCookie('UserName')) {     
    this.serverService.getAllDBShoppingCart().subscribe((val) => {
      this.DBShoppingCart = val;
        for (var i = 0; i < this.DBShoppingCart.length; i++) {
          if (this.DBShoppingCart[i].SallePrice == 0)
            this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
          else
            this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
  
        }
      });
      this.serverService.getTotalPrice().subscribe(val => this.Total = val);
      //get list of all books
      // this.serverService.getAllDBFromServerHebrew().subscribe(val => this.DB = val);
    this.serverService.getNumProduct().subscribe(val => this.num = val);
    }
else{
  if(!this.DBShoppingCart){
          //check localStorage and initialize the contents of CART.contents
          let _contents = localStorage.getItem(this.CART.KEY);
          if(_contents){
              this.CART.contents = JSON.parse(_contents);
              this.DBShoppingCart= this.CART.contents;
              if(this.DBShoppingCart.length > 0){
              for (var i = 0; i < this.DBShoppingCart.length; i++) {
              if (this.DBShoppingCart[i].SallePrice == 0){
                  this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
                  this.num = this.num + this.DBShoppingCart[i].Quantity;
                  this.Total = this.Total + this.DBShoppingCart[i].Total;
              }
             else{
                this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
                this.num = this.num + this.DBShoppingCart[i].Quantity;
                this.Total = this.Total + this.DBShoppingCart[i].Total;
              }
            }
          }
          }else{
              //dummy test data
              this.CART.contents = [];  
               let _cart = JSON.stringify(this.CART.contents);
               localStorage.setItem(this.CART.KEY, _cart);
              // CART.sync();
              this.DBShoppingCart= this.CART.contents;  
          }
          let _num = localStorage.getItem(this.NUM.KEY);
          if(parseInt(_num)>0){
            this.NUM.num = parseInt(_num);
            this.num = parseInt(_num);
          }
          else{
            this.NUM.num = 0;         
            let _num =  JSON.stringify(this.NUM.num);
            localStorage.setItem(this.NUM.KEY, _num);
            this.num = 0;
          }
          let _total = localStorage.getItem(this.TOTAL.KEY);
          if(parseInt(_total)>0){
            this.TOTAL.total = parseInt(_total);
           this.Total = parseInt(_total);
          }
          else{
            this.TOTAL.total = 0;         
            let _total =  JSON.stringify(this.TOTAL.total);
            localStorage.setItem(this.TOTAL.KEY, _total);
            this.Total = 0;
          }
}
 }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  changePlaying() {
    __await(1000);

    this.ngZone.run(() => {

      this.serverService.getNumProduct().subscribe((val) => {
        this.num = val;
        this.cd.detectChanges();
      });    });
  }
  ngOnInit() {

    this.serverService.getAllDBFromServer().subscribe(
      resp => {
        this.DB = resp;
        this.DB = this.DB.filter(book => book.GroupBook == 1);
      },
      error => {  
        console.log(error)
      });
      console.log("this.DB",this.DB)

      this.UserNameLogin = this.getCookie('UserName');
      if(this.UserNameLogin){
        console.log(this.UserNameLogin)
      }
      else  if(!this.UserNameLogin||this.UserNameLogin==null){
          let  _num = localStorage.getItem(this.NUM.KEY);
          if(_num){
              this.NUM.num = JSON.parse(_num);
            }
            let  _total = localStorage.getItem(this.TOTAL.KEY);
            if(_total){
                this.TOTAL.total = JSON.parse(_total);
              }
    }
  }
  SendToTranzila() {
    this.router.navigate(['Pay', this.Total]);
 }
  NavigCart() {
    this.router.navigateByUrl("/ShoppingCart");

  }
  EditItemValentire(item) {
    this.text = item;
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
    this.serverService.getAllDBFromServer().subscribe((events) => {

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
  }
  SendToCart() {
    this.router.navigateByUrl("/ShoppingCart");
  }
  Details(item: book) {
   // this.ShowDetails = !this.ShowDetails;
    //this.IdDetails = item.Id;
    //this.serverService.Detais(item.Id).subscribe((events) => {

    // // console.log(events + "kk");
    //  this.DetailsBook = events;
    this.router.navigate(['BookDetails', item.Id]);
    //  // alert(this.t + "uu");
    //});
  }
  SelectFilter(Group: number) {
    this.serverService.getAllDBFromServer().subscribe((val) => {
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
