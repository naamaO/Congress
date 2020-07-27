import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { UserPass } from '../../../classes/UserPass';
import { MembershipInformation } from '../../../classes/MembershipInformation';

import { CookieService } from 'angular2-cookie/core';
import { BrowserPlatformLocation } from '@angular/platform-browser/src/browser/location/browser_platform_location';
@Component({
  selector: 'app-membership-information',
  templateUrl: './membership-information.component.html',
  styleUrls: ['./membership-information.component.css']
})
export class MembershipInformationComponent implements OnInit {
  resetPassword:boolean=false;
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public Rout: number;
  public Password: string;
  public UserName: string;
  public item: UserPass;
  public true: boolean = false;
  public ShowError: boolean;
  public ShowForgetPass: boolean;
  public ShowErrorEmail: boolean;
  private sub: any;
  public NumSession: number;
  public Email: string = '';
  public Division: string;
  public SubDivision: string;
  public TitleEnglish: string;
  public TitleHebrew: string;
  public Proposal: string;
  public Language: string;
  public Keywords: string;
  public SessionName: string;
  public FirstName: string;
  public LastName: string;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public LoginUserName: string;
  public Title: string;
  public FullName: string;
  public ArrTitle: string[] = ['Prof', 'Dr', 'Mr', 'Ms'];
  showChoose:Boolean = false;
  showExpireDate:Boolean=true;
  showChooseExpire:Boolean=false;
  public ArrMembershipTypes = [];
  public Total: number;

  constructor(public activatedRoute: ActivatedRoute, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.Rout = +params['Rout']; // (+) converts string 'id' to a number

    });
    this.LoginUserName = (this.getCookie('UserName'));
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

  //   this.serverService.getName().subscribe((events) => {
  //      this.FirstName = events.FirstName;
  //      this.LastName = events.LastName;
  //     // this.Title = events.Title;

  //   });
  //   this.serverService.getNameHebrew().subscribe((events) => {
  //     this.FirstNameHebrew = events.FirstName;
  //     this.LastNameHebrew = events.LastName;
  //  });

   this.serverService.getUserDetails().subscribe((events) => {
     this.Title = events.selectedTitle;
     this.FirstName = events.FirstNameEnglish;
     this.LastName = events.LastNameEnglish;
     this.FirstNameHebrew = events.FirstNameHebrew;
     this.LastNameHebrew = events.LastNameHebrew;
console.log("d",this.Title, this.FirstName, this.LastName,this.FirstNameHebrew, this.LastNameHebrew)
    //  this.Division = events.Division;
    //  this.SubDivision = events.SubDivision;
    //  this.TitleEnglish = events.TitleEnglish;
    //  this.TitleHebrew = events.TitleHebrew;
    //  this.Proposal = events.Proposal;
    //  this.Language = events.Language;
    //  this.Keywords = events.Keywords;
    //  this.SessionName = events.SessionName;
    
   });

  }
  showChooseMembership(showChoose){
    if(showChoose==true){
      this.showChoose=false;
    }
    else{
      this.showChoose=true;
    }
  }

  showChoose2(showChooseExpire){
    if(showChooseExpire==true){
      this.showChooseExpire=false;
      // this.showChoose = false;
    }
    else{
      this.showChooseExpire=true;
    }
}

  onMemberTypeChange(membershipTypeChanged){
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

  renew(){
    //this.router.navigate(['Pay', this.Total]);
  console.log("renew")
  }

  become(){
    console.log("become")

  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  setCookie(UaerName: string) {
    this.cookieService.put('UserName', UaerName);
  }
  ngOnInit() {


  }
  forget() {
    if(!this.resetPassword) {this.resetPassword=true;} else{ this.resetPassword=false;}

    this.item = new UserPass()
    this.item.Email = this.Email;
    if (this.Email != '') {
      this.ShowErrorEmail = false;

    //  this.serverService.forgetPass(this.item);
    }
    else {
      this.ShowErrorEmail = true;
    }
  }

  newMember(){
    
    console.log("new member")
  }
  SendCheckUserPassword() {
    this.item = new UserPass()
    this.item.Password = this.Password;
    this.item.Email = this.Email;
    this.setCookie(this.Email);
    this.serverService.SendCheckUserPassword(this.item).subscribe((events) => {
      this.true = events;
      if (this.true == false) {
        this.ShowError = !this.ShowError;
      }

      if (this.true == true) {
        if (this.Rout == 1) {
          this.router.navigateByUrl("/RegistrationOneEnglish");
        }
        if (this.Rout == 3) {
          this.router.navigateByUrl("/CongressRegistrationSingle");
        }
        if (this.Rout == 6) {
          this.serverService.CheckIfInDraft().subscribe((events) => {
            if (events == 0) {
              this.router.navigateByUrl("/FirstPageEnglish");
            }
            if (events == 1) {
              this.router.navigateByUrl("/RegistrationOneEnglish");
            }
            if (events == 2) {
              this.router.navigateByUrl("/CongressRegistrationSingle");
            }
          });

        }
        if (this.Rout == 4) {
          this.serverService.CheckIfInSession().subscribe((events) => {
            this.NumSession = events;
            if (this.NumSession == 1) {
              this.router.navigateByUrl("/CongressRegistrationSingle");

            }
            else {
              this.router.navigateByUrl("/RegistrationOneEnglish");
            }
          });
        }
        if (this.Rout == 2) {
          this.router.navigateByUrl("/new");

        }
        if (this.Rout == 22) {
          this.router.navigateByUrl("/newHebrew");

        }
        if (this.Rout == 5) {
          this.router.navigateByUrl("/FirstPageEnglish");

        }
      }

    });

  }
  Support(email: string) {

  }
}
