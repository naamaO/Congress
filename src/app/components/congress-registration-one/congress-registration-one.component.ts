import { Component, OnInit, ViewChild} from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { CookieService } from 'angular2-cookie';
import { __await } from 'tslib';
import { Name } from 'src/classes/Name';
@Component({
  selector: 'app-congress-registration-one',
  templateUrl: './congress-registration-one.component.html',
  styleUrls: ['./congress-registration-one.component.css']
})
export class CongressRegistrationOneComponent implements OnInit {
  @ViewChild("testInput") testInput;

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
  public FirstName: string;
  public LastName: string;
  public LoginUserName: string;
  public showLikeProp: boolean = false;
  constructor(public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {

    //__await(500);
    //  this.serverService.DivisionEnglish().subscribe((events) => {
    //  this.ArrDivision = events;
    //  this.ShowSub = true;
    //});

    this.serverService.selectDraft().subscribe((events) => {
      this.Division = events.Division;
      this.SubDivision = events.SubDivision;
      this.TitleEnglish = events.TitleEnglish;
      this.TitleHebrew = events.TitleHebrew;
      this.Proposal = events.Proposal;
      this.Language = events.Language;
      this.Keywords = events.Keywords;
      this.SessionName = events.SessionName;
      if (events.Division.charAt(0) == '0') {
        this.showLikeProp = true;
        this.Division = this.Division.substr(1);
      }
    });

    this.LoginUserName = (this.getCookie('UserName'));
    this.serverService.getName().subscribe((events) => {
      this.FirstName = events.FirstName;
      this.LastName = events.LastName;
    });

  }
  ngAfterViewInit() {
    this.testInput.nativeElement.focus();
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  changeStyle(event: any) {
    event.target.classList.remove('fill-btn-blue')

    event.target.classList.add('over')

  }
  changeStyleOut(event: any) {

    event.target.classList.remove('over')
    event.target.classList.add('fill-btn-blue')

  }
  setCookie(Div: string) {
    this.cookieService.put('Division', Div);
  }
  ngOnInit() {
    this.LoginUserName = (this.getCookie('UserName'));
    this.serverService.getName().subscribe((events) => {
      this.FirstName = events.FirstName;
      this.LastName = events.LastName;
    });
  }
  selectDivision(div: string) {
    this.serverService.SubDivisionEnglish(div).subscribe((events) => {

      this.ArrSubDivision = events;
      this.setCookie(div);
    });


  }
  selectSubDivision(subDiv: string) {
    this.serverService.GetLanguageEnglish(subDiv).subscribe((events) => {

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
    this.serverService.enterDraft(this.Prop);
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
  selectlang(lan: string) {
  }
  OpenSecondProposal() {
    //this.serverService.enterSecondDraft();
    this.router.navigateByUrl("/CongressRegistrationSecondEnglish");

  }
}
