import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl} from '@angular/platform-browser';
import { getMaxListeners } from 'process';
import { JsonPipe } from '@angular/common';
import { CookieService } from 'angular2-cookie';


@Component({
  selector: 'app-tranzila',
  templateUrl: './tranzila.component.html',
  styleUrls: ['./tranzila.component.css']
})
export class TranzilaComponent implements OnInit {
  // @Input() currency: number;
  public Currency: number;
  public Total: number;
  public Lang: string;
  private sub: any;
  public src: string;
  public srcReal: SafeResourceUrl;
  public Email: string;
  public jsonPurchaseData: any=[];
  public Rout: number;
  public successUrlAddress: string ='http://jewish-studies.b2story.com/success.html';// קישור דף הצלחה
  public failUrlAddress: string = 'http://jewish-studies.b2story.com/fail.html';//קישור דף כישלון	
  public notifyUrlAddress: string = 'http://jewish-studies.b2story.com/notify.html';//קישור ל NOTIFY	

  constructor(public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient, private sanitizer: DomSanitizer,public cookieService: CookieService) {

    // this.sub = this.router.params.subscribe(params => {
    //   this.Total = +params['Total']; // (+) converts string 'id' to a number
    // });
    this.Total = this.serverService.setTotal();
    this.Currency = this.serverService.setCurrency();
     this.Lang = this.serverService.setLang();
     this.Email = this.serverService.email;
     this.Rout = +this.cookieService.get('RoutTranzilaSuccessJewishStudies');
 //   console.log("currency",this.Currency,"lang",this.Lang)//email//address
    //u71=1
    //json_purchase_data=jsonPurchaseData
    // this.jsonPurchaseData = [{"product_name":"product","product_quantity":1,"product_price":1},
    //          {"product_name":"product2","product_quantity":1,"product_price":1},
    //          {"product_name":"product3","product_quantity":1,"product_price":1},
    //          {"product_name":"product4","product_quantity":1,"product_price":1},
    //          {"product_name":"product5","product_quantity":1,"product_price":1}]
    let  arrayPurchaseData :any;
    if(this.Rout==2){
    arrayPurchaseData = JSON.parse(this.serverService.setjsonPurchaseData2());
    arrayPurchaseData.map(item => {
      item.Quantity = parseInt(item.Quantity);
      item.Quantity = parseInt(item.Total);
      item.NameBook = item.NameBook.trimEnd();
     let temObj = {product_name:item.NameBook,product_quantity:item.Quantity,product_price:item.Total}
     this.jsonPurchaseData.push(temObj);
    });
  }
  else{
    this.jsonPurchaseData = JSON.parse(this.serverService.setjsonPurchaseData1());
   // arrayPurchaseData.map(item => {
      //item.Price = parseInt(item.product_price);
      //item.MemberType = item.MemberType.trimEnd();
    // let temObj = {product_name:item.MemberType,product_quantity:1,product_price:item.Price}
    // this.jsonPurchaseData.push(temObj);
   // });
  }
    this.jsonPurchaseData = JSON.stringify(this.jsonPurchaseData);
       console.log("this.jsonPurchaseData",this.jsonPurchaseData);
       console.log("this.jsonPurchaseData",encodeURIComponent(this.jsonPurchaseData));
       this.jsonPurchaseData = encodeURIComponent(this.jsonPurchaseData);
    //https://direct.tranzila.com/terminalname/iframe.php?lang=il
    this.src = "https://direct.tranzila.com/bytes2/iframenew.php?sum=" 
    + this.Total + "&currency=" + this.Currency + "&lang=" + this.Lang + "&email=" + this.Email + "&cred_type=1";
    this.srcReal = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    // +"&u71=1" + "&json_purchase_data=" + this.jsonPurchaseData "&notify_url_address=" + this.notifyUrlAddress + + "&success_url_address=" + this.successUrlAddress + "&fail_url_address=" + this.failUrlAddress +
    console.log("this.srcReal",this.srcReal)
//ichecknrun()
//script array של 
  }
  // pay(){
  // this.serverService.getTranzila().subscribe((resp) => {
  //   console.log("resp",resp)
  // });
//}

  ngOnInit() {
    // this.serverService.gettranzilaresponce().subscribe((events) => {
    //   console.log("this.srcRealevent",events)

    // this.sub = this.router.params.subscribe(params => {
    //   this.Total = +params['Total']; // (+) converts string 'id' to a number
  
    // });
    // this.src = "https://direct.tranzila.com/bytes2/iframenew.php?sum=1&currency=1&cred_type=1";
  }

}
