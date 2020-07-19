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
import { CookieService } from 'angular2-cookie';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild('namee') namee: ElementRef;
  @ViewChild('usernameemail') usernameemail: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('nameefirstinput') nameefirstinput: ElementRef;
  @ViewChild('nameelastinput') nameelastinput: ElementRef;
  @ViewChild('usernameemailinput') usernameemailinput: ElementRef;
  @ViewChild('addressinput') addressinput: ElementRef;
  @ViewChild('countryinput') countryinput: ElementRef;
  public DB: shoppingCart[];
  public user: User;
  public Total: number;
  public num: number;
  public Address: string;
  public Country: string[] = [];
  public selectedCountry: string;
  public UserNameLogin: string;
  public FirstName: string;
  public LastName: string;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;

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
  public currency:number = 2;
  public lang:string = "us";
  public itemToAddQunt1:any;
  public itemToRedQunt1:any;
  public emailvalidate:boolean=false;
  constructor(public cookieService: CookieService,private ngZone: NgZone, private cd: ChangeDetectorRef,public router: Router,private serverService: ServerService, private http: HttpClient) {
  this.Country = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan (Province of China)",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"];
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
       let  _contents = localStorage.getItem(this.CART.KEY);
        if(_contents){
            this.CART.contents = JSON.parse(_contents);
            this.DB= this.CART.contents;
            if(this.DB.length > 0){
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
      });
      this.serverService.getTotalPrice().subscribe(val => this.Total = val);
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
    this.UserNameLogin = this.getCookie('UserName');
    if(this.UserNameLogin){
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
    else  if(!this.UserNameLogin||this.UserNameLogin==null){
      this.FirstName = null;
        this.LastName = null;  
        this.FirstNameHebrew = null;
        this.LastNameHebrew = null; 
        this.selectedCountry = null;
        this.Address = null;
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

  NavigCart() {
    this.router.navigateByUrl("/ShoppingCart");
  }
  
  AddQuantity(item: shoppingCart) {
    if(this.getCookie('UserName')){
      this.UserNameLogin = (this.getCookie('UserName'));
      this.serverService.postAddQuantity(item)//.subscribe((events) => {
        this.changePlaying();
        this.changePlaying(); 
    }
    else{
      this.UserNameLogin=null;
      this.add(item)
    }
  }
  RemoveQuantity(item: shoppingCart) {
    if(this.getCookie('UserName')){
      this.UserNameLogin = (this.getCookie('UserName'));
    this.serverService.postRemoveQuantity(item)
    this.changePlaying();
    this.changePlaying();
    }
    else{
     this.remove(item.Id);
    }
  }
  deleteQuantity(item: shoppingCart) {
    if(this.getCookie('UserName')){
      this.UserNameLogin = (this.getCookie('UserName'));
      this.serverService.postdeleteQuantity(item);
    this.changePlaying();
    this.changePlaying();
  }
  else{
    this.UserNameLogin=null;
    this.reduce(item.Id)
  }
  }
  
async sync(act:string){
  let _cart = JSON.stringify(this.CART.contents);
  await localStorage.setItem(this.CART.KEY, _cart);
  this.DB = this.CART.contents;
  if(this.DB.length==1){
  for (var i = 0; i < this.DB.length; i++) {
    if (this.DB[i].SallePrice == 0){ 
    this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
    }
    else {
    this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;
    }
     if(act=='inc'){
      this.num = this.num + 1;
      this.Total = this.Total + this.DB[i].Total;
      }
      else  if(act=='red'){
        this.num = this.num - 1;
      this.Total = this.Total -  this.DB[i].Total;
      }
}
  }
else{
    if(act=='inc'){
      // console.log("this.itemToAddQunt1-inc",this.itemToAddQunt1)
      if(this.itemToAddQunt1){
        //let i = this.itemToAddQunt1.Id;
        if (this.itemToAddQunt1.SallePrice == 0){
          let i = this.itemToAddQunt1.Id;
        this.DB[i].Total = this.itemToAddQunt1.PriceBook * this.itemToAddQunt1.Quantity;
        this.Total = this.Total + this.itemToAddQunt1.PriceBook;
        //this.CART.contents =
         this.CART.contents.map(item=>{
          if(item.Id === i)
          this.CART.contents[i].Total = this.DB[i].Total;
        });
        // let _cart = JSON.parse( localStorage.getItem(this.CART.KEY));
        // //this.CART.contents =
        //  _cart.contents.map(item=>{
        //   if(item.Id === i)
        //   _cart.contents[i].Total = this.DB[i].Total;
        // });
       //  localStorage.setItem(this.CART.KEY,JSON.stringify( this.CART.contents[i]));
      }
        else{
          let i = this.itemToAddQunt1.Id;
          this.DB[i].Total = this.itemToAddQunt1.SallePrice * this.itemToAddQunt1.Quantity;
          this.Total = this.Total + this.itemToAddQunt1.SallePrice;
         // this.CART.contents = 
          this.CART.contents.map(item=>{
            if(item.Id === i)
            this.CART.contents[i].Total = this.DB[i].Total;
          });
        }
        this.num = this.num + 1;
    }
      }
      else  {
      if(act=='red'){
        if(this.itemToRedQunt1){
         // let i = this.itemToRedQunt1.Id;
          if (this.itemToRedQunt1.SallePrice == 0){
            let i;
            i = this.itemToRedQunt1.Id;
          this.DB[i].Total = this.itemToRedQunt1.PriceBook * this.itemToRedQunt1.Quantity;
          this.Total = this.Total - this.itemToRedQunt1.PriceBook;
         //  this.CART.contents =
          this.CART.contents.map(item=>{
            if(item.Id === i)
            this.CART.contents[i].Total = this.DB[i].Total;
          });
          }
          else{
            let i;
            i = this.itemToRedQunt1.Id;
            this.DB[i].Total = this.itemToRedQunt1.SallePrice * this.itemToRedQunt1.Quantity;
            this.Total = this.Total - this.itemToRedQunt1.SallePrice;
            // this.CART.contents = 
            this.CART.contents.map(item=>{
              if(item.Id === i)
              this.CART.contents[i].Total = this.DB[i].Total;
            });
          }
          this.num = this.num - 1;
      }
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
add(item,qty=1){
  //add a new item to the cart
  //check that it is not in the cart already
  if(this.find(item.IdBook)){
      this.increase(item.Id, qty);
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
          this.sync('inc');
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
      if(item.Id === id){
          item.Quantity = item.Quantity + qty;
          if(this.DB.length>1){
            this.itemToAddQunt1 = item;
            // console.log("this.itemToAddQunt1",this.itemToAddQunt1)
          }
        }
      return item;
  });
  //update localStorage
  this.sync('inc')
}
reduce(id, qty=1){
  //reduce the quantity of an item in the cart
  this.CART.contents = this.CART.contents.map(item=>{
      if(item.Id === id){
          item.Quantity = item.Quantity - qty;
          if(this.DB.length>1){
            this.itemToRedQunt1 = item;
          }
        }
        
      return item;
  });
  this.CART.contents.forEach(async item=>{
      if(item.Id === id && item.Quantity === 0)
          await this.remove(id);
  });
  //update localStorage
  this.sync('red')
}
remove(id){
  //remove an item entirely from CART.contents based on its id
  this.CART.contents = this.CART.contents.filter(item=>{
      if(item.Id !== id)
          return true;
  });
  //update localStorage
  this.sync('red')
}
  SendToTranzila() {
    this.serverService.setCurrency(this.currency);
    this.serverService.setLang(this.lang);
    this.serverService.setEmail(this.UserNameLogin);
    this.serverService.setTotal(this.Total);
    this.router.navigate(['Pay', this.Total]);
  }
  registrationGuest(){
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
    this.user.English = true;
    if (
      this.user.FirstNameEnglish != null &&
      this.user.LastNameEnglish != null &&
       this.user.Address != null &&
      this.user.selectedCountry != null &&
      this.user.UserName != null &&
      this.user.English != null

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
  checkout(){
    var EMAIL_REGEXP = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;
    if(
    this.FirstName != null && 
    this.LastName != null &&
    this.Address != null &&
    this.selectedCountry != null &&
    this.UserNameLogin != null 
      ){
        let user = this.getCookie('UserName');
    if(user!=undefined || user!=null){//if logined
    this.UserNameLogin = this.getCookie('UserName');
   // this.SendToTranzila();
    if(!this.UserNameLogin || this.UserNameLogin=='' && (this.UserNameLogin.length <= 5 || !EMAIL_REGEXP.test(this.UserNameLogin))){
      this.usernameemail.nativeElement.style.color = "red";
      this.usernameemailinput.nativeElement.style.borderBottom = "1px solid red";
      return this.emailvalidate = true;
    } 
    // else{//if not logined
    //  this.setCookie(this.UserNameLogin)
    //  this.showMessage=true;
    // }
    }

    if(this.UserNameLogin){
      if(this.UserNameLogin.length <= 5 || !EMAIL_REGEXP.test(this.UserNameLogin)){
        this.usernameemail.nativeElement.style.color = "#dc3545";
        this.usernameemailinput.nativeElement.style.borderBottom = "1px solid #dc3545";
        return this.emailvalidate = true;
      } 
       this.serverService.getUserNameExists(this.UserNameLogin).subscribe((val) => {
       let existUser;
     //  existUser = true;
         existUser = val;
      // console.log(val)
     
      if(existUser==1){//if not  registered
      this.registrationGuest();
             //add to all cart 
             let _contents = localStorage.getItem(this.CART.KEY);
             //  this.DB= this.CART.contents;
              for (var i = 0; i < this.DB.length; i++) {
               this.DB[i].UserName = this.UserNameLogin;
               console.log( this.DB[i])
               this.serverService.enterItemToCart(this.DB[i]).subscribe((res) => {
                 console.log(res)
               });
             }
           //   this.SendToTranzila();       
      }
      else{//if registered and not logined
       //add to all cart 
       let _contents = localStorage.getItem(this.CART.KEY);
      //  this.DB= this.CART.contents;
       for (var i = 0; i < this.DB.length; i++) {
        this.DB[i].UserName = this.UserNameLogin;
        console.log( this.DB[i])
        this.serverService.enterItemToCart(this.DB[i]).subscribe((res) => {
          console.log(res)
        });
      }

  //    this.SendToTranzila();
      }
     });
    }
    this.SendToTranzila();
    if(this.serverService.resNotifyTranzila){
   //   console.log("this.serverService.resNotifyTranzila",this.serverService.resNotifyTranzila)
    }
    //if tranzila return response true
    // if(this.serverService.resNotifyTranzila==000){}
    for (var i = 0; i < this.DB.length; i++) {
      this.DB[i].UserName = this.UserNameLogin;
      console.log( this.DB[i])
      let itemToDelete  =  this.DB[i];
      this.serverService.AddItemToCart(this.DB[i]).subscribe((res) => {
        if(res==1){
        //  console.log("this.DB[i]",itemToDelete)
         this.serverService.postRemoveQuantity(itemToDelete);
        }
        //console.log(res)
      });
    }
    }
  else {
    if( !this.FirstName || !this.LastName){
      this.namee.nativeElement.style.color = "#dc3545";
      this.nameefirstinput.nativeElement.style.borderBottom = "1px solid #dc3545";
      this.nameelastinput.nativeElement.style.borderBottom = "1px solid #dc3545";
    }else{
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
     if(!this.Address){
      this.address.nativeElement.style.color = "#dc3545";
      this.addressinput.nativeElement.style.borderBottom = "1px solid #dc3545";
     }else{
      this.address.nativeElement.style.color = "gray";
      this.addressinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
    }
      if(!this.selectedCountry){
       this.country.nativeElement.style.color = "#dc3545";
       this.countryinput.nativeElement.style.borderBottom = "1px solid #dc3545";
      }else{
        this.country.nativeElement.style.color = "gray";
        this.countryinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
      }
      if(!this.UserNameLogin){
        this.usernameemail.nativeElement.style.color = "#dc3545";
        this.usernameemailinput.nativeElement.style.borderBottom = "1px solid #dc3545";
      }else{
        this.usernameemail.nativeElement.style.color = "gray";
        this.usernameemailinput.nativeElement.style.borderBottom = "1px solid #c0bfbf";
      }
   // alert("All fields must be filled!");
  }

}
  SendToNew() {
    this.router.navigateByUrl("/new");

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
}
