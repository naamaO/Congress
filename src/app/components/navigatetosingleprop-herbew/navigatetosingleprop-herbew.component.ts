import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigatetosingleprop-herbew',
  templateUrl: './navigatetosingleprop-herbew.component.html',
  styleUrls: ['./navigatetosingleprop-herbew.component.css']
})
export class NavigatetosinglepropHerbewComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
  }
  UserPass() {
    this.router.navigateByUrl("/UserPass/3");

  }
  PropSingle() {
    this.router.navigateByUrl("/CongressRegistrationSingle/1");
  }
}
