import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { CookieService } from 'ngx-cookie';
import { __await } from 'tslib';
import { Name } from 'src/classes/Name';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/classes/User';
import { MONKEY_PATCH_KEY_NAME } from '@angular/core/src/render3/interfaces/context';
@Component({
  selector: 'app-new-member-account-hebrew',
  templateUrl: './new-member-account-hebrew.component.html',
  styleUrls: ['./new-member-account-hebrew.component.css']
})
export class NewMemberAccountHebrewComponent implements OnInit {

  @Input() RoutFromStore: number;
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
  @ViewChild('ArrMembershipTypes0') ArrMembershipTypes0: ElementRef;
  @ViewChild('ArrMembershipTypes1') ArrMembershipTypes1: ElementRef;
  @ViewChild('ArrMembershipTypes2') ArrMembershipTypes2: ElementRef;
  @ViewChild('ArrMembershipTypes3') ArrMembershipTypes3: ElementRef;
  @ViewChild('ArrMembershipTypes4') ArrMembershipTypes4: ElementRef;
  @ViewChild('ArrMembershipTypes5') ArrMembershipTypes5: ElementRef;
  @ViewChild('languageHebrew') languageHebrew: ElementRef;
  @ViewChild('languageEnglish') languageEnglish: ElementRef;
  @ViewChild('Top') Top: ElementRef;

  //@Input()
  public user: User;
  // public FirstNameEnglish: string;
  // public LastNameEnglish: string;
  public currency: number = 1;
  public langg: string = "il";
  public ilang: string = "HEB";
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
  public ArrTitle: string[] = ['פרופ', 'דר', 'אחר'];
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
  public Rout: number;
  public ArrMembershipTypes = [];
  public Total: number;
  public membershipType: number;
  public Language: string;
  public OldUser: any;

  public CARTMEMBERSHIP = {
    KEY: 'ShoppingCart',
    contents: []
  };
  public UserToRegistration = {
    KEY: 'UserToRegistration',
    contents: new User()
  };
  // public Address: string;

