import { Component, OnInit } from '@angular/core';
import { invited } from '../../../classes/invited';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../classes/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { __await } from 'tslib';

@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.css']
})
export class InviteMembersComponent implements OnInit {
  public Name1: string;
  public Name2: string;
  public Name3: string;
  public Name4: string;
  public Email1: string;
  public Email2: string;
  public Email3: string;
  public Email4: string;
  public ChairmanName: string;
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
  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.DivisionEnglish().subscribe((events) => {
      this.ArrDivision = events;
      this.ShowSub = true;
    });
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
    this.a.Name = this.Name1;
    this.a.Email = this.Email1;
    //alert(this.SessionName);
    this.a.SessionName = this.SessionName;
    this.a.SessionNameEnglish = this.SessionNameEnglish;
    this.a.ChairmanName = this.ChairmanName;
    this.a.ChairmanEmail = this.ChairmanEmail;
    this.a.Division = this.Division;
    this.a.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.a);
    this.b.Name = this.Name2;
    this.b.Email = this.Email2;
    this.b.SessionName = this.SessionName;
    this.b.SessionNameEnglish = this.SessionNameEnglish;
    this.b.ChairmanName = this.ChairmanName;
    this.b.ChairmanEmail = this.ChairmanEmail;
    this.b.Division = this.Division;
    this.b.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.b);
    this.c.Name = this.Name3;
    this.c.Email = this.Email3;
    this.c.SessionName = this.SessionName;
    this.c.SessionNameEnglish = this.SessionNameEnglish;
    this.c.ChairmanName = this.ChairmanName;
    this.c.ChairmanEmail = this.ChairmanEmail;
    this.c.Division = this.Division;
    this.c.SubDivision = this.SubDivision;
    this.d.Name = this.Name4;
    this.d.Email = this.Email4;
    this.d.SessionName = this.SessionName;
    this.d.SessionNameEnglish = this.SessionNameEnglish;
    this.d.ChairmanName = this.ChairmanName;
    this.d.ChairmanEmail = this.ChairmanEmail;
    this.d.Division = this.Division;
    this.d.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.c);
    this.ArrAllInvited.push(this.d);
    this.serverService.InviteMembers(this.ArrAllInvited);
    __await(1000);

    this.router.navigateByUrl("/Thank1");

  }
}
