import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { book } from '../../../classes/classItem'
//import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-tranzila',
  templateUrl: './tranzila.component.html',
  styleUrls: ['./tranzila.component.css']
})
export class TranzilaComponent implements OnInit {
  public Total: number;
  private sub: any;
  public src: string;
  public srcReal: SafeResourceUrl;
  constructor(public router: ActivatedRoute, private serverService: ServerService, private http: HttpClient, private sanitizer: DomSanitizer) {

    this.sub = this.router.params.subscribe(params => {
      this.Total = +params['Total']; // (+) converts string 'id' to a number

    });
    //https://direct.tranzila.com/terminalname/iframe.php?lang=il
    this.src = "https://direct.tranzila.com/bytes2/iframenew.php?sum=" + this.Total + "&currency=1&cred_type=1";
    this.srcReal = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  ngOnInit() {

    this.sub = this.router.params.subscribe(params => {
      this.Total = +params['Total']; // (+) converts string 'id' to a number
  
    });
    this.src = "https://direct.tranzila.com/bytes2/iframenew.php?sum=1&currency=1&cred_type=1";
  }

}
