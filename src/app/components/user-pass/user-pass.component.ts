import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { UserPass } from '../../../classes/UserPass';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-user-pass',
  templateUrl: './user-pass.component.html',
  styleUrls: ['./user-pass.component.css']
})
export class UserPassComponent implements OnInit {
  @ViewChild('title') title: ElementRef;
  @ViewChild('email') email: ElementRef =null;
  // @ViewChild('userName') userName: ElementRef;
  @ViewChild('pass') pass: ElementRef = null;
  userDetail: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  resetPassword:boolean=false;
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public showResetPassword: boolean;
  public Rout: number;
  public UserName: string;
  public item: UserPass;
  public ShowError: boolean;
  public ShowForgetPass: boolean;
  public ShowErrorEmail: boolean;
  private sub: any;
  public NumSession: number;
  public Email: string; 
  public Password: string;
  public true: boolean = false;
  public showWrongEmail: boolean = false;
  public EmailToResetPassword: string;
  constructor(fb: FormBuilder,public route: ActivatedRoute, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.userDetail = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.sub = this.route.params.subscribe(params => {
      this.Rout = +params['Rout']; // (+) converts string 'id' to a number

    });
  }
  setCookie(UaerName: string) {
    this.cookieService.put('UserName', UaerName);
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  ngOnInit() {
  }
  forget() {
    if(!this.resetPassword) {
      this.resetPassword=true;
    } else{
       this.resetPassword=false;
      }

    this.item = new UserPass()
    this.item.Email = this.Email;
    if (this.Email != '') {
      this.ShowErrorEmail = false;

    }
    else {
      this.ShowErrorEmail = true;
    }
  }
  focusemail() {
    this.email.nativeElement.style.color = "#27b5e5";
  }
  unfocusemail() {
    this.email.nativeElement.style.color = "gray";
  }
  focuspass() {
    this.pass.nativeElement.style.color = "#27b5e5";
  }
  unfocuspass() {
    this.pass.nativeElement.style.color = "gray";
  }
  focustitle() {
    this.title.nativeElement.style.color = "#27b5e5";
  }
  unfocustitle() {
    this.title.nativeElement.style.color = "gray";
  }
  newMember(){ 
    console.log("new member")
      let email = (this.getCookie('UserName'));
      this.cookieService.put('Rout', this.Rout.toString());
      this.cookieService.put('Password',this.Password);

// this.router.navigate(['/NewMemberAccount'],{queryParams:{Rout: this.Rout.toString(), User:email}});
// this.router.navigate(['/NewMemberAccount'],{queryParams:{Rout: this.Rout.toString(), User:email}});
// this.router.navigate(['NewMemberAccount', this.Rout]);
if(this.Rout==1)
   this.router.navigateByUrl("/NewMemberAccount/1");
   if(this.Rout==5)
   this.router.navigateByUrl("/NewMemberAccount/5");
   if(this.Rout==2)
   this.router.navigateByUrl("/NewMemberAccount/2");
   if(this.Rout==3)
   this.router.navigateByUrl("/NewMemberAccount/3");
   if(this.Rout==4)
   this.router.navigateByUrl("/NewMemberAccount/4");
   if(this.Rout==6)
   this.router.navigateByUrl("/NewMemberAccount/6");
   
  }
  SendCheckUserPassword() {
    this.item = new UserPass()
    this.setCookie(this.Email);
     this.item.Email = (this.getCookie('UserName'));
    this.item.Password = this.Password;
    this.item.Email = this.Email;
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
        if (this.Rout == 7) {
          this.router.navigateByUrl("/CongressRegistrationSession");
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
  forgot() {
   // alert("e");
    var a;
    this.serverService.forgetPass(this.EmailToResetPassword).subscribe((val) =>
    {
      a = val;
      if (a == 1)
        this.router.navigateByUrl("/ResetPassSuccess");
      else
        this.showWrongEmail = true;
    });

  }

  Support(email: string) {

  }
}
