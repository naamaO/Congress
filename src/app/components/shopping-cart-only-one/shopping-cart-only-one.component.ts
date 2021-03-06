import { Component, OnInit, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
import { CookieService } from 'ngx-cookie';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-shopping-cart-only-one',
  templateUrl: './shopping-cart-only-one.component.html',
  styleUrls: ['./shopping-cart-only-one.component.css']
})
export class ShoppingCartOnlyOneComponent implements OnInit {


  @ViewChild('namee') namee: ElementRef;
  @ViewChild('usernameemail') usernameemail: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('nameefirstinput') nameefirstinput: ElementRef;
  @ViewChild('nameelastinput') nameelastinput: ElementRef;
  @ViewChild('usernameemailinput') usernameemailinput: ElementRef;
  @ViewChild('addressinput') addressinput: ElementRef;
  @ViewChild('countryinput') countryinput: ElementRef;

  @ViewChild('namee2') namee2: ElementRef;
  @ViewChild('usernameemail2') usernameemail2: ElementRef;
  @ViewChild('address2') address2: ElementRef;
  @ViewChild('country2') country2: ElementRef;
  @ViewChild('nameefirstinput2') nameefirstinput2: ElementRef;
  @ViewChild('nameelastinput2') nameelastinput2: ElementRef;
  @ViewChild('usernameemailinput2') usernameemailinput2: ElementRef;
  @ViewChild('addressinput2') addressinput2: ElementRef;
  @ViewChild('countryinput2') countryinput2: ElementRef;

  @ViewChild('yes') yes: ElementRef;
  @ViewChild('no') no: ElementRef;

  public DB: shoppingCart[];
  public user: User;
  public Total: number = 0;
  public TotalAfterDiscount: number = 0;
  public num: number;
  public Address: string;
  public Country: string[] = [];
  public selectedCountry: string;
  public UserNameLogin: string;
  public FirstName: string;
  public LastName: string;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public isYourAddress: string;

