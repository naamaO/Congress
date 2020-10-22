import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { getMaxListeners } from 'process';
import { JsonPipe } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { CookieService as ngxCookieService } from 'ngx-cookie';

import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-tranzila',
  templateUrl: './tranzila.component.html',
  styleUrls: ['./tranzila.component.css']
})

export class TranzilaComponent implements OnInit {
  @ViewChild('paymentForm') paymentForm: ElementRef;

  private purchaseData: any[];
  private sub: any;
  public src: string;
  public srcReal: SafeResourceUrl;
  public Rout: number;
  public successUrlAddress: string = '  http://jewish-studies.b2story.com/success.html';// קישור דף הצלחה
  public failUrlAddress: string = 'http://jewish-studies.b2story.com/fail.html';//קישור דף כישלון	
  public notifyUrlAddress: string = 'http://jewish-studies.b2story.com/notify.html';//קישור ל NOTIFY	
  public contactName: any;

  constructor(public router: ActivatedRoute, public cookieServicengx: ngxCookieService, private serverService: ServerService, private http: HttpClient, private sanitizer: DomSanitizer, public cookieService: CookieService) {
    this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');
    debugger;
    let arrayPurchaseData: any;
    if (this.Rout == 2) {
      arrayPurchaseData = JSON.parse(this.serverService.setjsonPurchaseData2());
      arrayPurchaseData.map(item => {
        item.price = parseInt(item.Total);
        item.Quantity = parseInt(item.Quantity);
        item.NameBook = item.NameBook.trimStart();
        item.NameBook = item.NameBook.trimEnd();
        item.NameBook = item.NameBook.replace(/[^a-zA-Z0-9\u05D0-\u05F2 ]/g, '');
        let temObj = { product_name: item.NameBook, product_quantity: item.Quantity, product_price: item.Total }
        if (this.purchaseData) {
          this.purchaseData.push(temObj);
        } else {
          this.purchaseData = [temObj];
        }
      });
    }
    else {
      debugger;
      this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');

      this.purchaseData = this.serverService.setjsonPurchaseData1();
      this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');

    }
  }



  
  ngOnInit() {
 }
 
  ngAfterViewInit() {
    debugger;
     const form = this.paymentForm.nativeElement;
    form.action = "https://direct.tranzila.com/bytes2/iframenew.php";
    form['currency'].value = this.serverService.setCurrency().toString();
    //form['currency'].value = this.serverService.setCurrency().toString();
    form['sum'].value = this.serverService.setTotal();
    form['lang'].value = this.serverService.setLang();
    form['Ilang'].value = this.serverService.setIlang();
    form['email'].value = this.serverService.setEmail();
    form['contact'].value = this.serverService.setContact();
    form['address'].value = this.serverService.setAddress();
    let isYourAddress = this.serverService.getIsYourAddress();
    console.log("isYourAddress",isYourAddress)
    if(isYourAddress =='no'){
      form['Addresse_name'].value = this.serverService.setContact2();
      form['Shipping_address'].value = this.serverService.setAddress2();
    }
    else if(isYourAddress =='yes'){
      form['Addresse_name'].value = this.serverService.setContact();
      form['Shipping_address'].value = this.serverService.setAddress();
    }
    form['json_purchase_data'].value = encodeURIComponent(JSON.stringify(this.purchaseData));
    this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');

    form.submit();
    this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');

  }

}
