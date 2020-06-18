import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';
import { shoppingCart } from 'src/classes/shoppingCart';
import { __await } from 'tslib';

@Component({
  selector: 'app-book-details-hebrew',
  templateUrl: './book-details-hebrew.component.html',
  styleUrls: ['./book-details-hebrew.component.css']
})
export class BookDetailsHebrewComponent implements OnInit {
  public Total1: number;
  public Quantity: number;
  public item2: shoppingCart;

  public UserNameLogin: string;
  public Id: number;
  private sub: any;
  public DetailsBook: book;
  public Total: number;
  public num: number;
  public DB: shoppingCart[];
 
  constructor(private ngZone: NgZone,public cookieService: CookieService, public routers: Router, public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient) {
    this.Quantity = 1;
    
  }

  ngOnInit() {

    this.sub = this.router.params.subscribe(params => {
      this.Id = +params['Id']; // (+) converts string 'id' to a number
      this.serverService.DetailsHebrew(this.Id).subscribe((events) => {

        // console.log(events + "kk");
        this.DetailsBook = events;
        // alert(this.t + "uu");
      });
    });
    this.serverService.getAllDBShoppingCart().subscribe(
      resp => {
        this.DB = resp;
        for (var i = 0; i < this.DB.length; i++) {
          if (this.DB[i].SallePrice == 0)
            this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
          else
            this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
  
        }
      },
      error => {  
        console.log(error)
      });

    // this.serverService.getAllDBShoppingCart().subscribe((val) => {
    //   this.DB = val;
    //     for (var i = 0; i < this.DB.length; i++) {
    //       if (this.DB[i].SallePrice == 0)
    //         this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
    //       else
    //         this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
  
    //     }
    //   });
      this.serverService.getTotalPrice().subscribe(val => this.Total = val);
      this.serverService.getNumProduct().subscribe(val => this.num = val);
  }
  
  NavigCart() {
    this.routers.navigateByUrl("/ShoppingCartHebrew");
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  AddCart(item: book) {
    this.item2 = new shoppingCart();  
    // this.cart.push(item);
    this.UserNameLogin = (this.getCookie('UserName'));
    //this.item2.Id = item.Id;
    this.item2.IdBook = item.Id;
    this.item2.NameBook = item.Name;
    this.item2.ImageBook = item.Image;
    this.item2.PriceBook = item.Price;
    this.item2.Quantity = this.Quantity;
    this.item2.SallePrice = item.SallePrice;
    this.item2.UserName = this.UserNameLogin;
  
    if (this.UserNameLogin != "") {
      this.serverService.enterItemToCart(this.item2).subscribe((events) => {
        this.changePlaying();
        this.changePlaying();
        this.serverService.getNumProduct().subscribe(val => this.num = val);

        });  
    }
    else {
      this.routers.navigateByUrl("/");

    }
  }
  
  changePlaying() {
    __await (1000);
    this.ngZone.run(() => {
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DB = val;
        for (var i = 0; i < this.DB.length; i++) {
          if (this.DB[i].SallePrice == 0)
            this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
          else
            this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;

        }
        this.serverService.getNumProduct().subscribe(val => this.num = val);

      });
      this.serverService.getTotalPrice().subscribe(val => this.Total = val);
    });
    this.serverService.getNumProduct().subscribe(val => this.num = val);
  }
  deleteQuantity(item: shoppingCart) {
  
    if(this.Quantity!==0)
    {   
       this.Quantity=this.Quantity-1;
       console.log("item:",item,"this.Quantity:",this.Quantity)
       this.serverService.postdeleteQuantity(item);

      this.changePlaying();
      // this.changePlaying();
    }
    else{
      this.Quantity=0;
    }
    // this.serverService.postdeleteQuantity(item);//.subscribe((events) => {
    // this.router.navigateByUrl("/ShoppingCart");
    //location.reload()
    // this.changePlaying();
    // this.changePlaying();
  }
  AddQuantity(item: shoppingCart) {
item.Quantity=this.Quantity;
    this.serverService.postAddQuantity(item)//.subscribe((events) => {
    //
    //this.router.navigateByUrl("/ShoppingCart");
    this.changePlaying();
     this.changePlaying(); 
    //  alert(item.NameBook + "uu");
    //});

  }

  SendToTranzila(item:shoppingCart) {
    if (this.DetailsBook.SallePrice != 0) {
      this.Total1 = this.Quantity * this.DetailsBook.SallePrice
    }
    else {
      this.Total1 = this.Quantity * this.DetailsBook.Price
    }
    this.routers.navigate(['Pay', this.Total1]);
  }
  SendToTranzilaPay() {
    this.routers.navigate(['Pay', this.Total]);
  }
  SendToNew() {
    this.routers.navigateByUrl("/newHebrew");

  }
}
