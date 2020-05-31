import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { Judges } from '../../../classes/Judges';
import { Drafts } from 'src/classes/Drafts';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {
  public Value: string;
  public prop: Judges;
  public Values: string[];
  public field: string;
  public Fields: string[] = ['FirstName', 'LastName', 'Division', 'SubDivision', 'TitleEnglish', 'TitleHebrew', 'Language', 'Keywords', 'SessionName', 'Chairman', 'Status', 'Remarks'];
  public DB: Proposals[];
  public PropJudges: Drafts[];
  public isShowProp: boolean;
  public itempropID: number;
  public oneProp: Drafts;
  public Chairman: string;
  public SessionName: string;
  public Status: string;
  public Remarks: string;
  public newProp: Drafts;
  public ArrDivision: string[];
  public ArrSubDivision: string[];
  public ShowSub: boolean;
  public ArrLanguage: string[];
  public Division: string = "";
  public subdivision: string = "";
  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.getAll_W_Drafts().subscribe(val => this.PropJudges = val);
    this.serverService.DivisionEnglish().subscribe((events) => {
      this.ArrDivision = events;
    });
  }

  //editProp(item: Judges) {
  //  this.itempropID = item.IdProposal;
  //  this.serverService.getId_W_Proposals(item.IdProposal).subscribe((events) => {
  //    this.oneProp = events;
  //    this.SessionName = this.oneProp.SessionName;
  //    this.Chairman = this.oneProp.Chairman;
  //    this.Remarks = this.oneProp.Remarks;
  //    this.Status = this.oneProp.Status;
  //    this.isShowProp = true;
  //    //alert(events.Language + " " + events.Keywords + " " + events.Chairman);
  //  });


  //}

  ngOnInit() {
  }
  //Save() {
  //  this.newProp = new Judges();
  //  if (this.Division == "")
  //    this.newProp.Division = this.oneProp.Division;
  //  else
  //    this.newProp.Division = this.Division;
  //  if (this.Division == "")
  //    this.newProp.SubDivision = this.oneProp.SubDivision;

  //  else
  //    this.newProp.SubDivision = this.subdivision;

  //  this.newProp.IdProposal = this.oneProp.IdProposal;
  //  this.newProp.UserName = this.oneProp.UserName;
  //  this.newProp.TitleEnglish = this.oneProp.TitleEnglish;
  //  this.newProp.TitleHebrew = this.oneProp.TitleHebrew;
  //  this.newProp.Proposal = this.oneProp.Proposal;
  //  this.newProp.Language = this.oneProp.Language;
  //  this.newProp.Keywords = this.oneProp.Keywords;
  //  this.newProp.SessionName = this.SessionName;
  //  this.newProp.Chairman = this.Chairman;
  //  this.newProp.Remarks = this.Remarks;
  //  this.newProp.Status = this.Status;


  //  this.serverService.sendUpdateProp(this.newProp);
  //  this.isShowProp = false;
  //}


  selectDivision(div: string) {
    this.serverService.SubDivisionEnglish(div).subscribe((events) => {

      this.ArrSubDivision = events;
    });
  }

  SelectField(Field: string) {
    this.serverService.GetValuesByFieldDrafts(Field).subscribe(val => this.Values = val);

  }
  SelectValues(value: string) {
    if (this.field == 'FirstName')
      this.PropJudges = this.PropJudges.filter(prop => prop.FirstNameEnglish.includes(value));
    if (this.field == 'LastName')
      this.PropJudges = this.PropJudges.filter(prop => prop.LastNameEnglish.includes(value));

    if (this.field == 'Chairman')
      this.PropJudges = this.PropJudges.filter(prop => prop.Chairman.includes(value));

    if (this.field == 'Division')
      this.PropJudges = this.PropJudges.filter(prop => prop.Division.includes(value));

    if (this.field == 'Keywords')
      this.PropJudges = this.PropJudges.filter(prop => prop.Keywords.includes(value));

    if (this.field == 'Language')
      this.PropJudges = this.PropJudges.filter(prop => prop.Language.includes(value));


    if (this.field == 'SessionName')
      this.PropJudges = this.PropJudges.filter(prop => prop.SessionName.includes(value));
    if (this.field == 'SubDivision')
      this.PropJudges = this.PropJudges.filter(prop => prop.SubDivision.includes(value));
    if (this.field == 'TitleEnglish')
      this.PropJudges = this.PropJudges.filter(prop => prop.TitleEnglish.includes(value));
    if (this.field == 'TitleHebrew')
      this.PropJudges.filter(prop => prop.TitleHebrew.includes(value));

  }
  NoFilter() {
    this.serverService.getAll_W_Proposals().subscribe(val => this.PropJudges = val);
  }
}

