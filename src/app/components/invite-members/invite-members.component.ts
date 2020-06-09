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
@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.css']
})
export class InviteMembersComponent implements OnInit {
  @ViewChild("testInput") testInput;
  @ViewChild('myModal') openModal: ElementRef;
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
  public ArrDivision: string[];
  public ArrSubDivision: string[];
  public ShowSub: boolean;
  public Division: string;
  public SubDivision: string;
  public aa: number;
  constructor(
    public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.DivisionEnglish().subscribe((events) => {
      this.ArrDivision = events;
      this.ShowSub = true;
    });
  }

 
   hideThumbnail(): boolean {
    return true;
}
  ngAfterViewInit() {
    this.testInput.nativeElement.focus();
  }
  ngOnInit() {
  }
  selectDivision(div: string) {
    this.serverService.SubDivisionEnglish(div).subscribe((events) => {

      this.ArrSubDivision = events;
    });
  }

  SendInviteMember() {
    this.a = new invited();
    this.b = new invited();
    this.c = new invited();
    this.d = new invited();
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
    if (this.Email1 != null && this.Email2 != null && this.Email3 != null && this.Email4 != null
      && this.FirstName1 != null && this.FirstName2 != null && this.FirstName3 != null && this.FirstName4 != null
      && this.LastName1 != null && this.LastName2 != null && this.LastName3 != null && this.LastName4 != null
      && this.Division != null && this.SubDivision != null && this.SessionNameEnglish != null) {
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

}

