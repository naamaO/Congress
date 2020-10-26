import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core'
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ChangeDetectorRef } from '@angular/core';
import { __await } from 'tslib';
import { shoppingCart } from 'src/classes/shoppingCart';
import { group } from '@angular/animations';
import { HostListener } from "@angular/core";
import { Proposals } from '../../../classes/Proposals';
import { Name } from 'src/classes/Name';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/classes/User';
import { MONKEY_PATCH_KEY_NAME } from '@angular/core/src/render3/interfaces/context';

@Component({
  selector: 'app-information-hebrew-from-store',
  templateUrl: './information-hebrew-from-store.component.html',
  styleUrls: ['./information-hebrew-from-store.component.css']
})
export class InformationHebrewFromStoreComponent implements OnInit {


  @ViewChild('DivRow') DivRow: ElementRef;
  @ViewChild('CartTooltip') CartTooltip: ElementRef;
  @ViewChild('arr1') arr1: ElementRef;
  @ViewChild('arr2') arr2: ElementRef;
  @ViewChild('arr3') arr3: ElementRef;
  @ViewChild("testInput") testInput;
  @ViewChild('english') english: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('telephone') telephone: ElementRef;
  @ViewChild('Id') Id: ElementRef;
  @ViewChild('lastnameh') lastnameh: ElementRef;
  @ViewChild('lastnamee') lastnamee: ElementRef;
  @ViewChild('addressin') addressin: ElementRef;
  @ViewChild('telephonenin') telephonein: ElementRef;
  @ViewChild('Idn') Idin: ElementRef;
  @ViewChild('lastnamehni') lastnamehin: ElementRef;
  @ViewChild('lastnameein') lastnameein: ElementRef;
  @ViewChild('hebrew') hebrew: ElementRef;
  @ViewChild('abs') abs: ElementRef;
  @ViewChild('lang') lang: ElementRef;
  @ViewChild('div') div: ElementRef;
  @ViewChild('subdiv') subdiv: ElementRef;
  @ViewChild('academic') academic: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('emailin') emailin: ElementRef;
  @ViewChild('nameh') nameh: ElementRef;
  @ViewChild('namee') namee: ElementRef;
  @ViewChild('namehin') namehin: ElementRef;
  @ViewChild('nameein') nameein: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('key') key: ElementRef;
  @ViewChild('coun') coun: ElementRef;
  @ViewChild('counin') counin: ElementRef;
  @ViewChild('ti') ti: ElementRef;
  @ViewChild('tiin') tiin: ElementRef;
  @ViewChild('biog') biog: ElementRef;
  @ViewChild('membershipspan') membershipspan: ElementRef;
  @ViewChild('languagespan') languagespan: ElementRef;
  @ViewChild('languageHebrew') languageHebrew: ElementRef;
  @ViewChild('languageEnglish') languageEnglish: ElementRef;
  @ViewChild('Top') Top: ElementRef;
  private sub: any;
  public Rout: number;
  public newUser: any;

  public OldUser: any;
  public user: User;
  // public FirstNameEnglish: string;
  // public LastNameEnglish: string;
  public currency: number = 2;
  public langg: string = "us";
  public ilang: string = "ENG";
  userFormGroup: FormGroup;
  public angForm: FormGroup;
  pattern: string | RegExp
  public Show2Proposals: boolean;
  public showTwo: boolean;
  public Email: string;
  public Name2: string;
  public Prop: Proposals;
  public SaveDraft: boolean;
  public ArrDivision: string[];
  public ArrSubDivision: string[];
  public ShowSub: boolean;
  public ArrLanguage: string[] = ['English', 'עברית'];
  public UserName: string;
  public Division: string;
  public SubDivision: string;
  public TitleEnglish: string;
  public TitleHebrew: string;
  public Proposal: string;
  // public Language: string;
  public Keywords: string;
  public SessionName: string;
  public FirstName: string;
  public LastName: string;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public LoginUserName: string;
  public Title: string;
  public selectedCountry: string;
  public Address: string;
  public ID: string;
  public City: string;
  public Street: string;
  public NumberHome: string;
  public Country: string[] = [];
  public ArrTitle: string[] = ['Prof', 'Dr', 'Other'];
  public NumberPhone1: string;
  public showLikeProp: boolean = false;
  public Bio: string;
  public PasportNumber: string;
  public Hebrew: boolean;
  public English: boolean;
  public Password: string;
  public Students: boolean;
  public WithoutStudemt: boolean;
  public EAJS: boolean;
  public AJS: boolean;
  public ArrMembershipTypes = [];
  public Total: number;
  public membershipType: number;
  public Language: string;
  public PostCode: number;
  public CARTMEMBERSHIP = {
    KEY: 'ShoppingCart',
    contents: []
  };
  public UserToRegistration = {
    KEY: 'UserToRegistration',
    contents: new User()
  };

