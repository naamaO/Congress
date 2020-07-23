import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { CookieService } from 'angular2-cookie';
import { __await } from 'tslib';
import { Name } from 'src/classes/Name';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/classes/User';
@Component({
  selector: 'app-new-member-account',
  templateUrl: './new-member-account.component.html',
  styleUrls: ['./new-member-account.component.css']
})
export class NewMemberAccountCompponent implements OnInit {
  @ViewChild("testInput") testInput;
  @ViewChild('english') english: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('telephone') telephone: ElementRef;
  @ViewChild('Id') Id: ElementRef;
  @ViewChild('lastnameh') lastnameh: ElementRef;
  @ViewChild('lastnamee') lastnamee: ElementRef;
  @ViewChild('hebrew') hebrew: ElementRef;
  @ViewChild('abs') abs: ElementRef;
  @ViewChild('lang') lang: ElementRef;
  @ViewChild('div') div: ElementRef;
  @ViewChild('subdiv') subdiv: ElementRef;
  @ViewChild('academic') academic: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('nameh') nameh: ElementRef;
  @ViewChild('namee') namee: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('key') key: ElementRef;
  @ViewChild('coun') coun: ElementRef;
  @ViewChild('ti') ti: ElementRef;
  @ViewChild('biog') biog: ElementRef;

