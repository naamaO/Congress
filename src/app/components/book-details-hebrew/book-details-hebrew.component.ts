import { Component, OnInit, Input, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { shoppingCart } from 'src/classes/shoppingCart';
import { __await } from 'tslib';
import { RealExchangeService } from 'src/app/services/real-exchange.service';

@Component({
  selector: 'app-book-details-hebrew',
  templateUrl: './book-details-hebrew.component.html',
  styleUrls: ['./book-details-hebrew.component.css']
})
export class BookDetailsHebrewComponent implements OnInit {
  @ViewChild('CartTooltip') CartTooltip: ElementRef;
  @ViewChild('Top') Top: ElementRef;
  public LastQuantity: number = 0;
  public IdGeneric: number;
  public Total1: number;
  public Quantity: number = 1;
  public MQuantity: number = 0;
  public item2: shoppingCart;
  public UserNameLogin: string;
  public Id: number;
  private sub: any;
  public DetailsBook: book;

  public Total: number = 0;
  public TotalUSD: number = 0;
  public TotalILS: number = 0;

  public TotalAfterDiscount: number = 0;
  public TotalAfterDiscountUSD: number = 0;
  public TotalAfterDiscountILS: number = 0;

  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public num: number;
  public DB: shoppingCart[];

  public IsMemberShip: boolean = false;
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
    code: '1'
  }

  public CurrencyCode = 1;
  public enterItemToCart: boolean = true;

  constructor(private ngZone: NgZone, public cookieService: CookieService, private realExchangeService: RealExchangeService, public routers: Router, public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient) {
    var bookActualPrice, bookActualPriceUSD, bookActualPriceILS;
    this.Quantity = 1;
    //get list of shopping cart//if login
    if (this.getCookie('UserName')) {

      this.serverService.getAllDBShoppingCart().subscribe((resp) => {
        this.DB = resp;
        for (var i = 0; i < this.DB.length; i++) {
          if (this.DB[i].SallePrice == 0) {
            bookActualPrice = this.DB[i].PriceBook;
            bookActualPriceUSD = this.DB[i].PriceUSD;
            bookActualPriceILS = this.DB[i].PriceILS;
          }
          else {
            bookActualPrice = this.DB[i].SallePrice;
            bookActualPriceUSD = this.DB[i].SalePriceUSD;
            bookActualPriceILS = this.DB[i].SalePriceILS;
          }
          this.DB[i].Total = bookActualPrice * this.DB[i].Quantity;
          this.DB[i].TotalUSD = bookActualPriceUSD * this.DB[i].Quantity;
          this.DB[i].TotalILS = bookActualPriceILS * this.DB[i].Quantity;
        }
        this.DB.filter(product => {
          if (product.IdBook == this.Id) {
            this.Quantity = product.Quantity;
          }
        });
      },
        error => {
          console.log(error)
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
      });    //get list of all books
      // this.serverService.getAllDBFromServerHebrew().subscribe(val => this.DB = val);
      this.serverService.getNumProduct().subscribe(val => this.num = val);
    }
    else {
      if (!this.DB) {

        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(this.CART.KEY);
        if (_contents) {
          this.CART.contents = JSON.parse(_contents);
          this.DB = this.CART.contents;

          for (var i = 0; i < this.DB.length; i++) {
            if (this.DB[i].SallePrice == 0) {
              bookActualPrice = this.DB[i].PriceBook;
              bookActualPriceUSD = this.DB[i].PriceUSD;
              bookActualPriceILS = this.DB[i].PriceILS;
            }
            else {
              bookActualPrice = this.DB[i].SallePrice;
              bookActualPriceUSD = this.DB[i].SalePriceUSD;
              bookActualPriceILS = this.DB[i].SalePriceILS;
            }
            this.DB[i].Total = bookActualPrice * this.DB[i].Quantity;
            this.DB[i].TotalUSD = bookActualPriceUSD * this.DB[i].Quantity;
            this.DB[i].TotalILS = bookActualPriceILS * this.DB[i].Quantity;

            this.num = this.num + this.DB[i].Quantity;

             this.Total += this.DB[i].Total;
             this.TotalUSD += this.DB[i].TotalUSD;
             this.TotalILS += this.DB[i].TotalILS;

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

          

          this.Total = 0;
          this.TotalUSD = 0;
          this.TotalILS = 0;
        }
      }
    }
  }

  ngOnInit() {
    document.getElementById("Top").scrollIntoView();

    this.sub = this.router.params.subscribe(params => {
      this.Id = +params['Id']; // (+) converts string 'id' to a number
      this.serverService.DetailsHebrew(this.Id).subscribe((events) => {
        this.DetailsBook = events;
      });
    });
    this.UserNameLogin = this.getCookie('UserName');
    if (this.UserNameLogin) {
      //console.log(this.UserNameLogin)
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

      this.IsMemberShip = true;
    }

    if (this.DB) {
      this.DB.filter(product => {
        if (product.IdBook == this.Id) {
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
    this.item2.PriceILS = item.PriceILS;
    this.item2.PriceUSD = item.PriceUSD;
    this.item2.SalePriceILS = item.SalePriceILS;
    this.item2.SalePriceUSD = item.SalePriceUSD;
    //this.item2.TotalILS=item.

    if ((this.UserNameLogin != null) && (this.UserNameLogin != "")) {
      this.DB.filter(product => {
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
    this.item2.Currency = item.Currency;
    this.item2.PriceILS = item.PriceILS;
    this.item2.PriceUSD = item.PriceUSD;
    this.item2.SalePriceILS = item.SalePriceILS;
    this.item2.SalePriceUSD = item.SalePriceUSD;


    if ((this.UserNameLogin != null) && (this.UserNameLogin != "")) {
      this.DB.filter(product => {
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
  }
  async sync() {
    let _cart = JSON.stringify(this.CART.contents);
    await localStorage.setItem(this.CART.KEY, _cart);
    this.DB = this.CART.contents;
    if (this.DB.length == 1) {
      for (var i = 0; i < this.DB.length; i++) {

        if (this.DB[i].SallePrice == 0) {
          this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
          this.DB[i].TotalUSD = this.DB[i].TotalUSD * this.DB[i].Quantity;
          this.DB[i].TotalILS = this.DB[i].TotalILS * this.DB[i].Quantity;

          this.CART.contents.map(item => {
            if (item.Id === i) {
              this.CART.contents[i].Total = this.DB[i].Total;
              this.CART.contents[i].TotalUSD = this.DB[i].TotalUSD;
              this.CART.contents[i].TotalILS = this.DB[i].TotalILS;
            }
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
              this.num = this.num;
            }
            else
              this.num = this.num + this.MQuantity;
          }
          if (this.MQuantity > 0) {
            if (this.LastQuantity == 0) {
              this.Total += this.DB[i].PriceBook * this.MQuantity;
              this.TotalUSD += this.DB[i].PriceUSD * this.MQuantity;
              this.TotalILS += this.DB[i].PriceILS * this.MQuantity;
            }
            if (this.LastQuantity == this.Quantity) {
              this.Total = this.Total
            }
            else {
              //this.num = this.num + this.MQuantity;
              this.Total += this.DB[i].Total;
              this.TotalUSD += this.DB[i].TotalUSD;
              this.TotalILS += this.DB[i].TotalILS;
            }

            if (this.Total > 0) {
              this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
            }
          }
          else {
            if (this.LastQuantity == 0) {
              this.Total += this.DB[i].PriceBook * this.MQuantity;
              this.TotalUSD += this.DB[i].PriceUSD * this.MQuantity;
              this.TotalILS += this.DB[i].PriceILS * this.MQuantity;
            }

            if (this.LastQuantity == this.Quantity) {
              this.Total = this.Total;
              this.TotalUSD = this.TotalUSD;;
              this.TotalILS = this.TotalILS;
            }
            else {
              //this.num = this.num + this.MQuantity;
              this.Total += this.DB[i].Total;
              this.TotalUSD += this.DB[i].TotalUSD;
              this.TotalILS += this.DB[i].TotalILS;
            }
            //this.Total = this.Total + (!isDollar? this.DB[i].Total:this.realExchangeService.convertUSD_ILS(this.DB[i].Total));
            //this.Total = this.Total ;
            if (this.Total > 0) {
              this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
            }
          }
        }
        else {
          this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
          this.DB[i].TotalUSD = this.DB[i].SalePriceUSD * this.DB[i].Quantity;
          this.DB[i].TotalILS = this.DB[i].SalePriceILS * this.DB[i].Quantity;

          this.CART.contents.map(item => {
            if (item.Id === i) {
              this.CART.contents[i].Total = this.DB[i].Total;
              this.CART.contents[i].TotalUSD = this.DB[i].TotalUSD;
              this.CART.contents[i].TotalILS = this.DB[i].TotalILS;
            }
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
            if (this.LastQuantity == 0) {
              this.Total += this.DB[i].SallePrice * this.MQuantity;
              this.TotalUSD += this.DB[i].SalePriceUSD * this.MQuantity;
              this.TotalILS += this.DB[i].SalePriceILS * this.MQuantity;
            }

            if (this.LastQuantity == this.Quantity) {
              this.Total = this.Total;
              this.TotalUSD = this.TotalUSD;;
              this.TotalILS = this.TotalILS;
            }
            else
              //this.num = this.num + this.MQuantity;
              if (this.LastQuantity == 0) {
                this.Total += this.DB[i].SallePrice * this.Quantity;
                this.TotalUSD += this.DB[i].SalePriceUSD * this.Quantity;
                this.TotalILS += this.DB[i].SalePriceILS * this.Quantity;
              }

            if (this.LastQuantity == this.Quantity) {
              this.Total = this.Total;
              this.TotalUSD = this.TotalUSD;;
              this.TotalILS = this.TotalILS;
            }
            else
            //this.num = this.num + this.MQuantity;
            {
              this.Total += this.DB[i].SallePrice * this.MQuantity;
              this.TotalUSD += this.DB[i].SalePriceUSD * this.MQuantity;
              this.TotalILS += this.DB[i].SalePriceILS * this.MQuantity;
            }

            if (this.Total > 0) {
              this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
            }
          }
          else {
            this.Total += this.DB[i].SallePrice * this.Quantity;
            this.TotalUSD += this.DB[i].SalePriceUSD * this.Quantity;
            this.TotalILS += this.DB[i].SalePriceILS * this.Quantity;

            if (this.Total > 0) {
              this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
            }
          }
        }
      }
    }
    else {
      let i = this.DB.length - 1;
      if (this.DB[i].SallePrice == 0) {
        this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
        this.DB[i].TotalUSD = this.DB[i].TotalUSD * this.DB[i].Quantity;
        this.DB[i].TotalILS = this.DB[i].TotalILS * this.DB[i].Quantity;
      }
      else {
        this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
        this.DB[i].TotalUSD = this.DB[i].SalePriceUSD * this.DB[i].Quantity;
        this.DB[i].TotalILS = this.DB[i].SalePriceILS * this.DB[i].Quantity;
      }
      this.CART.contents.map(item => {
        if (item.Id === i) {
          this.CART.contents[i].Total = this.DB[i].Total;
          this.CART.contents[i].TotalUSD = this.DB[i].TotalUSD;
          this.CART.contents[i].TotalILS = this.DB[i].TotalILS;
        }
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
          this.num = this.num;
        }
        else
          //this.num = this.num + this.DBShoppingCart[i].Quantity;
          this.num = this.num + this.MQuantity;
      }
      if (this.DB[i].SallePrice == 0) {
        if (this.MQuantity > 0) {
          this.Total += this.DB[i].Total;
          this.TotalUSD += this.DB[i].TotalUSD;
          this.TotalILS += this.DB[i].TotalILS;

          if (this.Total > 0) {
            this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
          }
        }
        else {
          this.Total += this.DB[i].PriceBook * this.Quantity;
          this.TotalUSD += this.DB[i].PriceUSD * this.Quantity;
          this.TotalILS += this.DB[i].PriceILS * this.Quantity;

          if (this.Total > 0) {
            this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
          }
        }
      }
      else {
        if (this.MQuantity > 0) {
          if (this.LastQuantity == 0) {
            this.Total += this.DB[i].SallePrice * this.Quantity;
            this.TotalUSD += this.DB[i].SalePriceUSD * this.Quantity;
            this.TotalILS += this.DB[i].SalePriceILS * this.Quantity;
          }

          if (this.LastQuantity == this.Quantity) {
            this.Total = this.Total
          }
          else {
            this.Total += this.DB[i].SallePrice * this.MQuantity;
            this.TotalUSD += this.DB[i].SalePriceUSD * this.MQuantity;
            this.TotalILS += this.DB[i].SalePriceILS * this.MQuantity;
          }
          //this.num = this.num + this.MQuantity;

          //this.Total = this.Total + (this.DBShoppingCart[i].SallePrice * this.MQuantity);
          if (this.Total > 0) {
            this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
          }
        }
        else {
          this.Total += this.DB[i].SallePrice * this.Quantity;
          this.TotalUSD += this.DB[i].SalePriceUSD * this.Quantity;
          this.TotalILS += this.DB[i].SalePriceILS * this.Quantity;

          if (this.Total > 0) {
            this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
          }
        }
      }
    }

    if (this.DB.length == 0) {
      this.num = 0;
    }
    this.NUM.num = this.num;
    let _num = JSON.stringify(this.NUM.num);
    localStorage.setItem(this.NUM.KEY, _num);

    this.TOTAL.total = this.Total;
    this.TOTALUSD.total = this.TotalUSD;
    this.TOTALILS.total = this.TotalILS;

    let _total = JSON.stringify(this.TOTAL.total);
    let _totalUSD = JSON.stringify(this.TOTALUSD.total);
    let _totalILS = JSON.stringify(this.TOTALILS.total);

    localStorage.setItem(this.TOTAL.KEY, _total);
    localStorage.setItem(this.TOTALUSD.KEY, _totalUSD);
    localStorage.setItem(this.TOTALILS.KEY, _totalILS);
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
  NavigCart1() {
    this.routers.navigateByUrl("/ShoppingCartHebrew");

  }
  add(id) {
    //add a new item to the cart
    //check that it is not in the cart already
    if (this.find(id)) {
      this.increase(id, 1);
    }
    else {
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
        TotalUSD: this.item2.TotalUSD,
        TotalILS: this.item2.TotalILS,
        Currency: this.item2.Currency,
        PriceUSD:this.item2.PriceUSD,
        PriceILS:this.item2.PriceILS,
        SalePriceUSD:this.item2.SalePriceUSD,
        SalePriceILS:this.item2.SalePriceILS,
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
  increase(id, qty) {
    //increase the quantity of an item in the cart
    this.CART.contents = this.CART.contents.map(item => {
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

        else {
          item.Quantity = item.Quantity + this.Quantity;
        }
      }
      return item;
    });
    //update localStorage
    this.sync()
  }
  reduce(id, qty = 1) {
    //reduce the quantity of an item in the cart
    this.CART.contents = this.CART.contents.map(item => {
      if (item.Id === id)
        item.Quantity = item.Quantity - qty;
      return item;
    });
    this.CART.contents.forEach(async item => {
      if (item.Id === id && item.Quantity === 0)
        await this.remove(id);
    });
    //update localStorage
    this.sync()
  }
  remove(id) {
    //remove an item entirely from CART.contents based on its id
    this.CART.contents = this.CART.contents.filter(item => {
      if (item.Id !== id)
        return true;
    });
    //update localStorage
    this.sync()
  }
  changePlaying() {
    __await(1000);
    this.ngZone.run(() => {
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DB = val;
        for (var i = 0; i < this.DB.length; i++) {
          if (this.DB[i].SallePrice == 0) {
            this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
            this.DB[i].TotalUSD = this.DB[i].TotalUSD * this.DB[i].Quantity;
            this.DB[i].TotalILS = this.DB[i].TotalILS * this.DB[i].Quantity;
          }
          else {
            this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
            this.DB[i].TotalUSD = this.DB[i].SalePriceUSD * this.DB[i].Quantity;
            this.DB[i].TotalILS = this.DB[i].SalePriceILS * this.DB[i].Quantity;
          }
        }
        this.serverService.getNumProduct().subscribe(val => this.num = val);

      });
      this.serverService.getTotalPrice().subscribe((values) => {
        
        this.Total = values['Total'];
        this.TotalUSD = values['TotalUSD'];
        this.TotalILS = values['TotalILS'];
        
        if (this.IsMemberShip) {
          if (this.Total > 0) {
            this.getDiscountTotal(this.Total, this.TotalUSD, this.TotalILS);
          }
        }
      });
    });
    this.serverService.getNumProduct().subscribe(val => this.num = val);
  }
  deleteQuantity(item: shoppingCart) {

    if (this.Quantity !== 0) {
      this.Quantity = this.Quantity - 1;
      //console.log("item:",item,"this.Quantity:",this.Quantity)
      this.serverService.postdeleteQuantity(item);

      this.changePlaying();
      // this.changePlaying();
    }
    else {
      this.Quantity = 0;
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

  SendToTranzila(item: shoppingCart) {
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
  SendToSignIn() {
    this.routers.navigateByUrl("/UserPass/22");
  }

  getDiscountTotal(Total, TotalUSD, TotalILS) {
    let discount = Total * (20 / 100);
    this.TotalAfterDiscount = Total - discount;
    this.TotalAfterDiscountUSD = 0.8 * TotalUSD;
    this.TotalAfterDiscountILS = 0.8 * TotalILS;
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
}
