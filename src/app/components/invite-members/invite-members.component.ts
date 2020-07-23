import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { invited } from '../../../classes/invited';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../classes/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.css']
})
export class InviteMembersComponent implements OnInit {
  @ViewChild("testInput") testInput;
  @ViewChild('myModal') openModal: ElementRef;
  @ViewChild('headerHebrew') headerHebrew: ElementRef;
  @ViewChild('headerEnglish') headerEnglish: ElementRef;
  @ViewChild('headerDivision') headerDivision: ElementRef;
  @ViewChild('headerSubDiv') headerSubDiv: ElementRef;
  @ViewChild('headerAbs') headerAbs: ElementRef;
  @ViewChild('headerT1') headerT1: ElementRef;
  @ViewChild('headerT2') headerT2: ElementRef;
  @ViewChild('headerT3') headerT3: ElementRef;
  @ViewChild('headerT4') headerT4: ElementRef;
  @ViewChild('headerTC') headerTC: ElementRef;
  @ViewChild('headerN1') headerN1: ElementRef;
  @ViewChild('headerN2') headerN2: ElementRef;
  @ViewChild('headerN3') headerN3: ElementRef;
  @ViewChild('headerN4') headerN4: ElementRef;
  @ViewChild('headerNC') headerNC: ElementRef;
  @ViewChild('headerE1') headerE1: ElementRef;
  @ViewChild('headerE2') headerE2: ElementRef;
  @ViewChild('headerE3') headerE3: ElementRef;
  @ViewChild('headerE4') headerE4: ElementRef;
  @ViewChild('headerEC') headerEC: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public myControl = new FormControl();
  public isShowPropArrSession: boolean;
  public showErrEmpty: boolean;
  public FirstName1: string;
  public LastName1: string;
  public FirstName2: string;
  public LastName2: string;
  public FirstName3: string;
  public LastName3: string;
  public FirstName4: string;
  public LastName4: string;
  public Email1: string;
  public Email2: string;
  public Email3: string;
  public Email4: string;
  public Title1: string;
  public Title2: string;
  public Title3: string;
  public Title4: string;
  public TitleChair: string;
  public LastNameChair: string;
  public FirstNameChair: string;
  public ChairmanEmail: string;
  public SessionName: string;
  public SessionNameEnglish: string;
  public ArrAllInvited: invited[] = [];
  public a: invited;
  public b: invited;
  public c: invited;
  public d: invited;
  public e: invited;
  public ArrDivision: string[];
  public ArrSubDivision: string[];
  public ShowSub: boolean;
  public Division: string;
  public SubDivision: string;
  public aa: number;
  public numInvited: number=0;
  constructor(public cookieService: CookieService,
    public router: Router, private serverService: ServerService, private http: HttpClient) {
   
      this.serverService.DivisionEnglish().subscribe((events) => {
      this.ArrDivision = events;
      this.ShowSub = true;
    });
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
   hideThumbnail(): boolean {
    return true;
}
  ngAfterViewInit() {
    this.testInput.nativeElement.focus();
  }
  ngOnInit() {
    $("input").focus(function () {
      $("header").css("color", "#27b5e5").fadeOut(2000);
    });
  }
  selectDivision(div: string) {
    this.serverService.SubDivisionEnglish(div).subscribe((events) => {

      this.ArrSubDivision = events;
    });
  }
  // selectSubDivision(subDiv: string) {
  //   this.serverService.GetLanguageHebrew(subDiv).subscribe((events) => {

  //     this.ArrSubDivision = events;
  //   });
  //}
  SendInviteMember() {
    this.numInvited = 0;
    this.ArrAllInvited = [];
    this.a = new invited();
    this.b = new invited();
    this.c = new invited();
    this.d = new invited();
    this.e = new invited();
    this.e.Email = (this.getCookie('UserName'));
    this.a.FirstName = this.FirstName1;
    this.a.LastName = this.LastName1;
    this.a.Email = this.Email1;
    //alert(this.SessionName);
    this.a.Title = this.Title1;
    this.a.SessionName = this.SessionName;
    this.a.SessionNameEnglish = this.SessionNameEnglish;
    this.a.FirstNameChair = this.FirstNameChair;
    this.a.LastNameChair = this.LastNameChair;
    this.a.ChairmanEmail = this.ChairmanEmail;
    this.a.Division = this.Division;
    this.a.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.a);
    this.b.Title = this.Title2;
    this.b.FirstName = this.FirstName2;
    this.b.LastName = this.LastName2;
    this.b.Email = this.Email2;
    this.b.SessionName = this.SessionName;
    this.b.SessionNameEnglish = this.SessionNameEnglish;
    this.b.FirstNameChair = this.FirstNameChair;
    this.b.LastNameChair = this.LastNameChair;
    this.b.ChairmanEmail = this.ChairmanEmail;
    this.b.Division = this.Division;
    this.b.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.b);
    this.c.FirstName = this.FirstName3;
    this.c.LastName = this.LastName3;
    this.c.Email = this.Email3;
    this.c.Title = this.Title3;
    this.c.SessionName = this.SessionName;
    this.c.SessionNameEnglish = this.SessionNameEnglish;
    this.c.FirstNameChair = this.FirstNameChair;
    this.c.LastNameChair = this.LastNameChair;
    this.c.ChairmanEmail = this.ChairmanEmail;
    this.c.Division = this.Division;
    this.c.SubDivision = this.SubDivision;
    this.d.FirstName = this.FirstName4;
    this.d.LastName = this.LastName4;
    this.d.Email = this.Email4;
    this.d.SessionName = this.SessionName;
    this.d.SessionNameEnglish = this.SessionNameEnglish;
    this.d.FirstNameChair = this.FirstNameChair;
    this.d.LastNameChair = this.LastNameChair;
    this.d.ChairmanEmail = this.ChairmanEmail;
    this.d.Division = this.Division;
    this.d.Title = this.Title4;
    this.d.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.c);
    this.ArrAllInvited.push(this.d);
    this.ArrAllInvited.push(this.e);
    if (this.Email1 != null && this.FirstName1 != null && this.LastName1 != null && this.Title1!=null) this.numInvited++;
    if (this.Email2 != null && this.FirstName2 != null && this.LastName2 != null && this.Title2 != null) this.numInvited++;
    if (this.Email3 != null && this.FirstName3 != null && this.LastName3 != null && this.Title3 != null) this.numInvited++;
    if (this.Email4 != null && this.FirstName4 != null && this.LastName4 != null && this.Title4 != null) this.numInvited++;
    if (this.numInvited>2 && this.Division != null && this.SubDivision != null && this.SessionNameEnglish != null) {
      this.serverService.InviteMembers(this.ArrAllInvited);
      __await(1000);

      this.router.navigateByUrl("/Thank1");
    }

    else {
      this.hideThumbnail();
     // this.openDialog();
     // alert("e");
      //this.isShowPropArrSession = true;
      this.showErrEmpty = true;
    }
  }
  focusHebrew() {
    this.headerHebrew.nativeElement.style.color = "#27b5e5";
  }
  unfocusHebrew() {
    this.headerHebrew.nativeElement.style.color = "gray";
  } focusAbs() {
    this.headerAbs.nativeElement.style.color = "#27b5e5";
  }
  unfocusAbs() {
    this.headerAbs.nativeElement.style.color = "gray";
  }
  focusEnglish() {
    this.headerEnglish.nativeElement.style.color = "#27b5e5";
  }
  unfocusEnglish() {
    this.headerEnglish.nativeElement.style.color = "gray";
  }
  focusDivision() {
    this.headerDivision.nativeElement.style.color = "#27b5e5";
  }
  unfocusDivision() {
    this.headerDivision.nativeElement.style.color = "gray";
  }
  focusSubDiv() {
    this.headerSubDiv.nativeElement.style.color = "#27b5e5";
  }
  unfocusSubDiv() {
    this.headerSubDiv.nativeElement.style.color = "gray";
  }
  focusNC() {
    this.headerNC.nativeElement.style.color = "#27b5e5";
  }
  unfocusNC() {
    this.headerNC.nativeElement.style.color = "gray";
  } focusN4() {
    this.headerN4.nativeElement.style.color = "#27b5e5";
  }
  unfocusN4() {
    this.headerN4.nativeElement.style.color = "gray";
  } focusN3() {
    this.headerN3.nativeElement.style.color = "#27b5e5";
  }
  unfocusN3() {
    this.headerN3.nativeElement.style.color = "gray";
  } focusN2() {
    this.headerN2.nativeElement.style.color = "#27b5e5";
  }
  unfocusN2() {
    this.headerN2.nativeElement.style.color = "gray";
  } focusN1() {
    this.headerN1.nativeElement.style.color = "#27b5e5";
  }
  unfocusN1() {
    this.headerN1.nativeElement.style.color = "gray";
  } focusEC() {
    this.headerEC.nativeElement.style.color = "#27b5e5";
  }
  unfocusEC() {
    this.headerEC.nativeElement.style.color = "gray";
  } focusE4() {
    this.headerE4.nativeElement.style.color = "#27b5e5";
  }
  unfocusE4() {
    this.headerE4.nativeElement.style.color = "gray";
  } focusE3() {
    this.headerE3.nativeElement.style.color = "#27b5e5";
  }
  unfocusE3() {
    this.headerE3.nativeElement.style.color = "gray";
  } focusE2() {
    this.headerE2.nativeElement.style.color = "#27b5e5";
  }
  unfocusE2() {
    this.headerE2.nativeElement.style.color = "gray";
  } focusE1() {
    this.headerE1.nativeElement.style.color = "#27b5e5";
  }
  unfocusE1() {
    this.headerE1.nativeElement.style.color = "gray";
  }
  focusT2() {
    this.headerT2.nativeElement.style.color = "#27b5e5";
  }
  unfocusT2() {
    this.headerT2.nativeElement.style.color = "gray";
  } focusTC() {
    this.headerTC.nativeElement.style.color = "#27b5e5";
  }
  unfocusTC() {
    this.headerTC.nativeElement.style.color = "gray";
  }
  focusT1() {
    this.headerT1.nativeElement.style.color = "#27b5e5";
  }
  unfocusT1() {
    this.headerT1.nativeElement.style.color = "gray";
  } focusT4() {
    this.headerT4.nativeElement.style.color = "#27b5e5";
  }
  unfocusT4() {
    this.headerT4.nativeElement.style.color = "gray";
  } focusT3() {
    this.headerT3.nativeElement.style.color = "#27b5e5";
  }
  unfocusT3() {
    this.headerT3.nativeElement.style.color = "gray";
  }
}

