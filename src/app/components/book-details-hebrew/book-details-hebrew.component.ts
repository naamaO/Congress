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
  public Quantity: number =0;
  public MQuantity: number=0;
  public item2: shoppingCart;
  public UserNameLogin: string;
  public Id: number;
  private sub: any;
  public DetailsBook: book;
  public Total: number;
  public num: number;
  public DB: shoppingCart[];
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
  public enterItemToCart:boolean = true;

  constructor(private ngZone: NgZone,public cookieService: CookieService, public routers: Router, public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient) {
    this.Quantity = 0;
 //get list of shopping cart//if login
if(this.getCookie('UserName')) {     
  this.serverService.getAllDBShoppingCart().subscribe((resp) => {
    this.DB = resp;
    for (var i = 0; i < this.DB.length; i++) {
      if (this.DB[i].SallePrice == 0)
        this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
      else
        this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
    }
    this.DB.filter(product=>{
      if(product.IdBook == this.Id){
        this.Quantity = product.Quantity;
      }
  });
    },
    error => {  
      console.log(error)
    });
    this.serverService.getTotalPrice().subscribe(val => this.Total = val);
    //get list of all books
    // this.serverService.getAllDBFromServerHebrew().subscribe(val => this.DB = val);
  this.serverService.getNumProduct().subscribe(val => this.num = val);
  }
else{
if(!this.DB){

        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(this.CART.KEY);
        if(_contents){
            this.CART.contents = JSON.parse(_contents);
            this.DB = this.CART.contents;
             for (var i = 0; i < this.DB.length; i++) {
               if (this.DB[i].SallePrice == 0){
               this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
               this.num = this.num + this.DB[i].Quantity;
               this.Total = this.Total + this.DB[i].Total;
             }
             else{
               this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
               this.num = this.num + this.DB[i].Quantity;
               this.Total = this.Total + this.DB[i].Total;
             }
             }
        }else{
            //dummy test data
            this.CART.contents = [];   
             let _cart = JSON.stringify(this.CART.contents);
             localStorage.setItem(this.CART.KEY, _cart);
            // CART.sync();
            this.DB= this.CART.contents;  
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

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.Id = +params['Id']; // (+) converts string 'id' to a number
      this.serverService.DetailsHebrew(this.Id).subscribe((events) => {
        this.DetailsBook = events;
      });
    });
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
  if(this.DB){
  this.DB.filter(product=>{
    if(product.IdBook == this.Id){
      this.Quantity = product.Quantity;
    }
    });
  }
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
    if(this.getCookie('UserName')){
      this.UserNameLogin = (this.getCookie('UserName'));
    }
    else{
      this.UserNameLogin=null;
    }
    //this.item2.Id = item.Id;
    this.item2.IdBook = item.Id;
    this.item2.NameBook = item.Name;
    this.item2.ImageBook = item.Image;
    this.item2.PriceBook = item.Price;
    this.item2.Quantity = this.Quantity;
    this.item2.SallePrice = item.SallePrice;
    this.item2.UserName = this.UserNameLogin;
  
    if ((this.UserNameLogin!=null) && (this.UserNameLogin != "")) {
      this.DB.filter(product=>{
        if(product.IdBook == this.Id){
         this.AddQuantity(product);
         this.enterItemToCart = false;
        }
        });
        if(this.enterItemToCart){
          this.serverService.enterItemToCart(this.item2).subscribe((events) => {
            this.changePlaying();
            this.changePlaying();
            this.serverService.getNumProduct().subscribe(val => this.num = val);
            });  
          }
    }
    else {

      this.add(this.item2.IdBook)
   //  let _cart = JSON.stringify(this.CART.contents);
   //  localStorage.setItem(this.CART.KEY, this.item2);
     // this.routers.navigateByUrl("/");
    }
  } 
  async sync(){
    let _cart = JSON.stringify(this.CART.contents);
    await localStorage.setItem(this.CART.KEY, _cart);
    this.DB= this.CART.contents;
    if(this.DB.length==1){
    for (var i = 0; i < this.DB.length; i++) {
      if (this.DB[i].SallePrice == 0){
      this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
      this.CART.contents.map(item=>{
        if(item.Id === i)
        this.CART.contents[i].Total = this.DB[i].Total;
      });  
      let _cart = JSON.stringify(this.CART.contents);
      localStorage.setItem(this.CART.KEY, _cart);
    if(this.MQuantity>0){
      this.num = this.num + this.MQuantity;
     }
    else{
      this.num = this.num + this.DB[i].Quantity;
     }
     if(this.MQuantity>0){
      this.Total = this.Total + (this.DB[i].PriceBook * this.MQuantity);
     }
    else{
      this.Total = this.Total + this.DB[i].Total;
    }
    }
    else{
      this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
      this.CART.contents.map(item=>{
        if(item.Id === i)
        this.CART.contents[i].Total = this.DB[i].Total;
      });  
      let _cart = JSON.stringify(this.CART.contents);
      localStorage.setItem(this.CART.KEY, _cart);
        if(this.MQuantity>0){
        this.num = this.num + this.MQuantity;
       }
      else{
        this.num = this.num + this.DB[i].Quantity;
       }
       if(this.MQuantity>0){
        this.Total = this.Total + (this.DB[i].SallePrice * this.MQuantity);
       }
       else{
        this.Total = this.Total + this.DB[i].Total;
      }
    }
  }
}
  else{
    let i = this.DB.length-1; 
    if (this.DB[i].SallePrice == 0){
    this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
  }
  else{
    this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
  }
this.CART.contents.map(item=>{
  if(item.Id === i)
  this.CART.contents[i].Total = this.DB[i].Total;
});
let _cart = JSON.stringify(this.CART.contents);
localStorage.setItem(this.CART.KEY, _cart);
 if(this.MQuantity>0){
  this.num = this.num + this.MQuantity;
 }
 else{
  this.num = this.num + this.DB[i].Quantity;
 }
 if (this.DB[i].SallePrice == 0){
 if(this.MQuantity>0){
  this.Total = this.Total + (this.DB[i].PriceBook * this.MQuantity);
 }
 else{
  this.Total = this.Total + this.DB[i].Total;
  }
  }
 else{
    if(this.MQuantity>0){
      this.Total = this.Total + (this.DB[i].SallePrice * this.MQuantity);
     }
     else{
      this.Total = this.Total + this.DB[i].Total;
    }
  }
}
  if(this.DB.length==0){
    this.num = 0;
  }
  this.NUM.num = this.num;
  let _num =  JSON.stringify(this.NUM.num);
  localStorage.setItem(this.NUM.KEY, _num);

  this.TOTAL.total = this.Total;
  let _total =  JSON.stringify(this.TOTAL.total);
  localStorage.setItem(this.TOTAL.KEY, _total);
}
find(id){
    //find an item in the cart by it's id
    let match = this.CART.contents.filter(item=>{
        if(item.IdBook == id)
            return true;
    });
    if(match && match[0])
        return match[0];
}
  add(id){
    //add a new item to the cart
    //check that it is not in the cart already
    if(this.find(id)){
        this.increase(id, 1);
    }
    else{
      // let PRODUCTS = [];
      //   let arr = PRODUCTS.filter(product=>{
      //       if(product.id == id){
      //           return true;
      //       }
      //   });
        // if(arr && arr[0]){
            let obj = {
                Id: this.CART.contents.length,
                UserName: null,
                IdBook: this.item2.IdBook,
                NameBook: this.item2.NameBook,
                PriceBook: this.item2.PriceBook,
                ImageBook: this.item2.ImageBook,
                Quantity: this.item2.Quantity,
                SallePrice: this.item2.SallePrice,
                Total: this.item2.Total
            };
            this.CART.contents.push(obj);
            //update localStorage
            this.sync();
        // }
        // else{
            //product id does not exist in products data
          //  console.error('Invalid Product');
       // }
    }
}
increase(id, qty){
    //increase the quantity of an item in the cart
    this.CART.contents = this.CART.contents.map(item=>{
      if (item.IdBook === id)
      if(item.Quantity>0){
        this.MQuantity = this.Quantity - item.Quantity;
        item.Quantity = item.Quantity + (this.Quantity - item.Quantity);
      }
      else{
        item.Quantity = item.Quantity + this.Quantity;
      }
      return item;
    });
    //update localStorage
    this.sync()
}
reduce(id, qty=1){
    //reduce the quantity of an item in the cart
    this.CART.contents = this.CART.contents.map(item=>{
        if(item.Id === id)
            item.Quantity = item.Quantity - qty;
        return item;
    });
    this.CART.contents.forEach(async item=>{
        if(item.Id === id && item.Quantity === 0)
            await this.remove(id);
    });
    //update localStorage
    this.sync()
}
remove(id){
    //remove an item entirely from CART.contents based on its id
    this.CART.contents = this.CART.contents.filter(item=>{
        if(item.Id !== id)
            return true;
    });
    //update localStorage
    this.sync()
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
       //console.log("item:",item,"this.Quantity:",this.Quantity)
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
    this.serverService.postAddQuantity(item);
    this.changePlaying();
     this.changePlaying(); 
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
