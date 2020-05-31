import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private sub: any;
  public Rout: number;

  constructor(public route: ActivatedRoute, public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.sub = this.route.params.subscribe(params => {
      this.Rout = +params['Rout']; // (+) converts string 'id' to a number

    });
  }

  ngOnInit() {
  }
  HaveAccount() {
    if (this.Rout == 2) {
      this.router.navigate(['UserPass', 2]);
    }
    // this.router.navigateByUrl("/UserPass");
    if (this.Rout == 1) {
      this.router.navigate(['UserPass', 6]);

    }
  }
  OpenAccount() {
    if (this.Rout == 2) {
      this.router.navigate(['Registration', 2, '']);

    }
    if (this.Rout == 1) {
      this.router.navigate(['Registration', 2, '']);

    }
  }
}
