import { Component, OnInit, Input, OnDestroy, NgZone ,ViewChild, ElementRef} from '@angular/core';
import { book } from '../../../classes/classItem'
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { shoppingCart } from 'src/classes/shoppingCart';
import { __await } from 'tslib';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @ViewChild('CartTooltip') CartTooltip: ElementRef;
  @ViewChild('Top') Top: ElementRef;
  public LastQuantity: number = 0;
  public IdGeneric: number;
  public item2: shoppingCart;
  public Quantity: number=1;
  public MQuantity: number=0;
  public UserNameLogin: string;
  public Id: number;
  private sub: any;
  public DetailsBook: book;
  public num: number;
  public Total: number = 0;
  public TotalAfterDiscount:number = 0;
  public FirstName: string;
  public LastName: string;
  public IsMemberShip:boolean=false;
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
  public enterItemToCart:boolean = true;

  constructor(private ngZone: NgZone,public cookieService: CookieService, public routers: Router, public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient) {
    this.Quantity = 1;
    //get list of shopping cart//if login
   if(this.getCookie('UserName')) {     
     this.serverService.getAllDBShoppingCart().subscribe((resp) => {
       this.DBShoppingCart = resp;
       for (var i = 0; i < this.DBShoppingCart.length; i++) {
         if (this.DBShoppingCart[i].SallePrice == 0)
           this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
         else
           this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
       }
       this.DBShoppingCart.filter(product=>{
        if(product.IdBook == this.Id){
          this.Quantity = product.Quantity;
        }
      });
       },
       error => {  
         console.log(error)
       });
       this.serverService.getTotalPrice().subscribe((val) => {
        this.Total = val
        this.UserNameLogin = this.getCookie('UserName');  
        if(this.UserNameLogin){
        this.serverService.getUserDetails().subscribe((events) => {
          this.FirstName = events.FirstNameEnglish;
          this.LastName = events.LastNameEnglish; 
          if(events.MemberShip >-1)
          this.IsMemberShip = true;
          if(this.IsMemberShip){
            //this.serverService.setTotal();
          if(this.Total>0){
          this.getDiscountTotal(this.Total);
          }
          }
        })
      }
      });  
       //get list of all books
     this.serverService.getNumProduct().subscribe(val => this.num = val);
     }
   else{
   if(!this.DBShoppingCart){
           //check localStorage and initialize the contents of CART.contents
           let _contents = localStorage.getItem(this.CART.KEY);
           if(_contents){
               this.CART.contents = JSON.parse(_contents);
               this.DBShoppingCart = this.CART.contents;
                for (var i = 0; i < this.DBShoppingCart.length; i++) {
                  if (this.DBShoppingCart[i].SallePrice == 0){
                  this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
                  this.num = this.num + this.DBShoppingCart[i].Quantity;
                  this.Total = this.Total + this.DBShoppingCart[i].Total;
                  if(this.Total>0){
                  this.getDiscountTotal(this.Total);
                  }
                }
                else{
                  this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
                  this.num = this.num + this.DBShoppingCart[i].Quantity;
                  this.Total = this.Total + this.DBShoppingCart[i].Total;
                  if(this.Total>0){
                    this.getDiscountTotal(this.Total);
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
        if(this.Total>0){
          this.getDiscountTotal(this.Total);
          }
       }
       else{
         this.TOTAL.total = 0;         
         let _total =  JSON.stringify(this.TOTAL.total);
         localStorage.setItem(this.TOTAL.KEY, _total);
         this.Total = 0;
         if(this.Total==0){
          this.TotalAfterDiscount = 0;
          }
       }
   }
   }
  }

  ngOnInit() {
    document.getElementById("Top").scrollIntoView();

    this.sub = this.router.params.subscribe(params => {
      this.Id = +params['Id']; // (+) converts string 'id' to a number
      this.serverService.Detais(this.Id).subscribe((events) => {
        this.DetailsBook = events;
    });
    });

    this.UserNameLogin = this.getCookie('UserName');
    if(this.UserNameLogin){
      //console.log(this.UserNameLogin)
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
            this.IsMemberShip = false;
  }
  if(this.DBShoppingCart){
      this.DBShoppingCart.filter(product=>{
          if(product.IdBook == this.Id){
            this.Quantity = product.Quantity;
          }
      });
    }
  }
  OpenTooltip() {
    if (document.getElementById("CartTooltip").classList.contains("CartTooltip"))
      document.getElementById("CartTooltip").classList.remove("CartTooltip");
    else
      document.getElementById("CartTooltip").classList.add("CartTooltip");

  } NavigCart1() {
    this.routers.navigateByUrl("/ShoppingCart");

  }
  NavigCart(item: book) {
  this.item2 = new shoppingCart();
    // this.cart.push(item);
    if (this.getCookie('UserName')) {
      this.UserNameLogin = (this.getCookie('UserName'));
    }
    else {
      this.UserNameLogin = null;
    }
    //this.item2.Id = item.Id;
    this.item2.IdBook = item.Id;
    this.item2.NameBook = item.Name;
    this.item2.ImageBook = item.Image;
    this.item2.PriceBook = item.Price;
    this.item2.Quantity = this.Quantity;
    this.item2.SallePrice = item.SallePrice;
    this.item2.UserName = this.UserNameLogin;

    if ((this.UserNameLogin != null) && (this.UserNameLogin != "")) {
      this.DBShoppingCart.filter(product => {
        if (product.IdBook == this.Id) {
          this.AddQuantity(product);
          this.enterItemToCart = false;
        }
      });
      if (this.enterItemToCart) {
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
    this.routers.navigateByUrl("/ShoppingCart");
  } 
  SendToTranzila() {
    this.routers.navigate(['Pay', this.Total]);
 }
 AddQuantity(item: shoppingCart) {
      this.serverService.postAddQuantity(item);
      this.changePlaying();
       this.changePlaying(); 
}
 changePlaying() {
  __await (1000);
  this.ngZone.run(() => {
    this.serverService.getAllDBShoppingCart().subscribe((val) => {
      this.DBShoppingCart = val;
      for (var i = 0; i < this.DBShoppingCart.length; i++) {
        if (this.DBShoppingCart[i].SallePrice == 0)
          this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
        else
          this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;

      } 
       this.serverService.getNumProduct().subscribe(val => this.num = val);

    });
    this.serverService.getNumProduct().subscribe(val => this.num = val);

    this.serverService.getTotalPrice().subscribe(val => this.Total = val);
    if(this.IsMemberShip){
      if(this.Total>0){
        this.getDiscountTotal(this.Total);
        }
      }
  });
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
      this.DBShoppingCart.filter(product=>{
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
    this.DBShoppingCart= this.CART.contents;
    if(this.DBShoppingCart.length==1){
    for (var i = 0; i < this.DBShoppingCart.length; i++) {
      if (this.DBShoppingCart[i].SallePrice == 0){
      this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
        this.CART.contents.map(item=>{
          if(item.Id === i)
          this.CART.contents[i].Total = this.DBShoppingCart[i].Total;
        });  
        let _cart = JSON.stringify(this.CART.contents);
        localStorage.setItem(this.CART.KEY, _cart);
        if (this.MQuantity > 0) {
          if (this.LastQuantity == 0) this.num = this.num + this.Quantity;

          if (this.LastQuantity== this.Quantity) {
          this.num = this.num;
          }
          else
          this.num = this.num + this.MQuantity;
       }
        else {
          if (this.LastQuantity == 0) this.num = this.num + this.Quantity;

          if (this.LastQuantity == this.Quantity) {
            this.num = this.num;
          }
          else
          this.num = this.num + this.MQuantity;
       }
        if (this.MQuantity > 0) {
          if (this.LastQuantity == 0)
            this.Total = this.Total + (this.DBShoppingCart[i].PriceBook * this.MQuantity);

          if (this.LastQuantity == this.Quantity) {
            this.Total = this.Total
          }
          else
            //this.num = this.num + this.MQuantity;

          this.Total = this.Total + (this.DBShoppingCart[i].PriceBook * this.MQuantity);
        if(this.Total>0){
          this.getDiscountTotal(this.Total);
          }
       }
      else{
          this.Total = this.Total;
          if(this.Total==0)
        this.Total = this.Total + this.DBShoppingCart[i].Total;
        if(this.Total>0){
          this.getDiscountTotal(this.Total);
          }
      }
    }
    else{
      this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
      this.CART.contents.map(item=>{
        if(item.Id === i)
        this.CART.contents[i].Total = this.DBShoppingCart[i].Total;
      });  
      let _cart = JSON.stringify(this.CART.contents);
      localStorage.setItem(this.CART.KEY, _cart);
        if (this.MQuantity > 0) {
          if (this.num == 0) { this.num = this.Quantity; }
          else
          this.num = this.num + this.MQuantity;
       }
        else {
          if (this.num == 0) { this.num = this.Quantity; }
          else
        //this.num = this.num + this.DBShoppingCart[i].Quantity;
          this.num = this.num + this.MQuantity;
       }
        if (this.MQuantity > 0) {
          if (this.LastQuantity == 0)
            this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);

          if (this.LastQuantity == this.Quantity) {
            this.Total = this.Total
          }
          else
            //this.num = this.num + this.MQuantity;

            this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);

          //this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);
        if(this.Total>0){
          this.getDiscountTotal(this.Total);
          }
       }
       else {
          if (this.LastQuantity == 0)
            this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.Quantity);

          if (this.LastQuantity == this.Quantity) {
            this.Total = this.Total
          }
          else
            //this.num = this.num + this.MQuantity;

            this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);     
         //this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.Quantity);
        if(this.Total>0){
          this.getDiscountTotal(this.Total);
          }
      }
    }
  }
}
else{
  let i = this.DBShoppingCart.length-1; 
  if (this.DBShoppingCart[i].SallePrice == 0){
  this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
  }
  else{
  this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
  }
  this.CART.contents.map(item=>{
    if(item.Id === i)
    this.CART.contents[i].Total = this.DBShoppingCart[i].Total;
  });
  let _cart = JSON.stringify(this.CART.contents);
  localStorage.setItem(this.CART.KEY, _cart);
      if (this.MQuantity > 0) {
        if (this.LastQuantity == 0) this.num = this.num + this.Quantity;
        if (this.LastQuantity == this.Quantity) {
          this.num = this.num;
        }
        else
     this.num = this.num + this.MQuantity;
   }
      else {
        if (this.LastQuantity == 0) this.num = this.num + this.Quantity;

        if (this.LastQuantity == this.Quantity) {
          this.num = this.num ;
        }
        else
    //this.num = this.num + this.DBShoppingCart[i].Quantity;
     this.num = this.num + this.MQuantity;
   }
   if (this.DBShoppingCart[i].SallePrice == 0){
     if (this.MQuantity > 0) {
       this.Total = this.Total + (this.DBShoppingCart[i].PriceBook * this.MQuantity);
    if(this.Total>0){
      this.getDiscountTotal(this.Total);
      }
   }
   else {
       this.Total = this.Total + (this.DBShoppingCart[i].PriceBook * this.Quantity);
    if(this.Total>0){
      this.getDiscountTotal(this.Total);
      }
  }
  }
 else{
     if (this.MQuantity > 0) {
       if (this.LastQuantity == 0)
         this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);

       if (this.LastQuantity == this.Quantity) {
         this.Total = this.Total
       }
       else
         //this.num = this.num + this.MQuantity;

         this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);
       //this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);
    if(this.Total>0){
      this.getDiscountTotal(this.Total);
      }
   }
  else {
       this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.Quantity);
    if(this.Total>0){
      this.getDiscountTotal(this.Total);
      }
  }
 }
}

  if(this.DBShoppingCart.length==0){
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
      var len = this.CART.contents.length;
      if (this.CART.contents.length > 0) {
        this.IdGeneric = this.CART.contents[len - 1].Id + 1;
      }
      else
        this.IdGeneric = this.CART.contents.length;
      let obj = {
                Id: this.IdGeneric,
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
      if (item.IdBook === id) {
        this.LastQuantity = item.Quantity
        if (item.Quantity > 0) {
          this.MQuantity = this.Quantity - item.Quantity;
          if (this.MQuantity < 0) {
            this.MQuantity = this.MQuantity * -1;
          }
          item.Quantity = this.Quantity;
          //this.MQuantity = this.Quantity + item.Quantity;
          // item.Quantity = item.Quantity + this.Quantity;
        }
     
      else{
        item.Quantity = item.Quantity + this.Quantity;
      }}
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
getDiscountTotal(Total){
  let discount = Total * ( 20 / 100);
   this.TotalAfterDiscount =  Total - discount;
}
SendToSignIn(){
  this.routers.navigateByUrl("/UserPass/2");
}
isSignIn(){
  this.UserNameLogin = this.getCookie('UserName'); 
  if(this.UserNameLogin!=undefined){
    return true;
  }
  else{
    return false;
  }
}
}