  constructor(public route: ActivatedRoute, private fb: FormBuilder, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
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
    this.Country = serverService.CountryHebrew;
    this.ArrMembershipTypes = [
      {
        membershipType: 'חברות שנתית',
        price: 220,
        tooltipText: 'חברות קבועה לשנה קלנדרית אחת',
        selected: null
      }, {
        membershipType: 'חברות סטודנטים / גמלאים',
        price: 140,
        tooltipText: 'חברות לסטודנטים או גמלאים ללא קרן מחקר במשך שנה קלנדרית אחת',
        selected: null
      }, {
        membershipType: 'חברות משותפת',
        price: 360,
        tooltipText: 'חברות לזוגות לשנה קלנדרית אחת',
        selected: null
      }, {
        membershipType: 'חברות סטודנט / גמלאי משותף',
        price: 240,
        tooltipText: 'חברות לזוגות סטודנטים או גמלאים ללא קרן מחקר במשך שנה קלנדרית אחת',
        selected: null
      }, {
        membershipType: 'חברות לכל החיים',
        price: 4500,
        tooltipText: 'חברות לכל החיים',
        selected: null
      }, {
        membershipType: 'חברות מוסדית',
        price: 900,
        tooltipText: 'חברות למוסדות לשנה קלנדרית אחת',
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

  }
  getCookie2(key: string) {
    return this.cookieService.getObject(key);
  } setCookieUser(User: User) {
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    this.cookieService.putObject('UserNewMemberAccount', User);
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
  SendToTranzila() {
    let _cart = JSON.stringify(this.CARTMEMBERSHIP.contents);
    localStorage.setItem(this.CARTMEMBERSHIP.KEY, _cart);
    this.setCookieCurrency(this.currency);
    this.setCookieLang(this.langg);
    this.setCookieIlang(this.ilang);
    this.setCookieTotal(this.Total);
    let address: any;
    let country: any
    country = this.selectedCountry;
    let detailsAddress: any;
    detailsAddress = this.Address
    address = country.trimEnd() + " " + detailsAddress.trimRight();
    this.setCookieAddress(address)
    this.LoginUserName = this.getCookie('UserName');
    this.serverService.getName(this.LoginUserName).subscribe((val) => {
      let first: any;
      let last: any
      first = val.FirstName;
      last = val.LastName;
      let contactName: any;
      contactName = first.trimEnd() + " " + last.trimEnd();
      this.setCookieContact(contactName);
    });
    this.serverService.setEmail();
    this.setCookieRout(1);
    this.router.navigate(['Pay']);
  }

  onMemberTypeChange(membershipTypeChanged) {
    this.membershipspan.nativeElement.style.color = "gray";
    this.CARTMEMBERSHIP.contents = [];
    let obj;
    this.membershipType = membershipTypeChanged;
    if (membershipTypeChanged == 0) {
      this.ArrMembershipTypes0.nativeElement.checked = true;
      this.ArrMembershipTypes1.nativeElement.checked = false;
      this.ArrMembershipTypes2.nativeElement.checked = false;
      this.ArrMembershipTypes3.nativeElement.checked = false;
      this.ArrMembershipTypes4.nativeElement.checked = false;
      this.ArrMembershipTypes5.nativeElement.checked = false;

      obj = { product_name: this.ArrMembershipTypes[0].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[0].price }
      console.log("this.ArrMembershipTypes[0].price", this.ArrMembershipTypes[0].price)
      this.Total = this.ArrMembershipTypes[0].price;
    }
    else if (membershipTypeChanged == 1) {
      this.ArrMembershipTypes1.nativeElement.checked = true;
      this.ArrMembershipTypes0.nativeElement.checked = false;
      this.ArrMembershipTypes2.nativeElement.checked = false;
      this.ArrMembershipTypes3.nativeElement.checked = false;
      this.ArrMembershipTypes4.nativeElement.checked = false;
      this.ArrMembershipTypes5.nativeElement.checked = false;
      obj = { product_name: this.ArrMembershipTypes[1].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[1].price }

      console.log("this.ArrMembershipTypes[1].price", this.ArrMembershipTypes[1].price)
      this.Total = this.ArrMembershipTypes[1].price;
    }
    else if (membershipTypeChanged == 2) {
      this.ArrMembershipTypes2.nativeElement.checked = true;
      this.ArrMembershipTypes1.nativeElement.checked = false;
      this.ArrMembershipTypes0.nativeElement.checked = false;
      this.ArrMembershipTypes3.nativeElement.checked = false;
      this.ArrMembershipTypes4.nativeElement.checked = false;
      this.ArrMembershipTypes5.nativeElement.checked = false;
      obj = { product_name: this.ArrMembershipTypes[2].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[2].price }

      console.log("this.ArrMembershipTypes[2].price", this.ArrMembershipTypes[2].price)
      this.Total = this.ArrMembershipTypes[2].price;
    }
    else if (membershipTypeChanged == 3) {
      this.ArrMembershipTypes3.nativeElement.checked = true;
      this.ArrMembershipTypes1.nativeElement.checked = false;
      this.ArrMembershipTypes2.nativeElement.checked = false;
      this.ArrMembershipTypes0.nativeElement.checked = false;
      this.ArrMembershipTypes4.nativeElement.checked = false;
      this.ArrMembershipTypes5.nativeElement.checked = false;
      obj = { product_name: this.ArrMembershipTypes[3].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[3].price }

      console.log("this.ArrMembershipTypes[3].price", this.ArrMembershipTypes[3].price)
      this.Total = this.ArrMembershipTypes[3].price;
    }
    else if (membershipTypeChanged == 4) {
      this.ArrMembershipTypes4.nativeElement.checked = true;
      this.ArrMembershipTypes1.nativeElement.checked = false;
      this.ArrMembershipTypes2.nativeElement.checked = false;
      this.ArrMembershipTypes3.nativeElement.checked = false;
      this.ArrMembershipTypes0.nativeElement.checked = false;
      this.ArrMembershipTypes5.nativeElement.checked = false;
      obj = { product_name: this.ArrMembershipTypes[4].tooltipText, product_quantity: 1, product_price: this.ArrMembershipTypes[4].price }

      console.log("this.ArrMembershipTypes[4].price", this.ArrMembershipTypes[4].price)
      this.Total = this.ArrMembershipTypes[4].price;
    }
    else if (membershipTypeChanged == 5) {
      this.ArrMembershipTypes5.nativeElement.checked = true;
      this.ArrMembershipTypes1.nativeElement.checked = false;
      this.ArrMembershipTypes2.nativeElement.checked = false;
      this.ArrMembershipTypes3.nativeElement.checked = false;
      this.ArrMembershipTypes4.nativeElement.checked = false;
      this.ArrMembershipTypes0.nativeElement.checked = false;
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
      this.languageEnglish.nativeElement.checked = true;
      this.languageHebrew.nativeElement.checked = false;
    }
    else if (Language == 'Hebrew') {
      console.log("Language", Language)
      this.Language = 'Hebrew';
      this.languageEnglish.nativeElement.checked = false;
      this.languageHebrew.nativeElement.checked = true;

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
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
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
  setCookieRout(Rout: number) {
    debugger
    this.cookieService.put('RoutTranzilaSuccessJewishStudies', Rout.toString());
  }

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
    // this.route.params.forEach((urlParams) => {
    //   this.Email = urlParams['User'];
    //   this.Rout = urlParams['Rout'];
    //   //alert(this.Email)
    //   if (this.Email == "''") {
    //     this.Email = "";
    //   }
    // });
    //this.angForm = new FormGroup({
    //  name: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/) )})

    // this.LoginUserName = (this.getCookie('UserName'));
    // this.serverService.getName().subscribe((events) => {
    //   this.FirstName = events.FirstName;
    //   this.LastName = events.LastName;
    // });
  }
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
    this.setCookieMemberShipUserNew(String(this.membershipType));
    this.user.FirstNameEnglish = this.FirstName;
    this.setCookieFirstNameEnglish(this.FirstName);
    this.user.LastNameEnglish = this.LastName;
    this.setCookieLastNameEnglish(this.LastName);
    this.user.FirstNameHebrew = this.FirstNameHebrew;
    this.setCookieFirstNameHebrew(this.FirstNameHebrew);
    this.user.LastNameHebrew = this.LastNameHebrew;
    this.setCookieLastNameHebrew(this.LastNameHebrew);
    this.user.Address = this.Address;
    this.setCookieAddressUserNew(this.Address);
    // this.user.City = this.City;
    // this.user.Street = this.Street;
    // this.user.NumberHome = this.NumberHome;
    //this.user.Address = this.Address;
    this.user.City = this.City;
    this.user.Street = this.Street;
    this.user.NumberHome = this.NumberHome;
    // this.user.PasportNumber =  this.PasportNumber;

    this.user.NumberPhone1 = this.NumberPhone1;
    this.setCookieNumPhone1(this.NumberPhone1);

    // this.user.NumberPhone2 = this.NumberPhone2;
    this.user.NumberPhone2 = "";
    this.user.selectedTitle = this.Title;
    this.setCookieTitleUserNew(this.Title);

    // this.user.selectedTitle = this.Title;
    this.user.selectedCountry = this.selectedCountry;
    this.setCookieCountryUserNew(this.selectedCountry);

    // this.user.PostCode = this.PostCode;
    this.user.PostCode = this.PasportNumber;
    this.user.Email = this.LoginUserName;
    this.user.Language = this.Language;
    this.setCookieLanguageUserNew(this.Language);

    // this.user.Bio = this.Bio;
    // this.user.Students = this.Students;
    // this.user.WithoutStudemt = this.WithoutStudemt;
    // this.user.EAJS = this.EAJS;
    // this.user.AJS = this.AJS;
    this.user.Bio = this.Bio;
    this.setCookieBio(this.Bio);

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
      this.UserToRegistration.contents = this.user;
      let _User = JSON.stringify(this.UserToRegistration.contents);
      localStorage.setItem(this.UserToRegistration.KEY, _User);

     //this.serverService.RegistrationHebrew(this.user)
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
      } if (this.FirstNameHebrew == null) {
        this.nameh.nativeElement.style.color = "red";
        document.getElementById("namehin").classList.add("bordercolorRed");
      } if (this.LastNameHebrew == null) {
        this.lastnameh.nativeElement.style.color = "red";
        document.getElementById("lastnamehin").classList.add("bordercolorRed");
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
   
    if (this.Rout) {
      this.router.navigateByUrl("/NewMemberAccount/6");
    }
    else this.router.navigateByUrl("/NewMemberAccountFromStore");


  }
  OverToHebrewStrore() {
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
    this.router.navigateByUrl("/NewMemberAccountFromStore");

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




}
