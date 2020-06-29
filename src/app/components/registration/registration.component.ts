import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../classes/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('title') title: ElementRef;
  public num: number;
  public ShowMessage: boolean;
  public FirstNameEnglish: string;
  public LastNameEnglish: string;
  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public City: string;
  public ID: string;
  public Street: string;
  public NumberHome: string;
  public NumberPhone1: string;
  public NumberPhone2: string;
  public selectedTitle: string;
  public selectedCountry: string;
  public PostCode: string;
  public Titels: string[] = ['Prof', 'Dr', 'Ms', 'Mr'];
  public Country: string[] = ['Israel', 'USA', 'Germany', 'Switzerland'];
  public Email: string;
  public Bio: string;
  public Students: boolean;
  public WithoutStudemt: boolean;
  public EAJS: boolean;
  public AJS: boolean;
  public Hebrew: boolean;
  public English: boolean;
  public Both: boolean;
  private sub: any;
  public Rout: number;
  public user: User;
  public UserName: string;
  public Password: string;
  public ValidPass: boolean = false;
  public result: string;
  //= { "1", "2", "3", "4" };
  //public NumberHome: string;
  public flagnum: boolean = false;
  public flagLow: boolean = false;
  public flagUpp: boolean = false;
  public showErroePass: boolean = false;

  constructor(public route: ActivatedRoute, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    //this.sub = this.route.params.subscribe(params => {
    //  this.Rout = +params['Rout']; // (+) converts string 'id' to a number

    //});
    //this.sub = this.route.params.subscribe(params => {
    //  this.Email = (+params['User']).toString();
    //});
  }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.Email = urlParams['User'];
      this.Rout = urlParams['Rout'];
      //alert(this.Email)
      if (this.Email == "''") {
        this.Email = "";
      }
    });
  }
  focustitle() {
    this.title.nativeElement.style.color = "#27b5e5";
  }
  unfocustitle() {
    this.title.nativeElement.style.color = "gray";
  }
  hasLowerCase(str:string) {
    if ((str != null) || (str=='')) {
      // alert(str);
      var i = 0;
      var character = '';
      while (i <= str.length) {
        character = str.charAt(i);
        //if (!isNaN(Number(character) * 1)) {
        if (character >= '0' && character <= '9') {
          this.flagnum = true;

        } else {
          if (character == character.toUpperCase()) {
            this.flagUpp = true;
          }
          if (character == character.toLowerCase()) {
            this.flagLow = true;
          }
        }
        i++;
      }
      if (this.flagUpp == false || this.flagnum == false || this.flagLow == false) {
        this.flagLow = false;
        this.flagnum = false;
        this.flagUpp = false;
        this.showErroePass = true;
      } else {
        this.showErroePass = false;
        this.flagLow = false;
        this.flagnum = false;
        this.flagUpp = false;
      }
    }
  }
  setCookie(UaerName: string) {
    //alert("hh");
    this.cookieService.put('UserName', UaerName);
  }
  public RegistrationUser() {

    //check validation
    //this.hasLowerCase(this.Password);
    this.setCookie(this.Email);
    this.user = new User();

    this.user.FirstNameEnglish = this.FirstNameEnglish;
    this.user.LastNameEnglish = this.LastNameEnglish;
    this.user.FirstNameHebrew = this.FirstNameHebrew;
    this.user.LastNameHebrew = this.LastNameHebrew
    this.user.City = this.City;
    this.user.Street = this.Street;
    this.user.NumberHome = this.NumberHome;
    this.user.NumberPhone1 = this.NumberPhone1;
    this.user.NumberPhone2 = this.NumberPhone2;
    this.user.selectedTitle = this.selectedTitle;
    this.user.selectedCountry = this.selectedCountry;
    this.user.PostCode = this.PostCode;
    this.user.Email = this.Email;
    this.user.Bio = this.Bio;
    this.user.Students = this.Students;
    this.user.WithoutStudemt = this.WithoutStudemt;
    this.user.EAJS = this.EAJS;
    this.user.AJS = this.AJS;
    this.user.Hebrew = this.Hebrew;
    this.user.English = this.English;
    this.user.Both = this.Both;
    //this.user.UserName = this.UserName;
    //this.user.Password = this.Password;
    if (this.user.FirstNameEnglish != null &&
      this.user.LastNameEnglish != null &&
      this.user.FirstNameHebrew != null &&
      this.user.LastNameHebrew != null &&
      this.user.City != null &&
      this.user.Street != null &&
      this.user.NumberHome != null &&
      this.user.NumberPhone1 != null &&
      this.user.NumberPhone2 != null &&
      this.user.selectedTitle != null &&
      this.user.selectedCountry != null &&
      this.user.PostCode != null &&
      this.user.Email != null &&
      this.user.Bio != null
      // this.user.UserName != null &&
      //this.user.Password != null
    ) {
      this.serverService.Registration(this.user)
      if (this.Rout == 1) {
        this.router.navigateByUrl("/RegistrationOneEnglish");

      }
      if (this.Rout == 2) {
        this.router.navigateByUrl("/Thank3");

      } if (this.Rout == 3) {
        this.router.navigateByUrl("/new");
      }

      this.ShowMessage = true;


    }
    else {
      alert("All fields must be filled!");
    }

  }
  close() {
    this.ShowMessage = false;

  }
}
