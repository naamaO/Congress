import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl} from '@angular/platform-browser';
import { getMaxListeners } from 'process';


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
  public successUrlAddress: string ='http://jewish-studies.b2story.com/success.html';// קישור דף הצלחה
  public failUrlAddress: string = 'http://jewish-studies.b2story.com/fail.html';//קישור דף כישלון	
  public notifyUrlAddress: string = 'http://jewish-studies.b2story.com/notify.html';//קישור ל NOTIFY	

  constructor(public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient, private sanitizer: DomSanitizer) {

    this.sub = this.router.params.subscribe(params => {
      this.Total = +params['Total']; // (+) converts string 'id' to a number

    });
    this.Total = this.serverService.total;
    this.Currency = this.serverService.currency;
     this.Lang = this.serverService.lang;
     this.Email = this.serverService.email;

    console.log("currency",this.Currency,"lang",this.Lang)//email//address
    //https://direct.tranzila.com/terminalname/iframe.php?lang=il
    this.src = "https://direct.tranzila.com/bytes2/iframenew.php?sum=" 
    + this.Total + "&currency=" + this.Currency + "&lang=" + this.Lang + "&email=" + this.Email + "&cred_type=1";
    this.srcReal = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    // "&notify_url_address=" + this.notifyUrlAddress + + "&success_url_address=" + this.successUrlAddress + "&fail_url_address=" + this.failUrlAddress +
    console.log("this.srcReal",this.srcReal)
    
    
  }

  ngOnInit() {
    // this.serverService.gettranzilaresponce().subscribe((events) => {
    //   console.log("this.srcRealevent",events)

    // this.sub = this.router.params.subscribe(params => {
    //   this.Total = +params['Total']; // (+) converts string 'id' to a number
  
    // });
    // this.src = "https://direct.tranzila.com/bytes2/iframenew.php?sum=1&currency=1&cred_type=1";
  }

}
