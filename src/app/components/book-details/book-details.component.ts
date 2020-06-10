import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';
import { shoppingCart } from 'src/classes/shoppingCart';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public item2: shoppingCart;
  public Quantity: number;
  public UserNameLogin: string;
  public Id: number;
  private sub: any;
  public DetailsBook: book;
  public num: number;

  constructor(public cookieService: CookieService, public routers: Router, public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient) {
    this.Quantity = 1;
    this.serverService.getNumProduct().subscribe(val => this.num = val);
  }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.Id = +params['Id']; // (+) converts string 'id' to a number
      this.serverService.Detais(this.Id).subscribe((events) => {

       // console.log(events + "kk");
        this.DetailsBook = events;
      // alert(this.t + "uu");
    });
    });
  }
  NavigCart() {
    this.routers.navigateByUrl("/ShoppingCart");
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  AddCart(item: book) {
    
    this.UserNameLogin = (this.getCookie('UserName'));
    this.item2 = new shoppingCart();

    //this.item2.Id = item.Id;
    this.item2.IdBook = item.Id;
    this.item2.NameBook = item.Name;
    this.item2.ImageBook = item.Image;
    this.item2.PriceBook = item.Price;
    this.item2.Quantity = this.Quantity;
    this.item2.SallePrice = item.SallePrice;
    this.item2.UserName = this.UserNameLogin;

    if (this.UserNameLogin != "") {
      this.serverService.enterItemToCart(this.item2);
    }

    else {
      this.routers.navigateByUrl("/");

    }

  }

}