  //@Input()
  public user: User;
  // public FirstNameEnglish: string;
  // public LastNameEnglish: string;

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
  public ArrLanguage: string[]=['English','עברית'];
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
  public ArrTitle: string[] = ['Prof', 'Dr', 'Mr', 'Ms'];
  public NumberPhone1: string;
  public showLikeProp: boolean = false;
  public Bio: string;
  public PasportNumber: number;
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
 // public Address: string;
  constructor(public route: ActivatedRoute, private fb: FormBuilder, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.Country = serverService.Country;
    this.ArrMembershipTypes = [
      {
        membershipType: 'Annual Membership',
        price : 65,
        tooltipText:'Regular membership for one calendar year',
        selected: null
      }, {
        membershipType: 'Student/Retiree Membership',
        price : 40,
        tooltipText:'Membership for students or retirees with no research fund for one calendar year',
        selected: null
      }, {
        membershipType: 'Joint Membership',
        price : 105,
        tooltipText:'Membership for couples for one calendar year',
        selected: null
      }, {
        membershipType: 'Joint Student/Retiree Membership',
        price : 70,
        tooltipText:'Membership for student or retiree couples without research fund for one calendar year',
        selected: null
      }, {
        membershipType: 'Lifetime Membership',
        price : 1300,
        tooltipText:'Membership for life',
        selected: null
      }, {
        membershipType: 'Institutional Membership',
        price : 265,
        tooltipText:'Membership for Institutions for one calendar year',
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

  onMemberTypeChange(membershipTypeChanged) {
    this.membershipType = membershipTypeChanged;
    if(membershipTypeChanged==0) {
        console.log("this.ArrMembershipTypes[0].price",this.ArrMembershipTypes[0].price)
        this.Total=this.ArrMembershipTypes[0].price;
        }
    else if(membershipTypeChanged==1) {
        console.log("this.ArrMembershipTypes[1].price",this.ArrMembershipTypes[1].price)
        this.Total=this.ArrMembershipTypes[1].price;
       }
    else if(membershipTypeChanged==2) {
        console.log("this.ArrMembershipTypes[2].price",this.ArrMembershipTypes[2].price)
        this.Total=this.ArrMembershipTypes[2].price;
        }
    else if(membershipTypeChanged==3) {     
        console.log("this.ArrMembershipTypes[3].price",this.ArrMembershipTypes[3].price)
        this.Total=this.ArrMembershipTypes[3].price;
        }
    else if(membershipTypeChanged==4) {
        console.log("this.ArrMembershipTypes[4].price",this.ArrMembershipTypes[4].price)
        this.Total=this.ArrMembershipTypes[4].price;
        }
    else if(membershipTypeChanged==5) {
        console.log("this.ArrMembershipTypes[5].price",this.ArrMembershipTypes[5].price)
        this.Total=this.ArrMembershipTypes[5].price;
        }
      console.log("membershipTypeChanged",membershipTypeChanged)
  }
//dothis!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  onLanguageChange(Language){
    if(Language=='English') {
        console.log("Language",Language)
      this.Language ='English';
        }
    else if(Language=='Hebrew') {
        console.log("Language",Language)
      this.Language ='Hebrew';
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

  ngOnInit() {
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
  TitleEnglishP(event){
  }
  changeProp(element, maxvalue) {
    // var q = element.Proposal.split(/[\s]+/).length;
    var q = element.Proposal.split(" "); 
    
    if(q.length > maxvalue){
        var r = q.length - maxvalue;
        alert("You can enter no more than "+ maxvalue+" words");
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
    this.user.FirstNameEnglish = this.FirstName;
    this.user.LastNameEnglish = this.LastName;
    this.user.FirstNameHebrew = this.FirstNameHebrew;
    this.user.LastNameHebrew = this.LastNameHebrew
    this.user.Address = this.Address
    // this.user.City = this.City;
    // this.user.Street = this.Street;
    // this.user.NumberHome = this.NumberHome;
    //this.user.Address = this.Address;
    this.user.City = this.City;
    this.user.Street = this.Street;
    this.user.NumberHome = this.NumberHome;
    // this.user.PasportNumber =  this.PasportNumber;

    this.user.NumberPhone1 = this.NumberPhone1;
    // this.user.NumberPhone2 = this.NumberPhone2;
     this.user.NumberPhone2 = "";
    this.user.selectedTitle = this.Title;

    // this.user.selectedTitle = this.Title;
    this.user.selectedCountry = this.selectedCountry;
    // this.user.PostCode = this.PostCode;
       this.user.PostCode = "";
    this.user.Email = this.LoginUserName;
    this.user.Language = this.Language;
    // this.user.Bio = this.Bio;
    // this.user.Students = this.Students;
    // this.user.WithoutStudemt = this.WithoutStudemt;
    // this.user.EAJS = this.EAJS;
    // this.user.AJS = this.AJS;
     this.user.Bio = this.Bio;
    this.user.Students = true;
    this.user.WithoutStudemt =false;
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
      this.user.FirstNameHebrew != null &&
      this.user.LastNameHebrew != null &&
      // this.user.Address != null &&
      // this.user.Street != null &&
      // this.user.NumberHome != null &&
      this.user.NumberPhone1 != null &&
       this.user.Address != null &&
      this.user.selectedTitle != null &&
      this.user.selectedCountry != null &&
     // this.user.PostCode != null &&
      //this.user.Email != null
       this.user.Bio != null &&
      this.user.UserName != null &&
      this.user.MemberShip !=null
      && this.user.Language!=null
     // this.user.Password != null
    ) {
      this.serverService.Registration(this.user)
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
     this.router.navigate(['Pay', this.Total]);

    }
    else {
       alert("All fields must be filled!");
     }

   
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
    this.namee.nativeElement.style.color = "gray";
  } focuslnamee() {
    this.lastnamee.nativeElement.style.color = "#27b5e5";
  }
  unfocuslnamee() {
    this.lastnamee.nativeElement.style.color = "gray";
  }
  focusemail() {
    this.email.nativeElement.style.color = "#27b5e5";
  }
  unfocusemail() {
    this.email.nativeElement.style.color = "gray";
  }focusaddress() {
    this.address.nativeElement.style.color = "#27b5e5";
  }
  unfocusaddress() {
    this.address.nativeElement.style.color = "gray";
  }
  focuskey() {
    this.key.nativeElement.style.color = "#27b5e5";
  }
  unfocuskey() {
    this.key.nativeElement.style.color = "gray";
  }focustelephone() {
    this.telephone.nativeElement.style.color = "#27b5e5";
  }
  unfocustelephone() {
    this.telephone.nativeElement.style.color = "gray";
  }focusId() {
    this.Id.nativeElement.style.color = "#27b5e5";
  }
  unfocusId() {
    this.Id.nativeElement.style.color = "gray";
  }focusc() {
    this.coun.nativeElement.style.color = "#27b5e5";
  }
  unfocusc() {
    this.coun.nativeElement.style.color = "gray";
  }focust() {
    this.ti.nativeElement.style.color = "#27b5e5";
  }
  unfocust() {
    this.ti.nativeElement.style.color = "gray";
  }focusbiog() {
    this.biog.nativeElement.style.color = "#27b5e5";
  }
  unfocusbiog() {
    this.biog.nativeElement.style.color = "gray";
  }




}
