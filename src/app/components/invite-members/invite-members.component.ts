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
import { CookieService } from 'ngx-cookie';

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
  @ViewChild('headerHebrewin') headerHebrewin: ElementRef;
  @ViewChild('headerEnglishin') headerEnglishin: ElementRef;
  @ViewChild('headerDivisionin') headerDivisionin: ElementRef;
  @ViewChild('headerSubDivin') headerSubDivin: ElementRef;
  @ViewChild('headerAbsin') headerAbsin: ElementRef;
  @ViewChild('headerT1in') headerT1in: ElementRef;
  @ViewChild('headerT2in') headerT2in: ElementRef;
  @ViewChild('headerT3in') headerT3in: ElementRef;
  @ViewChild('headerT4in') headerT4in: ElementRef;
  @ViewChild('headerTCin') headerTCin: ElementRef;
  @ViewChild('headerN1inf') headerN1inf: ElementRef;
  @ViewChild('headerN2inf') headerN2inf: ElementRef;
  @ViewChild('headerN3inf') headerN3inf: ElementRef;
  @ViewChild('headerN4inf') headerN4inf: ElementRef;
  @ViewChild('headerNCinf') headerNCinf: ElementRef;
  @ViewChild('headerN1inl') headerN1inl: ElementRef;
  @ViewChild('headerN2inl') headerN2inl: ElementRef;
  @ViewChild('headerN3inl') headerN3inl: ElementRef;
  @ViewChild('headerN4inl') headerN4inl: ElementRef;
  @ViewChild('headerNCinl') headerNCinl: ElementRef;
  @ViewChild('headerE1in') headerE1in: ElementRef;
  @ViewChild('headerE2in') headerE2in: ElementRef;
  @ViewChild('headerE3in') headerE3in: ElementRef;
  @ViewChild('headerE4in') headerE4in: ElementRef;
  @ViewChild('headerECin') headerECin: ElementRef;
  @ViewChild('me1') me1: ElementRef;
  @ViewChild('me2') me2: ElementRef;
  @ViewChild('me3') me3: ElementRef;
  @ViewChild('me4') me4: ElementRef;
  @ViewChild('mechair') mechair: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public NumWords: number = 0;

  public RadioEmptyError: string;
  public errMoreThen250: boolean;
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
  public ABS: string;
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
  public me: number=0;
  public numInvited: number = 0;
  public nome: boolean = false;
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
   maxlength(element, maxvalue) {
     var q = element.split(/[\s]+/).length;
     this.NumWords = q;

     if (q > maxvalue) {
       var r = q - maxvalue;
       this.errMoreThen250 = true;
       return false;
     }
     else {
       this.errMoreThen250 = false;
     }
}

  onMe(num: number) {
    this.nome = false;
    if (num == 1) {
    this.me = 1;
      this.me1.nativeElement.checked = true;
      this.me2.nativeElement.checked = false;
      this.me3.nativeElement.checked = false;
      this.me4.nativeElement.checked = false;
      this.mechair.nativeElement.checked = false;
    } if (num == 2) {
      this.me = 2;
      this.me2.nativeElement.checked = true;
      this.me1.nativeElement.checked = false;
      this.me3.nativeElement.checked = false;
      this.me4.nativeElement.checked = false;
      this.mechair.nativeElement.checked = false;
    } if (num == 3) {
      this.me = 3;
      this.me3.nativeElement.checked = true;
      this.me2.nativeElement.checked = false;
      this.me1.nativeElement.checked = false;
      this.me4.nativeElement.checked = false;
      this.mechair.nativeElement.checked = false;
    } if (num == 4) {
      this.me = 4;
      this.me4.nativeElement.checked = true;
      this.me2.nativeElement.checked = false;
      this.me3.nativeElement.checked = false;
      this.me1.nativeElement.checked = false;
      this.mechair.nativeElement.checked = false;
    }
    if (num == 5) {
      this.me = 5;
      this.me4.nativeElement.checked = false;
      this.me2.nativeElement.checked = false;
      this.me3.nativeElement.checked = false;
      this.me1.nativeElement.checked = false;
      this.mechair.nativeElement.checked = true;}
  }
  changeABS() {

  }
  SendInviteMember() {
    this.showErrEmpty = true;
    this.numInvited = 0;
    this.ArrAllInvited = [];
    this.a = new invited();
    this.b = new invited();
    this.c = new invited();
    this.d = new invited();
    this.e = new invited();
    if (this.me == 1) {
      this.e.Email = this.Email1
      this.e.FirstName = this.FirstName1;
      this.e.LastName = this.LastName1;
      this.e.Title = this.Title1;
    } if (this.me == 2) {
      this.e.Email = this.Email2;
      this.e.FirstName = this.FirstName2;
      this.e.LastName = this.LastName2;
      this.e.Title = this.Title2;
    } if (this.me == 3) {
      this.e.Email = this.Email3;
      this.e.FirstName = this.FirstName3;
      this.e.LastName = this.LastName3;
      this.e.Title = this.Title3;
    } if (this.me == 4) {
      this.e.Email = this.Email4;
      this.e.FirstName = this.FirstName4;
      this.e.LastName = this.LastName4;
      this.e.Title = this.Title4;
    }
    if (this.me == 5) {
      this.e.Email = this.ChairmanEmail;
      this.e.FirstName = this.FirstNameChair;
      this.e.LastName = this.LastNameChair;
      this.e.Title = this.TitleChair;
    }
    this.a.TitleChair = this.TitleChair;
    this.a.FirstName = this.FirstName1;
    this.a.LastName = this.LastName1;
    this.a.Email = this.Email1;
    //alert(this.SessionName);
    this.a.ABS = this.ABS;
    this.a.Title = this.Title1;
    this.a.SessionName = this.SessionName;
    this.a.SessionNameEnglish = this.SessionNameEnglish;
    this.a.FirstNameChair = this.FirstNameChair;
    this.a.LastNameChair = this.LastNameChair;
    this.a.ChairmanEmail = this.ChairmanEmail;
    this.a.Division = this.Division;
    this.a.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.a);
    this.b.ABS = this.ABS;
    this.b.TitleChair = this.TitleChair;
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
    this.c.ABS = this.ABS;
    this.c.TitleChair = this.TitleChair;
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
    this.d.ABS = this.ABS;
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
    this.d.TitleChair = this.TitleChair;
    this.d.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.c);
    this.ArrAllInvited.push(this.d);
    this.ArrAllInvited.push(this.e);
    if (this.Email1 != null && this.FirstName1 != null && this.LastName1 != null && this.Title1!=null) this.numInvited++;
    if (this.Email2 != null && this.FirstName2 != null && this.LastName2 != null && this.Title2 != null) this.numInvited++;
    if (this.Email3 != null && this.FirstName3 != null && this.LastName3 != null && this.Title3 != null) this.numInvited++;
    if (this.Email4 != null && this.FirstName4 != null && this.LastName4 != null && this.Title4 != null) this.numInvited++;
    if (this.numInvited>2 && this.me!=0 && this.Division != null && this.SubDivision != null && this.SessionNameEnglish != null) {
      this.serverService.InviteMembers(this.ArrAllInvited);
      __await(1000);

      this.router.navigateByUrl("/Thank1");
    }

    else {
      this.RadioEmptyError = "";
      this.hideThumbnail();
      if (this.me == null || this.me==0 ) {
        this.RadioEmptyError = "Please mark the button next to your name. This will identify you as the person who submits the session.";
        this.nome = true;

      }
     // this.openDialog();
     // alert("e");
      //this.isShowPropArrSession = true;
      if (this.Division == null) {
        this.headerDivision.nativeElement.style.color = "red";
        document.getElementById("headerDivisionin").classList.add("bordercolorRed");
      } if (this.SubDivision == null) {
        this.headerSubDiv.nativeElement.style.color = "red";
        document.getElementById("headerSubDivinin").classList.add("bordercolorRed");
      } if (this.SessionName == null) {
        this.headerHebrew.nativeElement.style.color = "red";
        document.getElementById("headerHebrewin").classList.add("bordercolorRed");
      } if (this.SessionNameEnglish == null) {
        this.headerEnglish.nativeElement.style.color = "red";
        document.getElementById("headerEnglishin").classList.add("bordercolorRed");
      } if (this.ABS == null) {
        this.headerAbs.nativeElement.style.color = "red";
        document.getElementById("headerAbsin").classList.add("allbordercolorRed");
      } if (this.TitleChair == null) {
        this.headerTC.nativeElement.style.color = "red";
        document.getElementById("headerTCin").classList.add("bordercolorRed");
      } if (this.FirstNameChair == null) {
        this.headerNC.nativeElement.style.color = "red";
        document.getElementById("headerNCinf").classList.add("bordercolorRed");
      } if (this.LastNameChair == null) {
        this.headerNC.nativeElement.style.color = "red";
        document.getElementById("headerNCinl").classList.add("bordercolorRed");
      } if (this.Title1 == null) {
        this.headerT1.nativeElement.style.color = "red";
        document.getElementById("headerT1in").classList.add("bordercolorRed");
      } if (this.FirstName1 == null) {
        this.headerN1.nativeElement.style.color = "red";
        document.getElementById("headerN1inf").classList.add("bordercolorRed");
      } if (this.LastName1 == null) {
        this.headerN1.nativeElement.style.color = "red";
        document.getElementById("headerN1inl").classList.add("bordercolorRed");
      } if (this.Title2 == null) {
        this.headerT2.nativeElement.style.color = "red";
        document.getElementById("headerT2in").classList.add("bordercolorRed");
      } if (this.FirstName2 == null) {
        this.headerN2.nativeElement.style.color = "red";
        document.getElementById("headerN2inf").classList.add("bordercolorRed");
      } if (this.LastName2 == null) {
        this.headerN2.nativeElement.style.color = "red";
        document.getElementById("headerN2inl").classList.add("bordercolorRed");
      }if (this.Title3 == null) {
        this.headerT3.nativeElement.style.color = "red";
        document.getElementById("headerT3in").classList.add("bordercolorRed");
      } if (this.FirstName2 == null) {
        this.headerN3.nativeElement.style.color = "red";
        document.getElementById("headerN3inf").classList.add("bordercolorRed");
      } if (this.LastName2 == null) {
        this.headerN3.nativeElement.style.color = "red";
        document.getElementById("headerN3inl").classList.add("bordercolorRed");
      }if (this.Title4 == null) {
        this.headerT4.nativeElement.style.color = "red";
        document.getElementById("headerT4in").classList.add("bordercolorRed");
      } if (this.FirstName4 == null) {
        this.headerN4.nativeElement.style.color = "red";
        document.getElementById("headerN4inf").classList.add("bordercolorRed");
      } if (this.LastName4 == null) {
        this.headerN4.nativeElement.style.color = "red";
        document.getElementById("headerN4inl").classList.add("bordercolorRed");
      } if (this.ChairmanEmail == null) {
        this.headerEC.nativeElement.style.color = "red";
        document.getElementById("headerECin").classList.add("bordercolorRed");
      } if (this.Email1 == null) {
        this.headerE1.nativeElement.style.color = "red";
        document.getElementById("headerE1in").classList.add("bordercolorRed");
      }if (this.Email2 == null) {
        this.headerE2.nativeElement.style.color = "red";
        document.getElementById("headerE2in").classList.add("bordercolorRed");
      }if (this.Email3 == null) {
        this.headerE3.nativeElement.style.color = "red";
        document.getElementById("headerE3in").classList.add("bordercolorRed");
      }if (this.Email4 == null) {
        this.headerE4.nativeElement.style.color = "red";
        document.getElementById("headerE4in").classList.add("bordercolorRed");
      }
    }
  }
  focusHebrew() {
    this.headerHebrew.nativeElement.style.color = "#27b5e5";
  }
  unfocusHebrew() {
    if (this.SessionName != null && this.SessionName != "" && this.SessionName != undefined) {
      document.getElementById("headerHebrewin").classList.remove("bordercolorRed");
      this.headerHebrew.nativeElement.style.color = "gray";
    }
    this.headerHebrew.nativeElement.style.color = "gray";
  }
  focusAbs() {
    this.headerAbs.nativeElement.style.color = "#27b5e5";
  }
  unfocusAbs() {
    if (this.ABS != null && this.ABS != "" && this.ABS != undefined) {
      document.getElementById("headerAbsin").classList.remove("allbordercolorRed");
      this.headerAbs.nativeElement.style.color = "gray";
    }
   this.maxlength(this.ABS, 250);
    this.headerAbs.nativeElement.style.color = "gray";
  }
  focusEnglish() {
    this.headerEnglish.nativeElement.style.color = "#27b5e5";
  }
  unfocusEnglish() {
    if (this.SessionNameEnglish != null && this.SessionNameEnglish != "" && this.SessionNameEnglish != undefined) {
      document.getElementById("headerEnglishin").classList.remove("bordercolorRed");
      this.headerEnglish.nativeElement.style.color = "gray";
    }
    this.headerEnglish.nativeElement.style.color = "gray";
  }
  focusDivision() {
    this.headerDivision.nativeElement.style.color = "#27b5e5";
  }
  unfocusDivision() {
    if (this.Division != null && this.Division != "" && this.Division != undefined) {
      document.getElementById("headerDivisionin").classList.remove("bordercolorRed");
      this.headerDivision.nativeElement.style.color = "gray";
    }
    this.headerDivision.nativeElement.style.color = "gray";
  }
  focusSubDiv() {
    this.headerSubDiv.nativeElement.style.color = "#27b5e5";
  }
  unfocusSubDiv() {
    if (this.SubDivision != null && this.SubDivision != "" && this.SubDivision != undefined) {
      document.getElementById("headerSubDivinin").classList.remove("bordercolorRed");
      this.headerSubDiv.nativeElement.style.color = "gray";
    }
    this.headerSubDiv.nativeElement.style.color = "gray";
  }
  focusNC() {
    this.headerNC.nativeElement.style.color = "#27b5e5";
  }
  unfocusNCf() {
    if (this.FirstNameChair != null && this.FirstNameChair != "" && this.FirstNameChair != undefined) {
      document.getElementById("headerNCinf").classList.remove("bordercolorRed");
      this.headerNC.nativeElement.style.color = "gray";
    }
    this.headerNC.nativeElement.style.color = "gray";
  } unfocusNCl() {
    if (this.LastNameChair != null && this.LastNameChair != "" && this.LastNameChair != undefined) {
      document.getElementById("headerNCinl").classList.remove("bordercolorRed");
      this.headerNC.nativeElement.style.color = "gray";
    }
    this.headerNC.nativeElement.style.color = "gray";
  }
  focusN4() {
    this.headerN4.nativeElement.style.color = "#27b5e5";
  }
  unfocusN4f() {
    if (this.FirstName4 != null && this.FirstName4 != "" && this.FirstName4 != undefined) {
      document.getElementById("headerN4inf").classList.remove("bordercolorRed");
      this.headerN4.nativeElement.style.color = "gray";
    }
    this.headerN4.nativeElement.style.color = "gray";
  } unfocusN4l() {
    if (this.LastName4 != null && this.LastName4 != "" && this.LastName4 != undefined) {
      document.getElementById("headerN4inl").classList.remove("bordercolorRed");
      this.headerN4.nativeElement.style.color = "gray";
    }
    this.headerN4.nativeElement.style.color = "gray";
  }
  focusN3() {
    this.headerN3.nativeElement.style.color = "#27b5e5";
  }
  unfocusN3f() {
    if (this.FirstName3 != null && this.FirstName3 != "" && this.FirstName3 != undefined) {
      document.getElementById("headerN3inf").classList.remove("bordercolorRed");
      this.headerN3.nativeElement.style.color = "gray";
    }
    this.headerN3.nativeElement.style.color = "gray";
  }
  unfocusN3l() {
    if (this.LastName3 != null && this.LastName3 != "" && this.LastName3 != undefined) {
      document.getElementById("headerN3inl").classList.remove("bordercolorRed");
      this.headerN3.nativeElement.style.color = "gray";
    }
    this.headerN3.nativeElement.style.color = "gray";
  }
  focusN2() {
    this.headerN2.nativeElement.style.color = "#27b5e5";
  }
  unfocusN2f() {
    if (this.FirstName2 != null && this.FirstName2 != "" && this.FirstName2 != undefined) {
      document.getElementById("headerN2inf").classList.remove("bordercolorRed");
      this.headerN2.nativeElement.style.color = "gray";
    }
    this.headerN2.nativeElement.style.color = "gray";
  }
  unfocusN2l() {
    if (this.LastName2 != null && this.LastName2 != "" && this.LastName2 != undefined) {
      document.getElementById("headerN2inl").classList.remove("bordercolorRed");
      this.headerN2.nativeElement.style.color = "gray";
    }
    this.headerN2.nativeElement.style.color = "gray";
  }
  focusN1() {
    this.headerN1.nativeElement.style.color = "#27b5e5";
  }
  unfocusN1f() {
    if (this.FirstName1 != null && this.FirstName1 != "" && this.FirstName1 != undefined) {
      document.getElementById("headerN1inf").classList.remove("bordercolorRed");
      this.headerN1.nativeElement.style.color = "gray";
    }
    this.headerN1.nativeElement.style.color = "gray";
  }
  unfocusN1l() {
    if (this.LastName1 != null && this.LastName1 != "" && this.LastName1 != undefined) {
      document.getElementById("headerN1inl").classList.remove("bordercolorRed");
      this.headerN1.nativeElement.style.color = "gray";
    }
    this.headerN1.nativeElement.style.color = "gray";
  }
  focusEC() {
    this.headerEC.nativeElement.style.color = "#27b5e5";
  }
  unfocusEC() {
    if (this.ChairmanEmail != null && this.ChairmanEmail != "" && this.ChairmanEmail != undefined) {
      document.getElementById("headerECin").classList.remove("bordercolorRed");
      this.headerEC.nativeElement.style.color = "gray";
    }
    this.headerEC.nativeElement.style.color = "gray";
  }
  focusE4() {
    this.headerE4.nativeElement.style.color = "#27b5e5";
  }
  unfocusE4() {
    if (this.Email4 != null && this.Email4 != "" && this.Email4 != undefined) {
      document.getElementById("headerE4in").classList.remove("bordercolorRed");
      this.headerE4.nativeElement.style.color = "gray";
    }
    this.headerE4.nativeElement.style.color = "gray";
  } focusE3() {
    this.headerE3.nativeElement.style.color = "#27b5e5";
  }
  unfocusE3() {
    if (this.Email3 != null && this.Email3 != "" && this.Email3 != undefined) {
      document.getElementById("headerE3in").classList.remove("bordercolorRed");
      this.headerE3.nativeElement.style.color = "gray";
    }
    this.headerE3.nativeElement.style.color = "gray";
  } focusE2() {
    this.headerE2.nativeElement.style.color = "#27b5e5";
  }
  unfocusE2() {
    if (this.Email2 != null && this.Email2 != "" && this.Email2 != undefined) {
      document.getElementById("headerE2in").classList.remove("bordercolorRed");
      this.headerE2.nativeElement.style.color = "gray";
    }
    this.headerE2.nativeElement.style.color = "gray";
  } focusE1() {
    this.headerE1.nativeElement.style.color = "#27b5e5";
  }
  unfocusE1() {
    if (this.Email1 != null && this.Email1 != "" && this.Email1 != undefined) {
      document.getElementById("headerE1in").classList.remove("bordercolorRed");
      this.headerE1.nativeElement.style.color = "gray";
    }
    this.headerE1.nativeElement.style.color = "gray";
  }
  focusT2() {
    if (this.Title2 != null && this.Title2 != "" && this.Title2 != undefined) {
      document.getElementById("headerT2in").classList.remove("bordercolorRed");
      this.headerT2.nativeElement.style.color = "gray";
    }
    this.headerT2.nativeElement.style.color = "#27b5e5";
  }
  unfocusT2() {
    this.headerT2.nativeElement.style.color = "gray";
  } focusTC() {
    this.headerTC.nativeElement.style.color = "#27b5e5";
  }
  unfocusTC() {
    if (this.TitleChair != null && this.TitleChair != "" && this.TitleChair != undefined) {
      document.getElementById("headerTCin").classList.remove("bordercolorRed");
      this.headerTC.nativeElement.style.color = "gray";
    }
    this.headerTC.nativeElement.style.color = "gray";
  }
  focusT1() {
    this.headerT1.nativeElement.style.color = "#27b5e5";
  }
  unfocusT1() {
    if (this.Title1 != null && this.Title1 != "" && this.Title1 != undefined) {
      document.getElementById("headerT1in").classList.remove("bordercolorRed");
      this.headerT1.nativeElement.style.color = "gray";
    }
    this.headerT1.nativeElement.style.color = "gray";
  } focusT4() {
    this.headerT4.nativeElement.style.color = "#27b5e5";
  }
  unfocusT4() {
    if (this.Title4 != null && this.Title4 != "" && this.Title4 != undefined) {
      document.getElementById("headerT4in").classList.remove("bordercolorRed");
      this.headerT4.nativeElement.style.color = "gray";
    }
    this.headerT4.nativeElement.style.color = "gray";
  } focusT3() {
    this.headerT3.nativeElement.style.color = "#27b5e5";
  }
  unfocusT3() {
    if (this.Title3 != null && this.Title3 != "" && this.Title3 != undefined) {
      document.getElementById("headerT3in").classList.remove("bordercolorRed");
      this.headerT3.nativeElement.style.color = "gray";
    }
    this.headerT3.nativeElement.style.color = "gray";
  }
}

