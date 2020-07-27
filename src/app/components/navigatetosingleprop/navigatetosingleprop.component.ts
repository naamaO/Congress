import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigatetosingleprop',
  templateUrl: './navigatetosingleprop.component.html',
  styleUrls: ['./navigatetosingleprop.component.css']
})
export class NavigatetosinglepropComponent implements OnInit {
  //public Rout: number;
  //private sub: any;

  constructor(public route: ActivatedRoute, public router: Router) {
    //this.sub = this.route.params.subscribe(params => {
    //  this.Rout = +params['Rout']; 

    //});
  }

  ngOnInit() {
  }
  UserPass() {
    this.router.navigateByUrl("/UserPass/3");

  }
  PropSingle() {
    this.router.navigateByUrl("/CongressRegistrationSingle/1");
  }
}
