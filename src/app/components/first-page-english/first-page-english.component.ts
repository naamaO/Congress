import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page-english',
  templateUrl: './first-page-english.component.html',
  styleUrls: ['./first-page-english.component.css']
})
export class FirstPageEnglishComponent implements OnInit {
  public ShowSingle: boolean = false;
  public ShowSession: boolean = false;
  public showEval: boolean=false;
  public UserNameLogin: string;
  public SessionOrSingle: number;
  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.getUserNameLoginFromServer().subscribe((val) => {
      this.UserNameLogin = val;
    });
    this.serverService.CheckIfInSession().subscribe((val) => {
      this.SessionOrSingle = val;
    });

  }

  ngOnInit() {
  }
  NavEvaluation(event: any) {
    if (this.showEval == false) {

      this.showEval = !this.showEval;
      event.target.classList.remove('open')

      event.target.classList.add('closeBorder')
    }
    else {

      this.showEval = !this.showEval;
      event.target.classList.remove('closeBorder')

      event.target.classList.add('open')
    }
  }
  NavSingleOpen(event:any) {
    if (this.ShowSingle == false) {

      this.ShowSingle = !this.ShowSingle;
      event.target.classList.remove('open')

      event.target.classList.add('closeBorder')
    }
    else {

      this.ShowSingle = !this.ShowSingle;
      event.target.classList.remove('closeBorder')

      event.target.classList.add('open')
    }
  }
  NavSessionOpen(event: any) {
    if (this.ShowSession == false) {

      this.ShowSession = !this.ShowSession;
      event.target.classList.remove('open')

      event.target.classList.add('closeBorder')
    }
    else {

      this.ShowSession = !this.ShowSession;
      event.target.classList.remove('closeBorder')

      event.target.classList.add('open')
    }
  }
  NavSession() {
    if (this.UserNameLogin == "")
      this.router.navigateByUrl("/");

    else
      this.router.navigateByUrl("/CongressRegistrationSession");
  }

  NavSingle() {
    if (this.UserNameLogin == "")
      this.router.navigateByUrl("/");

    else
      if (this.SessionOrSingle == 2) {
        this.router.navigateByUrl("/RegistrationOneEnglish");

      }
      else
        this.router.navigateByUrl("/CongressRegistrationSingle");

  }
}
