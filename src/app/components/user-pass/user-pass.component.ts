import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UserPass } from '../../../classes/UserPass';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-user-pass',
  templateUrl: './user-pass.component.html',
  styleUrls: ['./user-pass.component.css']
})
export class UserPassComponent implements OnInit {
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
  constructor(public route: ActivatedRoute, public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {

    this.sub = this.route.params.subscribe(params => {
      this.Rout = +params['Rout']; // (+) converts string 'id' to a number

    });
  }
  setCookie(UaerName: string) {
    this.cookieService.put('UserName', UaerName);
  }
  ngOnInit() {
  }
  forget() {
    this.item = new UserPass()
    this.item.Email = this.Email;
    if (this.Email != '') {
      this.ShowErrorEmail = false;

      this.serverService.forgetPass(this.item);
    }
    else {
      this.ShowErrorEmail = true;
    }
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
