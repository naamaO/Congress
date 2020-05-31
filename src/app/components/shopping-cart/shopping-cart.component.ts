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
import { __await } from 'tslib';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public DB: shoppingCart[];
  public Total: number;

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef,public router: Router,private serverService: ServerService, private http: HttpClient) {
    this.serverService.getAllDBShoppingCart().subscribe((val) => {
    this.DB = val;
      for (var i = 0; i < this.DB.length; i++) {
        if (this.DB[i].SallePrice == 0)
          this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
        else
          this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;

      }
    });
    this.serverService.getTotalPrice().subscribe(val => this.Total = val);

    //this.serverService.getAllDBShoppingCart().subscribe((events) => {
    //  this.DB = events;
    //  alert(this.DB.length);
    //  alert(this.DB[0].NameBook)
    //  alert(this.DB[1].NameBook)
    //});
}
  changePlaying() {
    __await (1000);
    this.ngZone.run(() => {
      this.serverService.getAllDBShoppingCart().subscribe((val) => {
        this.DB = val;
        for (var i = 0; i < this.DB.length; i++) {
          if (this.DB[i].SallePrice == 0)
            this.DB[i].Total = this.DB[i].PriceBook * this.DB[i].Quantity;
          else
            this.DB[i].Total = this.DB[i].SallePrice * this.DB[i].Quantity;

        }
      });
      this.serverService.getTotalPrice().subscribe(val => this.Total = val);
    });
  }
  ngOnInit() {
  }
  AddQuantity(item: shoppingCart) {
    //alert(item.NameBook + "uu");

    this.serverService.postAddQuantity(item)//.subscribe((events) => {
     //
      //this.router.navigateByUrl("/ShoppingCart");
    this.changePlaying();
    this.changePlaying();    //  alert(item.NameBook + "uu");
    //});

  }
  RemoveQuantity(item: shoppingCart) {
    this.serverService.postRemoveQuantity(item)//.subscribe((events) => {
     // this.router.navigateByUrl("/ShoppingCart");
    //location.reload()
    this.changePlaying();
    this.changePlaying();

      // alert(this.t + "uu");
   // });
  }
  deleteQuantity(item: shoppingCart) {
    this.serverService.postdeleteQuantity(item);//.subscribe((events) => {
    // this.router.navigateByUrl("/ShoppingCart");
    //location.reload()
    this.changePlaying();
    this.changePlaying();
  }
  SendToTranzila() {
    this.router.navigate(['Pay', this.Total]);
  }
  SendToNew() {
    this.router.navigateByUrl("/new");

  }
}
