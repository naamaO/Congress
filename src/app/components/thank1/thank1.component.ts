import { Component, OnInit, NgZone } from '@angular/core';
import { book } from '../../../classes/classItem'
import { text } from '@angular/core/src/render3';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shoppingCart } from '../../../classes/shoppingCart';
import { ChangeDetectorRef } from '@angular/core';
import { Name } from 'src/classes/Name';
@Component({
  selector: 'app-thank1',
  templateUrl: './thank1.component.html',
  styleUrls: ['./thank1.component.css']
})
export class Thank1Component implements OnInit {
  public Name: Name;
  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.getName().subscribe(val => this.Name = val);

  }

  ngOnInit() {
  }

}
