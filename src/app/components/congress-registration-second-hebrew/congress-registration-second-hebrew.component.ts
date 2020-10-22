import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-congress-registration-second-hebrew',
  templateUrl: './congress-registration-second-hebrew.component.html',
  styleUrls: ['./congress-registration-second-hebrew.component.css']
})
export class CongressRegistrationSecondHebrewComponent implements OnInit {

  public Show2Proposals: boolean;
  public showTwo: boolean;
  public Email2: string;
  public Name2: string;
  public Prop: Proposals;
  public SaveDraft: boolean;
  public ArrDivision: string[];
  public ArrSubDivision: string[];
  public ShowSub: boolean;
  public ArrLanguage: string[];
  public UserName: string;
  public Division: string;
  public SubDivision: string;
  public TitleEnglish: string;
  public TitleHebrew: string;
  public Proposal: string;
  public Language: string;
  public Keywords: string;
  public SessionName: string;
  public aa: number;
  constructor(public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    this.serverService.DivisionHebrew().subscribe((events) => {
      this.ArrDivision = events;
      this.ShowSub = true;
    });
    this.serverService.selectSecondDraft().subscribe((events) => {
      this.Division = events.Division;
      this.SubDivision = events.SubDivision;
      this.TitleEnglish = events.TitleEnglish;
      this.TitleHebrew = events.TitleHebrew;
      this.Proposal = events.Proposal;
      this.Language = events.Language;
      this.Keywords = events.Keywords;
      this.SessionName = events.SessionName;
    });
  }
  setCookie(Div: string) {
    this.cookieService.put('Division', Div);
  }
  ngOnInit() {
  }
  selectDivision(div: string) {
    this.serverService.SubDivisionHebrew(div).subscribe((events) => {

      this.ArrSubDivision = events;
      this.setCookie(div);

    });


  }
  selectSubDivision(subDiv: string) {
    this.serverService.GetLanguageHebrew(this.SubDivision).subscribe((events) => {

      this.ArrLanguage = events;
    });
  }
  Draft() {
    this.Prop = new Proposals();
    this.Prop.Keywords = this.Keywords;

    this.Prop.Division = this.Division;
    this.Prop.Language = this.Language;
    this.Prop.Proposal = this.Proposal;
    this.Prop.SubDivision = this.SubDivision;
    this.Prop.TitleEnglish = this.TitleEnglish;
    this.Prop.TitleHebrew = this.TitleHebrew;
    this.serverService.enterSecondDraft(this.Prop);
    this.SaveDraft = true;
  }
  Save() {
    this.Prop = new Proposals();
    this.Prop.Keywords = this.Keywords;

    this.Prop.Division = this.Division;
    this.Prop.Language = this.Language;
    this.Prop.Proposal = this.Proposal;
    this.Prop.SubDivision = this.SubDivision;
    this.Prop.TitleEnglish = this.TitleEnglish;
    this.Prop.TitleHebrew = this.TitleHebrew;
    this.serverService.enterProposal(this.Prop);

  }
  countWords(pro: string) {
    //var newstr = pro.substr(pro.indexOf('-') + 1, 1);
    //alert(newstr);
    //alert(pro.length + " rr");
    //alert((pro.match(new RegExp(" ", "g")) || []).length);
  }
  selectlang(lan: string) {
  }
 


}
