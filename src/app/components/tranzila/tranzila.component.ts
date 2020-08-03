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
import { CookieService } from 'angular2-cookie';
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
  public successUrlAddress: string = 'http://jewish-studies.b2story.com/success.html';// קישור דף הצלחה
  public failUrlAddress: string = 'http://jewish-studies.b2story.com/fail.html';//קישור דף כישלון	
  public notifyUrlAddress: string = 'http://jewish-studies.b2story.com/notify.html';//קישור ל NOTIFY	

  constructor(public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient, private sanitizer: DomSanitizer, public cookieService: CookieService) {
    this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');
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
      this.purchaseData = this.serverService.setjsonPurchaseData1();
    }
  }



  ngAfterViewInit() {

     const form = this.paymentForm.nativeElement;
    form.action = "https://direct.tranzila.com/bytes2/iframenew.php";
    form['currency'].value = this.serverService.setCurrency().toString();
    form['sum'].value = this.serverService.setTotal();
    form['lang'].value = this.serverService.setLang();
    form['email'].value = this.serverService.setEmail();
    form['json_purchase_data'].value = encodeURIComponent(JSON.stringify(this.purchaseData));
    form.submit();
  }

  ngOnInit() {
 }

}