  public screenHeight: number;
  public screenWidth: number;
  public UserNameLogin: string;
  public ShowBlue1: boolean = true;
  public ShowBlue2: boolean = false;
  public ShowBlue3: boolean = false;
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
  public TotalAfterDiscount: number = 0;
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
  cd: any;

  constructor(fb: FormBuilder, public route: ActivatedRoute, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.OldUser = new User();
    this.OldUser = this.getCookie2('UserNewMemberAccount');
    if (this.OldUser != undefined) {
      this.Title = this.OldUser.selectedTitle;
      this.FirstName = this.OldUser.FirstNameEnglish;
      this.LastName = this.OldUser.LastNameEnglish;
      this.FirstNameHebrew = this.OldUser.FirstNameHebrew;
      this.LastNameHebrew = this.OldUser.LastNameHebrew;
      this.LoginUserName = this.OldUser.Email;
      this.PasportNumber = this.OldUser.PostCode;
      this.Address = this.OldUser.Address;
      this.NumberPhone1 = this.OldUser.NumberPhone1;
      if (this.OldUser.Langugae == "Hebrew") {
        if (typeof this.languageHebrew !== 'undefined')
          this.languageHebrew.nativeElement.checked = true;
      } else {
        if (typeof this.languageEnglish !== 'undefined')
          this.languageEnglish.nativeElement.checked = true;
      }
      this.Bio = this.OldUser.Bio;
      this.selectedCountry = this.OldUser.selectedCountry;
    }
    this.Country = serverService.Country;
    this.ArrMembershipTypes = [
      {
        membershipType: 'Annual Membership',
        price: 1,
        tooltipText: 'Regular membership for one calendar year',
        selected: null
      }, {
        membershipType: 'Student/Retiree Membership',
        price: 40,
        tooltipText: 'Membership for students or retirees with no research fund for one calendar year',
        selected: null
      }, {
        membershipType: 'Joint Membership',
        price: 105,
        tooltipText: 'Membership for couples for one calendar year',
        selected: null
      }, {
        membershipType: 'Joint Student/Retiree Membership',
        price: 70,
        tooltipText: 'Membership for student or retiree couples without research fund for one calendar year',
        selected: null
      }, {
        membershipType: 'Lifetime Membership',
        price: 1300,
        tooltipText: 'Membership for life',
        selected: null
      }, {
        membershipType: 'Institutional Membership',
        price: 265,
        tooltipText: 'Membership for Institutions for one calendar year',
        selected: null
      }
    ]

    //__await(500);
    //  this.serverService.DivisionEnglish().subscribe((events) => {
    //  this.ArrDivision = events;
    //  this.ShowSub = true;
    //});

    // this.serverService.selectDraft().subscribe((events) => {
    //   this.Division = events.Division;
    //   this.SubDivision = events.SubDivision;

    //   if (this.SubDivision == 'Ldino') {
    //     this.ArrLanguage = ['עברית','English','Ladino']
    //   }
    //   if (this.SubDivision == 'Yiddish') {
    //     this.ArrLanguage = ['עברית', 'English', 'Yiddish']
    //   } if (this.SubDivision == 'Latin American Jewry Section') {
    //     this.ArrLanguage = ['עברית', 'English', 'Português','Español']
    //   }
    //   this.TitleEnglish = events.TitleEnglish;
    //   this.TitleHebrew = events.TitleHebrew;
    //   this.Proposal = events.Proposal;
    //   this.Language = events.Language;
    //   this.Keywords = events.Keywords;
    //   this.SessionName = events.SessionName;
    //if((events.Division !=null)||(events.Division=='')){
    //   if (events.Division.charAt(0) == '0') {
    //     this.showLikeProp = true;
    //     this.Division = this.Division.substr(1);
    //   }
    //  }
    // });

    // this.LoginUserName = (this.getCookie('UserName'));
    // this.serverService.getName().subscribe((events) => {
    //   this.FirstName = events.FirstName;
    //   this.LastName = events.LastName;
    //   this.FirstNameHebrew = events.FirstNameHebrew;
    //   this.LastNameHebrew = events.LastNameHebrew;
    //   this.Title = events.Title;
    // });



    // this.serverService.getAllDBFromServer().subscribe(val => this.DB = val);
    //get list of shopping cart//if login
    if (this.getCookie('UserName')) {
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DBShoppingCart = val;
        for (var i = 0; i < this.DBShoppingCart.length; i++) {
          if (this.DBShoppingCart[i].SallePrice == 0)
            this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
          else
            this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
        }
      });
      this.serverService.getTotalPrice().subscribe((val) => {
        this.Total = val
        this.UserNameLogin = this.getCookie('UserName');
        if (this.UserNameLogin) {
          this.serverService.getUserDetails().subscribe((events) => {
            this.FirstName = events.FirstNameEnglish;
            this.LastName = events.LastNameEnglish;
            if (events.MemberShip > -1)
              this.IsMemberShip = true;
            if (this.IsMemberShip) {
              this.serverService.setTotal();
              if (this.Total > 0) {
                this.getDiscountTotal(this.Total);
              }
            }
          })
        }
      });
      //get list of all books
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
          if (this.DBShoppingCart.length > 0) {
            for (var i = 0; i < this.DBShoppingCart.length; i++) {
              if (this.DBShoppingCart[i].SallePrice == 0) {
                this.DBShoppingCart[i].Total = this.DBShoppingCart[i].PriceBook * this.DBShoppingCart[i].Quantity;
                this.num = this.num + this.DBShoppingCart[i].Quantity;
                this.Total = this.Total + this.DBShoppingCart[i].Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
                }
              }
              else {
                this.DBShoppingCart[i].Total = this.DBShoppingCart[i].SallePrice * this.DBShoppingCart[i].Quantity;
                this.num = this.num + this.DBShoppingCart[i].Quantity;
                this.Total = this.Total + this.DBShoppingCart[i].Total;
                if (this.Total > 0) {
                  this.getDiscountTotal(this.Total);
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
        if (parseInt(_total) > 0) {
          this.TOTAL.total = parseInt(_total);
          this.Total = parseInt(_total);
          if (this.Total > 0) {
            this.getDiscountTotal(this.Total);
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
      }
    }


    this.sub = this.route.params.subscribe(params => {
      this.Rout = +params['Rout']; // (+) converts string 'id' to a number

    });
  }
  getCookie2(key: string) {
    return this.cookieService.getObject(key);
  }
  setCookieFirstNameHebrew(name: string) {
    this.cookieService.put('FirstNameHebrew', name);
  } setCookieLastNameHebrew(name: string) {
    this.cookieService.put('LastNameHebrew', name);
  } setCookieFirstNameEnglish(name: string) {
    this.cookieService.put('FirstNameEnglish', name);
  } setCookieLastNameEnglish(name: string) {
    this.cookieService.put('LastNameEnglish', name);
  } setCookieBio(name: string) {
    this.cookieService.put('Bio', name);
  } setCookieNumPhone1(name: string) {
    this.cookieService.put('NumPhone1', name);
  } setCookieAddressUserNew(name: string) {
    this.cookieService.put('AddressUserNew', name);
  } setCookieCountryUserNew(name: string) {
    this.cookieService.put('CountryUserNew', name);
  } setCookieLanguageUserNew(name: string) {
    this.cookieService.put('LanguageUserNew', name);
  } setCookieMemberShipUserNew(name: string) {
    this.cookieService.put('MemberShipUserNew', name);
  } setCookieTitleUserNew(name: string) {
    this.cookieService.put('TitleUserNew', name);
  }
  setCookieNewUserToSendToTranzila(name: User) {
    this.cookieService.putObject('NewUserToSendToTranzila', name);
  }
  setCookieIlang(ilang: string) {
    this.cookieService.put('ilang', ilang);
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
  setCookieAddress(address: string) {
    this.cookieService.put('address', address);
  }
  setCookieContact(contact: string) {
    this.cookieService.put('contact', contact);
  }

  setCookieUser(User: User) {
    debugger;
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    this.cookieService.putObject('UserNewMemberAccount', User);
    //this.cookieService.putObject('UserNewMemberAccount', User, new CookieOptions({
    //  expires,
    //  path: '/'
    //}));
  }
  //SendToTranzila() {
  //  //let _cart = JSON.stringify(this.CARTMEMBERSHIP.contents);
  //  //localStorage.setItem(this.CARTMEMBERSHIP.KEY, _cart);
  //  //this.setCookieCurrency(this.currency);
  //  //this.setCookieLang(this.langg);
  //  //this.setCookieTotal(this.Total);
  //  //// this.serverService.setCurrency(this.currency);
  //  ////this.serverService.setLang(this.langg);
  //  //this.LoginUserName = this.getCookie('UserName');
  //  //this.serverService.setEmail(this.LoginUserName);
  //  //// this.serverService.setTotal(this.Total);
  //  //this.setCookieRout(1);
  //  //this.router.navigate(['Pay']);
  //} ‏



  //SendToTranzila() {
  //  let _cart = JSON.stringify(this.CARTMEMBERSHIP.contents);
  //  localStorage.setItem(this.CARTMEMBERSHIP.KEY, _cart);
  //  this.setCookieCurrency(this.currency);
  //  this.setCookieLang(this.langg);
  //  this.setCookieIlang(this.ilang);
  //  this.setCookieTotal(this.Total);
  //  let address: any;
  //  let country: any
  //  country = this.selectedCountry;
  //  let detailsAddress: any;
  //  detailsAddress = this.Address
  //  address = country.trimEnd() + " " + detailsAddress.trimRight();
  //  this.setCookieAddress(address)
  //  this.LoginUserName = this.getCookie('UserName');
  //  this.serverService.getName(this.LoginUserName).subscribe((val) => {
  //    let first: any;
  //    let last: any;
  //    first = val.FirstName;
  //    last = val.LastName;
  //    if (first == null) first = " ";
  //    if (last == null) last = " ";
  //    let contactName: any;
  //    contactName = first.trimEnd() + " " + last.trimEnd();
  //    this.setCookieContact(contactName);
  //    this.serverService.setEmail();
  //    //this.cookieService.remove('RoutTranzilaSuccessJewishStudies');
  //    const expires = new Date();
  //    expires.setHours(expires.getHours() + 1);
  //    this.cookieService.put('RoutTranzilaSuccessJewishStudies', '1', {
  //      expires,
  //      path: '/'
  //    });
  //    this.setCookieRoutNewMember(1);
  //  });
  //  debugger;
  //  this.serverService.setEmail();
  //  // this.cookieService.put('RoutTranzilaSuccessJewishStudies', '1');
  //  //this.setCookieRout('1');

  //  this.setCookieRoutNewMember(1);
  //  this.router.navigate(['Pay']);
  //}

  onMemberTypeChange(membershipTypeChanged) {
    this.membershipspan.nativeElement.style.color = "gray";
    this.CARTMEMBERSHIP.contents = [];
    let obj;
    this.membershipType = membershipTypeChanged;
    if (membershipTypeChanged == 0) {
      obj = { product_name: this.ArrMembershipTypes[0].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[0].price }
      console.log("this.ArrMembershipTypes[0].price", this.ArrMembershipTypes[0].price)
      this.Total = this.ArrMembershipTypes[0].price;
    }
    else if (membershipTypeChanged == 1) {
      obj = { product_name: this.ArrMembershipTypes[1].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[1].price }

      console.log("this.ArrMembershipTypes[1].price", this.ArrMembershipTypes[1].price)
      this.Total = this.ArrMembershipTypes[1].price;
    }
    else if (membershipTypeChanged == 2) {
      obj = { product_name: this.ArrMembershipTypes[2].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[2].price }

      console.log("this.ArrMembershipTypes[2].price", this.ArrMembershipTypes[2].price)
      this.Total = this.ArrMembershipTypes[2].price;
    }
    else if (membershipTypeChanged == 3) {
      obj = { product_name: this.ArrMembershipTypes[3].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[3].price }

      console.log("this.ArrMembershipTypes[3].price", this.ArrMembershipTypes[3].price)
      this.Total = this.ArrMembershipTypes[3].price;
    }
    else if (membershipTypeChanged == 4) {
      obj = { product_name: this.ArrMembershipTypes[4].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[4].price }

      console.log("this.ArrMembershipTypes[4].price", this.ArrMembershipTypes[4].price)
      this.Total = this.ArrMembershipTypes[4].price;
    }
    else if (membershipTypeChanged == 5) {
      obj = { product_name: this.ArrMembershipTypes[5].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[5].price }

      console.log("this.ArrMembershipTypes[5].price", this.ArrMembershipTypes[5].price)
      this.Total = this.ArrMembershipTypes[5].price;
    }
    this.CARTMEMBERSHIP.contents[0] = obj;

    console.log("membershipTypeChanged", membershipTypeChanged)
  }
  //dothis!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  onLanguageChange(Language) {
    this.languagespan.nativeElement.style.color = "gray";
    if (Language == 'English') {
      console.log("Language", Language)
      this.Language = 'English';
    }
    else if (Language == 'Hebrew') {
      console.log("Language", Language)
      this.Language = 'Hebrew';
    }
  }
  // renew(){
  //   this.router.navigate(['Pay', this.Total]);
  // console.log("renew")
  // }

  // become(){
  //   this.router.navigate(['Pay', this.Total]);
  //   console.log("become")

  // }


  ngAfterViewInit() {
    // this.testInput.nativeElement.focus();
  }
  //getCookie(key: string) {
  //  return this.cookieService.get(key);
  //}
  changeStyle(event: any) {
    event.target.classList.remove('fill-btn-blue')

    event.target.classList.add('over')

  }
  changeStyleOut(event: any) {

    event.target.classList.remove('over')
    event.target.classList.add('fill-btn-blue')

  }
  setCookie(UaerName: string) {
    //alert("hh");
    this.cookieService.put('UserName', UaerName);
  }
  setCookieRout(Rout: string) {
    this.cookieService.put('RoutTranzilaSuccessJewishStudies', Rout);
  }
  setCookieRoutNewMember(Rout: number) {
    this.cookieService.put('setCookieRoutNewMember', Rout.toString());
  }

  //ngOnInit() {
  //  document.getElementById("Top").scrollIntoView();

  //  this.Email = this.getCookie('UserName');
  //  this.UserName = this.Email;
  //  this.Rout = parseInt(this.getCookie('Rout'));
  //  this.Password = this.getCookie('Password');

  //  //   this.Rout = urlParams['Rout'];
  //  //   //alert(this.Email)
  //  if (this.Email == "''") {
  //    this.Email = "";
  //  }
  //  // this.route.params.forEach((urlParams) => {
  //  //   this.Email = urlParams['User'];
  //  //   this.Rout = urlParams['Rout'];
  //  //   //alert(this.Email)
  //  //   if (this.Email == "''") {
  //  //     this.Email = "";
  //  //   }
  //  // });
  //  //this.angForm = new FormGroup({
  //  //  name: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/) )})

  //  // this.LoginUserName = (this.getCookie('UserName'));
  //  // this.serverService.getName().subscribe((events) => {
  //  //   this.FirstName = events.FirstName;
  //  //   this.LastName = events.LastName;
  //  // });
  //}
  selectDivision(div: string) {
    this.serverService.SubDivisionEnglish(div).subscribe((events) => {

      this.ArrSubDivision = events;
      this.setCookie(div);
    });


  }
  selectSubDivision(subDiv: string) {
    this.serverService.GetLanguageEnglish(subDiv).subscribe((events) => {

      this.ArrLanguage = events;
    });
  }

  selectlang(lan: string) {
  }
  TitleEnglishP(event) {
  }
  changeProp(element, maxvalue) {
    // var q = element.Proposal.split(/[\s]+/).length;
    var q = element.Proposal.split(" ");

    if (q.length > maxvalue) {
      var r = q.length - maxvalue;
      alert("You can enter no more than " + maxvalue + " words");
      // alert(" you have input "+q.length+" words into the "+
      // "text area box you just completed. It can return no more than "+
      // maxvalue+" words to be processed. Please abbreviate "+
      // "your text by at least "+r+" words");
      return false;
    }
  }
  OpenSecondProposal() {
    //this.serverService.enterSecondDraft();
    this.router.navigateByUrl("/CongressRegistrationSecondEnglish");

  }
  RegistrationUser() {
    console.log("become")
    //check validation
    //this.hasLowerCase(this.Password);
    this.setCookie(this.Email);
    this.user = new User();
    this.user.MemberShip = this.membershipType;
    //this.setCookieMemberShipUserNew(String(this.membershipType));
    this.user.FirstNameEnglish = this.FirstName;
    //this.setCookieFirstNameEnglish(this.FirstName);
    this.user.LastNameEnglish = this.LastName;
    //this.setCookieLastNameEnglish(this.LastName);
    this.user.FirstNameHebrew = this.FirstNameHebrew;
    //this.setCookieFirstNameHebrew(this.FirstNameHebrew);
    this.user.LastNameHebrew = this.LastNameHebrew;
    // this.setCookieLastNameHebrew(this.LastNameHebrew);
    this.user.Address = this.Address;
    // this.setCookieAddressUserNew(this.Address);
    // this.user.City = this.City;
    // this.user.Street = this.Street;
    // this.user.NumberHome = this.NumberHome;
    //this.user.Address = this.Address;
    this.user.City = this.City;
    this.user.Street = this.Street;
    this.user.NumberHome = this.NumberHome;
    // this.user.PasportNumber =  this.PasportNumber;

    this.user.NumberPhone1 = this.NumberPhone1;
    // this.setCookieNumPhone1(this.NumberPhone1);

    // this.user.NumberPhone2 = this.NumberPhone2;
    this.user.NumberPhone2 = "";
    this.user.selectedTitle = this.Title;
    // this.setCookieTitleUserNew(this.Title);

    // this.user.selectedTitle = this.Title;
    this.user.selectedCountry = this.selectedCountry;
    this.setCookieCountryUserNew(this.selectedCountry);

    this.user.PostCode = this.PasportNumber;
    //this.user.PostCode = "";
    this.user.Email = this.LoginUserName;
    this.user.Language = this.Language;
    // this.setCookieLanguageUserNew(this.Language);

    // this.user.Bio = this.Bio;
    // this.user.Students = this.Students;
    // this.user.WithoutStudemt = this.WithoutStudemt;
    // this.user.EAJS = this.EAJS;
    // this.user.AJS = this.AJS;
    this.user.Bio = this.Bio;
    //this.setCookieBio(this.Bio);

    this.user.Students = true;
    this.user.WithoutStudemt = false;
    this.user.EAJS = true;
    this.user.AJS = true;
    this.user.Hebrew = this.Hebrew;
    this.user.English = this.English;
    // this.user.English = this.English;
    // this.user.Both = this.Both;
    //this.user.UserName = this.UserName;
    //this.user.Password = this.Password;
    this.user.Both = false;
    this.user.UserName = this.LoginUserName;
    this.user.Password = this.Password;
    if (this.user.FirstNameEnglish != null &&
      this.user.LastNameEnglish != null &&
      //this.user.FirstNameHebrew != null &&
      //this.user.LastNameHebrew != null &&
      // this.user.Address != null &&
      // this.user.Street != null &&
      // this.user.NumberHome != null &&
      this.user.NumberPhone1 != null &&
      this.user.Address != null &&
      this.user.selectedTitle != null &&
      this.user.selectedCountry != null &&
      // this.user.PostCode != null &&
      //this.user.Email != null
      //this.user.Bio != null &&
      this.user.UserName != null &&
      this.user.MemberShip != null
      && this.user.Language != null
      // this.user.Password != null
    ) {
      this.setCookieUser(this.user);
      //this.CARTMEMBERSHIP.contents[0] = obj;

      this.UserToRegistration.contents = this.user;
      let _User = JSON.stringify(this.UserToRegistration.contents);
      localStorage.setItem(this.UserToRegistration.KEY, _User);

      // let obj=this.user;

      //obj = {
      //FirstNameEnglish: this.user.FirstNameEnglish, LastNameEnglish: this.user.LastNameEnglish,
      //FirstNameHebrew: this.user.FirstNameHebrew, LastNameHebrew: this.user.LastNameHebrew,
      //Address: this.user.Address, selectedTitle:this.user.selectedTitle
      //}

      debugger;
      //this.newUser = this.getCookieNewUserToSendToTranzila('UserNewMemberAccount');
      //this.newUser = this.getCookie2('UserNewMemberAccount');
      let _User2 = JSON.parse(window.localStorage.getItem(this.UserToRegistration.KEY));
      // this.newUser = (User)_User2;
      //this.newUser.LastNameHebrew = this.getCookie('LastNameHebrew');

      // this.serverService.Registration(this.user)
      //  if (this.Rout == 1) {
      //   this.router.navigateByUrl("/RegistrationOneEnglish");

      // }
      // if (this.Rout == 2) {
      //   this.router.navigateByUrl("/Thank3");

      // } if (this.Rout == 3) {
      //   this.router.navigateByUrl("/new");
      // }

      // this.ShowMessage = true;
      //this.cookieService.putObject('user', JSON.stringify(this.user));
      //if(newMemberSaved==true)!!!!!!!!!!!!!!!!!!!!!!
      //this.router.navigate(['Pay', this.Total]).then(result => {  window.open(link, '_blank'); })
      this.SendToTranzila();

    }
    else {
      if (this.LoginUserName == null) {
        this.email.nativeElement.style.color = "red";
        document.getElementById("emailin").classList.add("bordercolorRed");
      } if (this.Address == null) {
        this.address.nativeElement.style.color = "red";
        document.getElementById("addressin").classList.add("bordercolorRed");
      } if (this.FirstName == null) {
        this.namee.nativeElement.style.color = "red";
        document.getElementById("nameein").classList.add("bordercolorRed");
      } if (this.LastName == null) {
        this.lastnamee.nativeElement.style.color = "red";
        document.getElementById("lastnameein").classList.add("bordercolorRed");
      } if (this.Title == null) {
        this.ti.nativeElement.style.color = "red";
        document.getElementById("tiin").classList.add("bordercolorRed");
      } if (this.selectedCountry == null) {
        this.coun.nativeElement.style.color = "red";
        document.getElementById("counin").classList.add("bordercolorRed");
      } if (this.PasportNumber == null) {
        this.Id.nativeElement.style.color = "red";
        document.getElementById("Idin").classList.add("bordercolorRed");
      } if (this.NumberPhone1 == null) {
        this.telephone.nativeElement.style.color = "red";
        document.getElementById("telephonein").classList.add("bordercolorRed");
      } if (this.membershipType == null) {
        this.membershipspan.nativeElement.style.color = "red";
      } if (this.Language == null) {
        this.languagespan.nativeElement.style.color = "red";
      }
    }


  }
  //SendToTranzila() {
  //  this.serverService.setCurrency(this.currency);
  //  this.serverService.setLang(this.langg);
  //  this.serverService.setEmail(this.LoginUserName);
  //  this.serverService.setTotal(this.Total);
  //  this.setCookieRout(1);
  //  this.router.navigate(['Pay']);
  //}
  OverToHebrew() {
    debugger;
    this.setCookie(this.Email);
    this.user = new User();
    this.user.MemberShip = this.membershipType;
    this.user.FirstNameEnglish = this.FirstName;
    this.user.LastNameEnglish = this.LastName;
    this.user.FirstNameHebrew = this.FirstNameHebrew;
    this.user.LastNameHebrew = this.LastNameHebrew;
    this.user.Address = this.Address;
    this.user.City = this.City;
    this.user.Street = this.Street;
    this.user.NumberHome = this.NumberHome;
    this.user.NumberPhone1 = this.NumberPhone1;
    this.user.NumberPhone2 = "";
    this.user.selectedTitle = this.Title;
    this.user.selectedCountry = this.selectedCountry;
    this.setCookieCountryUserNew(this.selectedCountry);
    this.user.PostCode = this.PasportNumber;
    this.user.Email = this.LoginUserName;
    this.user.Language = this.Language;
    this.user.Bio = this.Bio;
    this.user.Students = true;
    this.user.WithoutStudemt = false;
    this.user.EAJS = true;
    this.user.AJS = true;
    this.user.Hebrew = this.Hebrew;
    this.user.English = this.English;
    this.user.Both = false;
    this.user.UserName = this.LoginUserName;
    this.user.Password = this.Password;

    this.setCookieUser(this.user);
    debugger;
    this.router.navigateByUrl("/NewMemberAccountHebrew/6");

  }
  focusacademic() {
    this.academic.nativeElement.style.color = "#27b5e5";
  }
  unfocusacademic() {
    this.academic.nativeElement.style.color = "gray";
  }
  focusenglish() {
    this.english.nativeElement.style.color = "#27b5e5";
  }
  unfocusenglish() {
    this.english.nativeElement.style.color = "gray";
  } focusdiv() {
    this.div.nativeElement.style.color = "#27b5e5";
  }
  unfocusdiv() {
    this.div.nativeElement.style.color = "gray";
  }
  focushebrew() {
    this.hebrew.nativeElement.style.color = "#27b5e5";
  }
  unfocushebrew() {
    this.hebrew.nativeElement.style.color = "gray";
  }
  focuslang() {
    this.lang.nativeElement.style.color = "#27b5e5";
  }
  unfocuslang() {
    this.lang.nativeElement.style.color = "gray";
  }
  focuslnameh() {
    this.lastnameh.nativeElement.style.color = "#27b5e5";
  }
  unfocuslnameh() {
    this.lastnameh.nativeElement.style.color = "gray";
  } focussubdiv() {
    this.subdiv.nativeElement.style.color = "#27b5e5";
  }
  unfocussubdiv() {
    this.subdiv.nativeElement.style.color = "gray";
  } focusabs() {
    this.abs.nativeElement.style.color = "#27b5e5";
  }
  unfocusabs() {
    this.abs.nativeElement.style.color = "gray";
  } focustitle() {
    this.title.nativeElement.style.color = "#27b5e5";
  }
  unfocustitle() {
    this.title.nativeElement.style.color = "gray";
  } focusnameh() {
    this.nameh.nativeElement.style.color = "#27b5e5";
  }
  unfocusnameh() {
    this.nameh.nativeElement.style.color = "gray";
  } focusnamee() {
    this.namee.nativeElement.style.color = "#27b5e5";
  }
  unfocusnamee() {
    if (this.FirstName != null) {
      this.namee.nativeElement.style.color = "gray";
      document.getElementById("nameein").classList.remove("bordercolorRed");
    }
    this.namee.nativeElement.style.color = "gray";
  } focuslnamee() {
    this.lastnamee.nativeElement.style.color = "#27b5e5";
  }
  unfocuslnamee() {
    if (this.LastName != null) {
      this.lastnamee.nativeElement.style.color = "gray";
      document.getElementById("lastnameein").classList.remove("bordercolorRed");
    }
    this.lastnamee.nativeElement.style.color = "gray";
  }
  focusemail() {
    this.email.nativeElement.style.color = "#27b5e5";
  }
  unfocusemail() {
    if (this.LoginUserName != null) {
      this.email.nativeElement.style.color = "gray";
      document.getElementById("emailin").classList.remove("bordercolorRed");
    }
    this.email.nativeElement.style.color = "gray";
  } focusaddress() {

    this.address.nativeElement.style.color = "#27b5e5";
  }
  unfocusaddress() {
    if (this.Address != null) {
      this.address.nativeElement.style.color = "gray";
      document.getElementById("addressin").classList.remove("bordercolorRed");
    }
    this.address.nativeElement.style.color = "gray";
  }
  focuskey() {
    this.key.nativeElement.style.color = "#27b5e5";
  }
  unfocuskey() {
    this.key.nativeElement.style.color = "gray";
  } focustelephone() {
    this.telephone.nativeElement.style.color = "#27b5e5";
  }
  unfocustelephone() {
    if (this.NumberPhone1 != null) {
      this.telephone.nativeElement.style.color = "gray";
      document.getElementById("telephonein").classList.remove("bordercolorRed");
    }
    this.telephone.nativeElement.style.color = "gray";
  } focusId() {
    this.Id.nativeElement.style.color = "#27b5e5";
  }
  unfocusId() {
    if (this.PasportNumber != null) {
      this.Id.nativeElement.style.color = "gray";
      document.getElementById("Idin").classList.remove("bordercolorRed");
    }
    this.Id.nativeElement.style.color = "gray";
  } focusc() {
    this.coun.nativeElement.style.color = "#27b5e5";
  }
  unfocusc() {
    if (this.selectedCountry != null) {
      this.coun.nativeElement.style.color = "gray";
      document.getElementById("counin").classList.remove("bordercolorRed");
    }
    this.coun.nativeElement.style.color = "gray";
  } focust() {
    this.ti.nativeElement.style.color = "#27b5e5";
  }
  unfocust() {
    if (this.Title != null) {
      this.ti.nativeElement.style.color = "gray";
      document.getElementById("tiin").classList.remove("bordercolorRed");
    }
    this.ti.nativeElement.style.color = "gray";
  } focusbiog() {
    this.biog.nativeElement.style.color = "#27b5e5";
  }
  unfocusbiog() {
    this.biog.nativeElement.style.color = "gray";
  }



  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  //changePlaying() {
  //  __await(1000);

  //  this.ngZone.run(() => {

  //    this.serverService.getNumProduct().subscribe((val) => {
  //      this.num = val;
  //      this.cd.detectChanges();
  //    });
  //  });
  //}

  ngOnInit() {
    document.getElementById("Top").scrollIntoView();

    this.Email = this.getCookie('UserName');
    this.UserName = this.Email;
    this.Rout = parseInt(this.getCookie('Rout'));
    this.Password = this.getCookie('Password');

    //   this.Rout = urlParams['Rout'];
    //   //alert(this.Email)
    if (this.Email == "''") {
      this.Email = "";
    }
    this.serverService.getAllDBFromServer().subscribe(
      resp => {
        this.DB = resp;
        this.DB = this.DB.filter(book => book.GroupBook == 1);
      },
      error => {
        console.log(error)
      });
    // console.log("this.DB",this.DB)

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
      if (_total) {
        this.TOTAL.total = JSON.parse(_total);
      }
      this.IsMemberShip = false;
    }
  }

  SendToTranzila() {
    this.router.navigate(['Pay', this.Total]);
  }
  SendToSignIn() {
    this.router.navigateByUrl("/UserPass/2");
  }
  OpenTooltip() {
    if (document.getElementById("CartTooltip").classList.contains("CartTooltip"))
      document.getElementById("CartTooltip").classList.remove("CartTooltip");
    else
      document.getElementById("CartTooltip").classList.add("CartTooltip");

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
  getDiscountTotal(Total) {
    let discount = Total * (20 / 100);
    this.TotalAfterDiscount = Total - discount;
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
    //this.changePlaying();
    //this.changePlaying();
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
  isSignIn() {
    this.UserNameLogin = this.getCookie('UserName');
    if (this.UserNameLogin != undefined) {
      return true;
    }
    else {
      return false;
    }
  }
  SelectFilter(Group: number) {
    this.serverService.getAllDBFromServer().subscribe((val) => {
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

  BackToShoppingCartStore() {
    this.router.navigateByUrl("/ShoppingCartHebrew");

  }




}

