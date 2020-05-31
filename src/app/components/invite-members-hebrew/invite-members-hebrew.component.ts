import { Component, OnInit } from '@angular/core';
import { invited } from '../../../classes/invited';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../classes/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-members-hebrew',
  templateUrl: './invite-members-hebrew.component.html',
  styleUrls: ['./invite-members-hebrew.component.css']
})
export class InviteMembersHebrewComponent implements OnInit {
  public Name1: string;
  public Name2: string;
  public Name3: string;
  public Email1: string;
  public Email2: string;
  public Email3: string;
  //public Chairman: string;
  public SessionName: string;
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

  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.DivisionHebrew().subscribe((events) => {
      this.ArrDivision = events;
      this.ShowSub = true;
    });
}
  selectDivision(div: string) {
    this.serverService.SubDivisionHebrew(div).subscribe((events) => {

      this.ArrSubDivision = events;
    });


  }
  ngOnInit() {
  }
  SendInviteMember() {
    this.a = new invited();
    this.b = new invited();
    this.c = new invited();
    this.d = new invited();

    this.a.Name = this.Name1;
    this.a.Email = this.Email1;
    this.a.SessionName = this.SessionName;
    //this.a.Chairman = this.Chairman;
    this.a.Division = this.Division;
    this.a.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.a);
    this.b.Name = this.Name2;
    this.b.Email = this.Email2;
    this.b.SessionName = this.SessionName;
    //this.b.Chairman = this.Chairman;
    this.b.Division = this.Division;
    this.b.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.b);
    this.c.Name = this.Name3;
    this.c.Email = this.Email3;
    this.c.SessionName = this.SessionName;
    //this.c.Chairman = this.Chairman;
    this.c.Division = this.Division;
    this.c.SubDivision = this.SubDivision;
    this.ArrAllInvited.push(this.c);
    this.ArrAllInvited.push(this.d);

    this.serverService.InviteMembers(this.ArrAllInvited);

  }
  selectSubDivision(Sub: string) {

  }

}
