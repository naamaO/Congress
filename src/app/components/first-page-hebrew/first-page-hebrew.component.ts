import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page-hebrew',
  templateUrl: './first-page-hebrew.component.html',
  styleUrls: ['./first-page-hebrew.component.css']
})
export class FirstPageHebrewComponent implements OnInit {

  public UserNameLogin: string;
  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.getUserNameLoginFromServer().subscribe((val) => {
      this.UserNameLogin = val;
    });

  }
  ngOnInit() {
  }
  NavSession() {
    if (this.UserNameLogin == "")
      this.router.navigateByUrl("/");

    else
    this.router.navigateByUrl("/CongressRegistrationSessionHebrew");
  }
  NavSingle() {
    if (this.UserNameLogin == "")
      this.router.navigateByUrl("/");

    else
    this.router.navigateByUrl("/RegistrationOneHebrew");
  }
}