  public FirstName2: string;
  public LastName2: string;
  public Address2: string;
  public selectedCountry2: string;
  public Country2: string[] = [];

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
  public USERNAME = {
    KEY: 'UserName',
    UserName: null
  }
  public currency: number = 2;
  public lang: string = "us";
  public ilang: string = "ENG";
  public itemToAddQunt1: any;
  public itemToRedQunt1: any;
  public emailvalidate: boolean = false;
  public rem: boolean = false;
  public IsMemberShip: boolean = true;
  public DBUndefined: number = 0;
  constructor(public cookieService: CookieService, private ngZone: NgZone, private cd: ChangeDetectorRef, public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.Country = this.serverService.Country;
    this.Country2 = this.serverService.Country;

    //if(this.getCookie('UserName')) {   
    this.serverService.getAllDBShoppingCart().subscribe((resp) => {
      this.DB = resp;
      if (this.DB.length != 0) {
        this.serverService.getNumProduct().subscribe(val => this.num = val);
      }
    });
    this.serverService.getAllDBShoppingCart().subscribe((resp) => {
      this.DB = resp;
      if (this.DB.length != 0) {
        this.serverService.getTotalPrice().subscribe((val) => {
          this.Total = val
          this.UserNameLogin = this.getCookie('UserName');
          if (this.UserNameLogin) {
            this.serverService.getUserDetails().subscribe((events) => {
              if (events.MemberShip > -1)
                this.IsMemberShip = true;
              if (this.IsMemberShip) {
                // this.serverService.setTotal();
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
            })
          }
        });
      }
    });
    this.serverService.getAllDBShoppingCart().subscribe((resp) => {
      this.DB = resp;
      if (!this.DB || this.DB == undefined || this.DB.length == 0) {
        //this.DBUndefined = 1;
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(this.CART.KEY);
        if (_contents) {
          this.CART.contents = JSON.parse(_contents);
          this.DB = this.CART.contents;
          if (this.DB.length > 0) {
            for (var i = 0; i < this.DB.length; i++) {
              if (this.DB[i].SallePrice == 0) {
                this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
                this.num = this.num + this.DB[i].Quantity;
                this.Total = this.Total + this.DB[i].Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
              else {
                this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
                this.num = this.num + this.DB[i].Quantity;
                this.Total = this.Total + this.DB[i].Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
            }
          }
        } else {
          //dummy test data
          this.CART.contents = [];
          let _cart = JSON.stringify(this.CART.contents);
          localStorage.setItem(this.CART.KEY, _cart);
          // CART.sync();
          this.DB = this.CART.contents;
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
        if (parseInt(_total) > 0) {
          this.TOTAL.total = parseInt(_total);
          this.Total = parseInt(_total);
          if (this.Total > 0) {
            this.getDiscountTotal(this.Total);
          }
          else {
            this.TotalAfterDiscount = 0;
          }
        }
        else {
          this.TOTAL.total = 0;
          let _total = JSON.stringify(this.TOTAL.total);
          localStorage.setItem(this.TOTAL.KEY, _total);
          this.Total = 0;
          if (this.Total == 0) {
            this.TotalAfterDiscount = 0;
          }
        }
        //this.num = JSON.stringify(localStorage.getItem(this.NUM.KEY));
      }
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
    //if (this.DBUndefined == 0) {

    //}
    //get list of all books
    // this.serverService.getAllDBFromServerHebrew().subscribe(val => this.DB = val);
    //if (this.DBUndefined == 0) {

    //}
    //}



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
      this.serverService.getTotalPrice().subscribe((val) => {
        this.Total = val
        if (this.IsMemberShip) {
          if (this.Total > 0) {
            this.getDiscountTotal(this.Total);
          }
          else {
            this.TotalAfterDiscount = 0;
          }
        }
      });

    });
    this.serverService.getNumProduct().subscribe(val => this.num = val);

  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  setCookie(UaerName: string) {
    this.cookieService.put('UserName', UaerName);
  }

  ngOnInit() {
    if (this.getCookie('UserName') != undefined) {
      this.UserNameLogin = this.getCookie('UserName');
    }
    //this.UserNameLogin = this.getCookie('UserName');
    if (this.UserNameLogin) {
      this.serverService.getUserDetails().subscribe((events) => {
        this.FirstName = events.FirstNameEnglish;
        this.LastName = events.LastNameEnglish;
        this.FirstNameHebrew = events.FirstNameHebrew;
        this.LastNameHebrew = events.LastNameHebrew;
        this.selectedCountry = events.selectedCountry;
        this.Address = events.Address;
        // console.log("user buyer:",this.FirstName, this.LastName,this.FirstNameHebrew, this.LastNameHebrew,this.selectedCountry)     
      });
    }
    else if (!this.UserNameLogin || this.UserNameLogin == null) {
      this.FirstName = null;
      this.LastName = null;
      this.FirstNameHebrew = null;
      this.LastNameHebrew = null;
      this.selectedCountry = null;
      this.Address = null;
      let _num = localStorage.getItem(this.NUM.KEY);
      if (_num) {
        this.NUM.num = JSON.parse(_num);
      }
      let _total = localStorage.getItem(this.TOTAL.KEY);
      if (_total) {
        this.TOTAL.total = JSON.parse(_total);
      }
      this.IsMemberShip = false;
    }
  }

  NavigCart() {
    this.router.navigateByUrl("/ShoppingCart");
  }

  AddQuantity(item: shoppingCart) {
    if (this.getCookie('UserName')) {
      this.UserNameLogin = (this.getCookie('UserName'));
      this.serverService.postAddQuantity(item)//.subscribe((events) => {
      this.changePlaying();
      this.changePlaying();
    }
    else {
      this.UserNameLogin = null;
      this.add(item)
    }
  }
  RemoveQuantity(item: shoppingCart) {
    if (this.getCookie('UserName')) {
      this.UserNameLogin = (this.getCookie('UserName'));
      this.serverService.postRemoveQuantity(item)
      this.changePlaying();
      this.changePlaying();
    }
    else {
      this.remove(item.Id);
      this.sync('red')
    }
  }
  deleteQuantity(item: shoppingCart) {
    if (this.getCookie('UserName')) {
      this.UserNameLogin = (this.getCookie('UserName'));
      this.serverService.postdeleteQuantity(item);
      this.changePlaying();
      this.changePlaying();
    }
    else {
      this.UserNameLogin = null;
      this.reduce(item.Id)
    }
  }

  async sync(act: string) {
    let _cart = JSON.stringify(this.CART.contents);
    await localStorage.setItem(this.CART.KEY, _cart);
    this.DB = this.CART.contents;
    if (this.DB.length == 1) {
      for (var i = 0; i < this.DB.length; i++) {
        if (this.DB[i].SallePrice == 0) {
          this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
          this.CART.contents.map(item => {
            if (item.Id === i)
              this.CART.contents[i].Total = this.DB[i].Total;
          });
          let _cart = JSON.stringify(this.CART.contents);
          localStorage.setItem(this.CART.KEY, _cart);
        }
        else {
          this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
          this.CART.contents.map(item => {
            if (item.Id === i)
              this.CART.contents[i].Total = this.DB[i].Total;
          });
          let _cart = JSON.stringify(this.CART.contents);
          localStorage.setItem(this.CART.KEY, _cart);
        }
        if (act == 'inc') {
          //  if (this.itemToAddQunt1){
          this.num = this.num + 1;
          if (this.DB[i].SallePrice == 0) {
            this.Total = this.Total + this.DB[i].PriceBook;
            if (this.Total > 0) {
              this.getDiscountTotal(this.Total);
            }
            else {
              this.TotalAfterDiscount = 0;
            }
            this.CART.contents.map(item => {
              if (item.Id === i)
                this.CART.contents[i].Total = this.DB[i].Total;
            });
            let _cart = JSON.stringify(this.CART.contents);
            localStorage.setItem(this.CART.KEY, _cart);
          }
          else {
            this.Total = this.Total + this.DB[i].SallePrice;
            if (this.Total > 0) {
              this.getDiscountTotal(this.Total);
            }
            else {
              this.TotalAfterDiscount = 0;
            }
            this.CART.contents.map(item => {
              if (item.Id === i)
                this.CART.contents[i].Total = this.DB[i].Total;
            });
            let _cart = JSON.stringify(this.CART.contents);
            localStorage.setItem(this.CART.KEY, _cart);
          }
          // this.Total = this.Total + this.DB[i].Total;
          // }
        }
        else if (act == 'red') {
          if (this.itemToRedQunt1) {
            if (!this.rem) {
              // if(this.DB[i].Id==this.itemToRedQunt1.Id){
              this.num = this.num - 1;
              // }  
              if (this.itemToRedQunt1.SallePrice == 0) {
                this.Total = this.Total - this.DB[i].PriceBook;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
              else {
                this.Total = this.Total - this.DB[i].SallePrice;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
            }
            else {//remove the item
              //if(this.DB[i].Id==this.itemToRedQunt1.Id){
              if (this.itemToRedQunt1.Quantity != 0) {
                this.num = this.num - this.itemToRedQunt1.Quantity;
              }
              else {
                this.num = this.num - 1;
              }
              this.Total = this.Total - this.itemToRedQunt1.Total;
              if (this.Total > 0) {
                this.getDiscountTotal(this.Total);
              }
              else {
                this.TotalAfterDiscount = 0;
              }
            }
          }
          else {
            if (!this.rem) {
              this.num = this.num - 1;
              if (this.DB[i].SallePrice == 0) {
                this.Total = this.Total - this.DB[i].PriceBook;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
              else {
                this.Total = this.Total - this.DB[i].SallePrice;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
            }
            else {//remove the item
              if (this.itemToRedQunt1.Quantity != 0) {
                this.num = this.num - this.DB[i].Quantity;
              }
              else {
                this.num = this.num - 1;
              }
              if (this.DB[i].SallePrice == 0) {
                this.Total = this.Total - this.DB[i].Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
              else {
                this.Total = this.Total - this.DB[i].Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
              }
            }
          }
        }
      }
    }
    else {
      if (act == 'inc') {
        // console.log("this.itemToAddQunt1-inc",this.itemToAddQunt1)
        if (this.itemToAddQunt1) {
          //let i = this.itemToAddQunt1.Id;
          if (this.itemToAddQunt1.SallePrice == 0) {
            let d = this.itemToAddQunt1.Id;
            for (var k = 0; k < this.DB.length; k++) {
              if (this.DB[k].Id == this.itemToAddQunt1.Id)
                this.DB[k].Total = this.itemToAddQunt1.PriceBook * this.itemToAddQunt1.Quantity;
            }
            //this.DB.map(item=>{
            //  if(item.Id === d)
            //  this.DB[d].Total = this.itemToAddQunt1.PriceBook * this.itemToAddQunt1.Quantity;
            //});
            this.Total = this.Total + this.itemToAddQunt1.PriceBook;
            if (this.Total > 0) {
              this.getDiscountTotal(this.Total);
            }
            else {
              this.TotalAfterDiscount = 0;
            }
            for (var k = 0; k < this.DB.length; k++) {
              if (this.DB[k].Id == this.itemToAddQunt1.Id)
                this.CART.contents[k].Total = this.DB[k].Total;
            }
            //  this.CART.contents.map(item=>{
            //  if(item.Id === i)
            //  this.CART.contents[i].Total = this.DB[i].Total;
            //});
            let _cart = JSON.stringify(this.CART.contents);
            localStorage.setItem(this.CART.KEY, _cart);
            // let _cart = JSON.parse( localStorage.getItem(this.CART.KEY));
            // //this.CART.contents =
            //  _cart.contents.map(item=>{
            //   if(item.Id === i)
            //   _cart.contents[i].Total = this.DB[i].Total;
            // });
            //  localStorage.setItem(this.CART.KEY,JSON.stringify( this.CART.contents[i]));
          }
          else {
            let d = this.itemToAddQunt1.Id;
            //this.DB.map(item=>{
            //  if (item.Id === d)
            for (var k = 0; k < this.DB.length; k++) {
              if (this.DB[k].Id == this.itemToAddQunt1.Id)
                this.DB[k].Total = this.itemToAddQunt1.SallePrice * this.itemToAddQunt1.Quantity;
            }
            //});
            this.Total = this.Total + this.itemToAddQunt1.SallePrice;
            if (this.Total > 0) {
              this.getDiscountTotal(this.Total);
            }
            else {
              this.TotalAfterDiscount = 0;
            }
            for (var k = 0; k < this.DB.length; k++) {
              if (this.DB[k].Id == this.itemToAddQunt1.Id)
                this.CART.contents[k].Total = this.DB[k].Total;
            }
            //  this.CART.contents.map(item=>{
            //  if(item.Id === i)
            //  this.CART.contents[i].Total = this.DB[i].Total;
            //});
            let _cart = JSON.stringify(this.CART.contents);
            localStorage.setItem(this.CART.KEY, _cart);
          }
          this.num = this.num + 1;
        }
      }
      else {
        if (act == 'red') {
          if (this.itemToRedQunt1) {
            // let i = this.itemToRedQunt1.Id;
            if (!this.rem) {
              if (this.itemToRedQunt1.SallePrice == 0) {
                let c;
                c = this.itemToRedQunt1.Id;
                if (this.DB.length > 0) {
                  for (var k = 0; k < this.DB.length; k++) {
                    if (this.DB[k].Id == this.itemToAddQunt1.Id)
                      this.DB[k].Total = this.itemToAddQunt1.PriceBook * this.itemToAddQunt1.Quantity;
                  }
                  //this.DB.map(item=>{
                  //  if(item.Id === c)
                  //  this.DB[c].Total = this.itemToRedQunt1.PriceBook * this.itemToRedQunt1.Quantity;
                  //});
                }
                this.Total = this.Total - this.itemToRedQunt1.PriceBook;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
                if (this.DB.length > 0) {
                  for (var k = 0; k < this.DB.length; k++) {
                    if (this.DB[k].Id == this.itemToAddQunt1.Id)
                      this.CART.contents[k].Total = this.DB[k].Total;
                  }
                  //this.CART.contents.map(item=>{
                  //  let id = this.itemToRedQunt1.Id
                  //  if(item.Id === id)
                  //  this.CART.contents[id].Total = this.DB[id].Total;
                  //});
                  let _cart = JSON.stringify(this.CART.contents);
                  localStorage.setItem(this.CART.KEY, _cart);
                }
              }
              else {
                let c;
                c = this.itemToRedQunt1.Id;
                if (this.DB.length > 0) {
                  for (var k = 0; k < this.DB.length; k++) {
                    if (this.DB[k].Id == this.itemToAddQunt1.Id)
                      this.DB[k].Total = this.itemToAddQunt1.SallePrice * this.itemToAddQunt1.Quantity;
                  }
                  //this.DB.map(item=>{
                  //  if(item.Id === c)
                  //  this.DB[c].Total = this.itemToRedQunt1.SallePrice * this.itemToRedQunt1.Quantity;
                  //});
                }
                this.Total = this.Total - this.itemToRedQunt1.SallePrice;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
                if (this.DB.length > 0) {
                  //this.CART.contents.map(item=>{
                  //  let id;
                  //  id = this.itemToRedQunt1.Id;
                  //  if(item.Id === id)
                  //  this.CART.contents[id].Total = this.DB[id].Total;
                  //   });
                  for (var k = 0; k < this.DB.length; k++) {
                    if (this.DB[k].Id == this.itemToAddQunt1.Id)
                      this.CART.contents[k].Total = this.DB[k].Total;
                  }
                  let _cart = JSON.stringify(this.CART.contents);
                  localStorage.setItem(this.CART.KEY, _cart);
                }
              }
              this.num = this.num - 1;
            }
            else {//this.rem ==true;
              if (this.itemToRedQunt1.Quantity != 0) {
                this.Total = this.Total - this.itemToRedQunt1.Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
                else {
                  this.TotalAfterDiscount = 0;
                }
                this.num = this.num - this.itemToRedQunt1.Quantity;
              }
              else {
                if (this.itemToRedQunt1.SallePrice == 0) {
                  this.Total = this.Total - this.itemToRedQunt1.PriceBook;
                  if (this.Total > 0) {
                    this.getDiscountTotal(this.Total);
                  }
                  else {
                    this.TotalAfterDiscount = 0;
                  }
                }
                else {
                  this.Total = this.Total - this.itemToRedQunt1.SallePrice;
                  if (this.Total > 0) {
                    this.getDiscountTotal(this.Total);
                  }
                  else {
                    this.TotalAfterDiscount = 0;
                  }
                }
                this.num = this.num - 1;
              }
            }
          }
        }
      }
    }
    if (this.DB.length == 0) {
      this.num = 0;
      this.Total = 0;
      this.TotalAfterDiscount = 0;
    }
    this.NUM.num = this.num;
    let _num = JSON.stringify(this.NUM.num);
    localStorage.setItem(this.NUM.KEY, _num);

    this.TOTAL.total = this.Total;
    let _total = JSON.stringify(this.TOTAL.total);
    localStorage.setItem(this.TOTAL.KEY, _total);
  }
  find(id) {
    //find an item in the cart by it's id
    let match = this.CART.contents.filter(item => {
      if (item.IdBook == id)
        return true;
    });
    if (match && match[0])
      return match[0];
  }
  add(item, qty = 1) {
    //add a new item to the cart
    //check that it is not in the cart already
    if (this.find(item.IdBook)) {
      this.increase(item.Id, qty);
    }
    else {
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
        IdBook: item.IdBook,
        NameBook: item.NameBook,
        PriceBook: item.PriceBook,
        ImageBook: item.ImageBook,
        Quantity: item.Quantity,
        SallePrice: item.SallePrice,
        Total: item.Total
      };
      this.CART.contents.push(obj);
      //update localStorage
      this.rem = false;
      this.sync('inc');
      // }
      // else{
      //product id does not exist in products data
      //  console.error('Invalid Product');
      // }
    }
  }
  increase(id, qty) {
    //increase the quantity of an item in the cart
    this.CART.contents = this.CART.contents.map(item => {
      if (item.Id === id) {
        item.Quantity = item.Quantity + qty;
        if (this.DB.length > 1) {
          this.itemToAddQunt1 = item;
          // console.log("this.itemToAddQunt1",this.itemToAddQunt1)
        }
      }
      this.rem = false;
      return item;
    });
    //update localStorage
    this.sync('inc')
  }
  reduce(id, qty = 1) {
    //reduce the quantity of an item in the cart
    this.CART.contents = this.CART.contents.map(item => {
      if (item.Id === id) {
        item.Quantity = item.Quantity - qty;
        if (this.DB.length > 1) {
          this.itemToRedQunt1 = item;
        }
      }
      this.rem = false;
      return item;
    });
    this.CART.contents.forEach(async item => {
      if (item.Id === id && item.Quantity === 0) {
        this.rem = true;
        await this.remove(id);
      }
    });
    //if((this.DB[id].Quantity>1) && (this.DB.length>1) ){
    let _cart = JSON.stringify(this.CART.contents);
    localStorage.setItem(this.CART.KEY, _cart);
    //         }
    //update localStorage
    this.sync('red')
  }
  remove(id) {
    //remove an item entirely from CART.contents based on its id
    this.CART.contents = this.CART.contents.filter(item => {
      if (item.Id !== id) {
        return true;
      }
      else {
        this.itemToRedQunt1 = item;
      }
    });
    this.rem = true;
    //update localStorage
    //this.sync('red')
  }

  isSignIn() {
    if (this.getCookie('UserName')) {
      this.UserNameLogin = this.getCookie('UserName');
    }
    if (this.UserNameLogin != undefined) {
      return true;
    }
    else {
      return false;
    }
  }

  setCookieRout(Rout: number) {
    this.cookieService.put('RoutTranzilaSuccessJewishStudies', Rout.toString());
  }
  setCookieLang(lang: string) {
    this.cookieService.put('Lang', lang);
  }
  setCookieTotal(total: number) {
    this.cookieService.put('Total', total.toString());
  }
  setCookieCurrency(currency: number) {
    this.cookieService.put('Currency', currency.toString());
  }
  setCookieIlang(ilang: string) {
    this.cookieService.put('ilang', ilang);
  }
  setCookieAddress(address: string) {
    this.cookieService.put('address', address);
  }
  setCookieAddress2(address2: string) {
    this.cookieService.put('address2', address2);
  }
  setCookieContact(contact: string) {
    this.cookieService.put('contact', contact);
  }
  setCookieContact2(contact2: string) {
    this.cookieService.put('contact2', contact2);
  }
  setCookieIsYourAddress(isYourAddress: string) {
    this.cookieService.put('isYourAddress', isYourAddress);
  }
  SendToTranzila() {
    this.CART.contents = this.DB;
    let _cart = JSON.stringify(this.CART.contents);
    localStorage.setItem(this.CART.KEY, _cart);
    // this.setCookieCart(this.DB);
    this.setCookieCurrency(this.currency);
    this.setCookieLang(this.lang);
    this.setCookieIlang(this.ilang);
    if (this.getCookie('UserName')) { this.setCookieTotal(this.TotalAfterDiscount); }
    else { this.setCookieTotal(this.Total); }
    //if(this.TotalAfterDiscount>0){
    //  this.setCookieTotal(this.TotalAfterDiscount);
    //}
    //else{
    //  this.setCookieTotal(this.Total);
    //}
    let address: any;
    let country: any
    country = this.selectedCountry;
    let detailsAddress: any;
    detailsAddress = this.Address
    address = country.trimEnd() + " " + detailsAddress.trimEnd();
    this.setCookieAddress(address);
    this.UserNameLogin = localStorage.getItem(this.USERNAME.KEY);
    this.serverService.getName(this.UserNameLogin).subscribe((val) => {
      let first: any;
      let last: any
      //first = val.FirstName;
      //last = val.LastName;
      first = this.FirstName;
      last = this.LastName;
      let contactName: any;
      contactName = first.trimEnd() + " " + last.trimEnd();
      this.setCookieContact(contactName);
    });
    this.serverService.setEmail();
    this.setCookieRout(2);
    this.router.navigate(['Pay']);
  }
  registrationGuest() {
    //check validation
    //this.hasLowerCase(this.Password);
    // this.setCookie(this.Email);
    this.user = new User();
    this.user.FirstNameEnglish = this.FirstName;
    this.user.LastNameEnglish = this.LastName
    this.user.Address = this.Address;
    this.user.selectedCountry = this.selectedCountry;
    this.user.Email = this.UserNameLogin;
    this.user.UserName = this.UserNameLogin;
    this.user.Language = 'English';
    if (
      this.user.FirstNameEnglish != null &&
      this.user.LastNameEnglish != null &&
      this.user.Address != null &&
      this.user.selectedCountry != null &&
      this.user.UserName != null &&
      this.user.Language != null

    ) {
      this.serverService.RegistrationNewGuest(this.user)
      //  if (this.Rout == 1) {
      //   this.router.navigateByUrl("/RegistrationOneEnglish");

      // }
      // if (this.Rout == 2) {
      //   this.router.navigateByUrl("/Thank3");

      // } if (this.Rout == 3) {
      //   this.router.navigateByUrl("/new");
      // }
      // this.ShowMessage = true;
      //if(newMemberSaved==true)!!!!!!!!!!!!!!!!!!!!!!
      //this.router.navigate(['Pay', this.Total]).then(result => {  window.open(link, '_blank'); })
      //  this.router.navigate(['Pay', this.Total]);
    }
    // else {
    //    alert("All fields must be filled!");
    //  }
  }
  checkout() {
    // alert(this.UserNameLogin);
    if (this.DB.length == 0) {
      alert('the cart is empty please choose a book');
    }
    else {
      var EMAIL_REGEXP = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;
      if (this.isYourAddress == 'no') {
        if (
          this.FirstName2 == null ||
          this.LastName2 == null ||
          this.Address2 == null ||
          this.selectedCountry2 == null
        ) {
          if (!this.FirstName2 || !this.LastName2) {
            this.namee2.nativeElement.style.color = "#dc3545";
            this.nameefirstinput2.nativeElement.style.borderBottom = "1px solid #dc3545";
            this.nameelastinput2.nativeElement.style.borderBottom = "1px solid #dc3545";
          } else {
            this.namee2.nativeElement.style.color = "gray";
            this.nameefirstinput2.nativeElement.style.borderBottom = "1px solid #c0bfbf";
            this.nameelastinput2.nativeElement.style.borderBottom = "1px solid #c0bfbf";
          }
          // if(!this.LastName2){
          //   this.namee2.nativeElement.style.color = "red";
          //   this.nameelastinput2.nativeElement.style.borderBottom = "1px solid red";
          // }else{
          //   this.namee2.nativeElement.style.color = "gray";
          //   this.nameelastinput2.nativeElement.style.borderBottom = "1px solid #c0bfbf";
          // }
          if (!this.Address2) {
            this.address2.nativeElement.style.color = "#dc3545";
            this.addressinput2.nativeElement.style.borderBottom = "1px solid #dc3545";
          } else {
            this.address2.nativeElement.style.color = "gray";
            this.addressinput2.nativeElement.style.borderBottom = "1px solid #c0bfbf";
          }
          if (!this.selectedCountry2) {
            this.country2.nativeElement.style.color = "#dc3545";
            this.countryinput2.nativeElement.style.borderBottom = "1px solid #dc3545";
          } else {
            this.country2.nativeElement.style.color = "gray";
            this.countryinput2.nativeElement.style.borderBottom = "1px solid #c0bfbf";
          }
          return
        }
        else {
          this.setCookieIsYourAddress(this.isYourAddress);
          let address2: any;
          let country2: any
          country2 = this.selectedCountry2;
          let detailsAddress2: any;
          detailsAddress2 = this.Address2
          address2 = country2.trimEnd() + " " + detailsAddress2.trimEnd();
          this.setCookieAddress2(address2);
          let first2: any;
          let last2: any
          first2 = this.FirstName2;
          last2 = this.LastName2;
          let contactName2: any;
          contactName2 = first2.trimEnd() + " " + last2.trimEnd();
          this.setCookieContact2(contactName2);
        }
      }
      if (
        this.FirstName != null &&
        this.LastName != null &&
        this.Address != null &&
        this.selectedCountry != null &&
        this.UserNameLogin != null
      ) {
        let user = this.getCookie('UserName');
        this.setCookieIsYourAddress(this.isYourAddress);
        if ((user != undefined || user != null)) {//if logined

          this.UserNameLogin = this.getCookie('UserName');
          // this.SendToTranzila();
          if (!localStorage.getItem(this.USERNAME.KEY) && (!this.UserNameLogin || this.UserNameLogin == '' && (this.UserNameLogin.length <= 5 || !EMAIL_REGEXP.test(this.UserNameLogin)))) {
            this.usernameemail.nativeElement.style.color = "red";
            this.usernameemailinput.nativeElement.style.borderBottom = "1px solid red";
            return this.emailvalidate = true;
          }
          // else{//if not logined
          //  this.setCookie(this.UserNameLogin)
          //  this.showMessage=true;
          // }
        }

        if (this.UserNameLogin) {
          if (this.UserNameLogin.length <= 5 || !EMAIL_REGEXP.test(this.UserNameLogin.trim())) {
            this.usernameemail.nativeElement.style.color = "#dc3545";
            this.usernameemailinput.nativeElement.style.borderBottom = "1px solid #dc3545";
            return this.emailvalidate = true;
          }
          this.USERNAME.UserName = this.UserNameLogin;
          let _username = this.USERNAME.UserName;
          localStorage.setItem(this.USERNAME.KEY, _username);
          this.serverService.getUserNameExists(this.UserNameLogin).subscribe((val) => {
            let existUser;
            existUser = val;
            // console.log(val)

            if (existUser == 1) {//if not  registered
              this.registrationGuest();
            }
            //add to all cart
            let _contents = localStorage.getItem(this.CART.KEY);
            if (_contents) {
              this.CART.contents = JSON.parse(_contents);
              this.DB = this.CART.contents;
              //let _contents = localStorage.getItem(this.CART.KEY);
              //  this.DB= this.CART.contents;
              for (var i = 0; i < this.DB.length; i++) {
                this.DB[i].UserName = this.UserNameLogin;
                //  console.log( this.DB[i])
                this.serverService.enterItemToCart(this.DB[i]).subscribe((res) => {
                  //  console.log(res)
                });
              }
            }
          });
          //}
        }
        this.SendToTranzila();


      }
      else {
        if (!this.FirstName || !this.LastName) {
          this.namee.nativeElement.style.color = "#dc3545";
          this.nameefirstinput.nativeElement.style.borderBottom = "1px solid #dc3545";
          this.nameelastinput.nativeElement.style.borderBottom = "1px solid #dc3545";
        } else {
          this.namee.nativeElement.style.color = "gray";
          this.nameefirstinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
          this.nameelastinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
        }
        // if(!this.LastName){
        //   this.namee.nativeElement.style.color = "red";
        //   this.nameelastinput.nativeElement.style.borderBottom = "1px solid red";
        // }else{
        //   this.namee.nativeElement.style.color = "gray";
        //   this.nameelastinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
        // }
        if (!this.Address) {
          this.address.nativeElement.style.color = "#dc3545";
          this.addressinput.nativeElement.style.borderBottom = "1px solid #dc3545";
        } else {
          this.address.nativeElement.style.color = "gray";
          this.addressinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
        }
        if (!this.selectedCountry) {
          this.country.nativeElement.style.color = "#dc3545";
          this.countryinput.nativeElement.style.borderBottom = "1px solid #dc3545";
        } else {
          this.country.nativeElement.style.color = "gray";
          this.countryinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
        }
        if (!this.UserNameLogin) {
          this.usernameemail.nativeElement.style.color = "#dc3545";
          this.usernameemailinput.nativeElement.style.borderBottom = "1px solid #dc3545";
        }
        else {
          this.usernameemail.nativeElement.style.color = "gray";
          this.usernameemailinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
        }
      }
    }
  }
  getDiscountTotal(Total) {
    let discount = Total * (20 / 100);
    this.TotalAfterDiscount = Total - discount;
  }

  onChangeShippingAddress(isYourAddress) {
    if (isYourAddress == 'yes') {
      console.log("isYourAddress", isYourAddress)
      this.isYourAddress = 'yes';
      this.no.nativeElement.checked = false;
    }
    else if (isYourAddress == 'no') {
      console.log("isYourAddress", isYourAddress)
      this.isYourAddress = 'no';
      this.yes.nativeElement.checked = false;
    }
  }

  SendToNew() {
    this.router.navigateByUrl("/new");

  }
  BackToNew() {
    this.router.navigateByUrl("/new");

  }
  SendToSignIn() {
    this.router.navigateByUrl("/UserPass/222");
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


  focusnamee2() {
    this.namee2.nativeElement.style.color = "#27b5e5";
  }
  unfocusnamee2() {
    this.namee2.nativeElement.style.color = "gray";
  }
  focuscountry2() {
    this.namee2.nativeElement.style.color = "#27b5e5";
  }
  unfocuscountry2() {
    this.namee2.nativeElement.style.color = "gray";
  }
  focusaddress2() {
    this.namee2.nativeElement.style.color = "#27b5e5";
  }
  unfocusaddress2() {
    this.namee2.nativeElement.style.color = "gray";
  }
  focususernameemail2() {
    this.namee2.nativeElement.style.color = "#27b5e5";
  }
  unfocususernameemail2() {
    this.namee2.nativeElement.style.color = "gray";
  }
  focusName() {
    this.namee.nativeElement.style.color = "#27b5e5";
  }
  unfocusName() {
    this.namee.nativeElement.style.color = "gray";
  }
  unfocusEmailHe() {
    this.usernameemail.nativeElement.style.color = "gray";
  }
  focusEmailHe() {
    this.usernameemail.nativeElement.style.color = "#27b5e5";
  }
  focusAddressCountry() {
    this.address.nativeElement.style.color = "#27b5e5";
  }
  unfocusAddressCountry() {
    this.address.nativeElement.style.color = "gray";
  }
  focusName2() {
    this.namee2.nativeElement.style.color = "#27b5e5";
  }
  unfocusName2() {
    this.namee2.nativeElement.style.color = "gray";
  }
  focusAddress2() {
    this.address2.nativeElement.style.color = "#27b5e5";
  }
  unfocusAddress2() {
    this.address2.nativeElement.style.color = "gray";
  }
  focuscontry2() {
    this.country2.nativeElement.style.color = "#27b5e5";

  }
  unfocuscontry1() {
    this.country.nativeElement.style.color = "gray";
  }
  focuscontry1() {
    this.country.nativeElement.style.color = "#27b5e5";

  }
  unfocuscontry2() {
    this.country2.nativeElement.style.color = "gray";
  }


}
