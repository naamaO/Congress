import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { CookieService } from 'ngx-cookie';
import { __await } from 'tslib';
import { Name } from 'src/classes/Name';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-congress-registration-one',
  templateUrl: './congress-registration-one.component.html',
  styleUrls: ['./congress-registration-one.component.css']
})
export class CongressRegistrationOneComponent implements OnInit {
  @ViewChild("testInput") testInput;
  @ViewChild('english') english: ElementRef;
  @ViewChild('hebrew') hebrew: ElementRef;
  @ViewChild('abs') abs: ElementRef;
  @ViewChild('lang') lang: ElementRef;
  @ViewChild('div') div: ElementRef;
  @ViewChild('subdiv') subdiv: ElementRef;
  @ViewChild('academic') academic: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('nameh') nameh: ElementRef;
  @ViewChild('namee') namee: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('key') key: ElementRef;
  @ViewChild('titenglishinput') titenglishinput: ElementRef;
  @ViewChild('academicinput') academicinput: ElementRef;
  @ViewChild('tithebinput') tithebinput: ElementRef;
  @ViewChild('proptext') proptext: ElementRef;
  @ViewChild('keytext') keytext: ElementRef;
  @ViewChild('langselect') langselect: ElementRef;
//Add field academy to DB
  //@Input()
  public DraftValue: string = "SAVE DRAFT";
  public NumWords: number = 0;
  userFormGroup: FormGroup;
  public angForm: FormGroup;
  public errMoreThen250: boolean;
  pattern: string | RegExp
  public Show2Proposals: boolean;
  public showTwo: boolean;
  public Email2: string;
  public Name2: string;
  public Prop: Proposals;
  public SaveDraft: boolean;
  public ArrDivision: string[];
  public ArrSubDivision: string[];
  public ShowSub: boolean;
  public ArrLanguage: string[]=['English','עברית'];
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
  public FirstNameHebrew: string;
  public LastNameHebrew: string;
  public LoginUserName: string;
  public Title: string;
  public SeesionId: number;
  public Creator: number;
  public Chairman: string;
  public ChairmanEmail: string;
  public ArrTitle: string[] = ['Prof', 'Dr', 'Mr', 'Ms'];
  public showLikeProp: boolean = false;
  public showErrEmpty: boolean = false;
  public showsaveDraft: boolean = false;
  // public jobform = new FormGroup({
  //   firstName: new FormControl()
  // });

  constructor(private fb: FormBuilder,public cookieService: CookieService, public router: Router, private serverService: ServerService, private http: HttpClient) {
    //__await(500);
    //  this.serverService.DivisionEnglish().subscribe((events) => {
    //  this.ArrDivision = events;
    //  this.ShowSub = true;
    //});
    this.serverService.getName().subscribe((events) => {
      this.FirstName = events.FirstName;
      this.LastName = events.LastName;
      this.FirstNameHebrew = events.FirstNameHebrew;
      this.LastNameHebrew = events.LastNameHebrew;
      this.Title = events.selectedTitle;
      
    });
    this.serverService.selectDraft().subscribe((events) => {
      
      this.Division = events.Division;
      this.SubDivision = events.SubDivision;
      this.TitleEnglish = events.TitleEnglish;
      this.TitleHebrew = events.TitleHebrew;
      this.Proposal = events.Proposal;
      this.Language = events.Language;
      this.Keywords = events.Keywords;
      this.SessionName = events.SessionName;
      this.SeesionId = events.SessionId;
      this.Chairman = events.Chairman;
      this.ChairmanEmail = events.ChairmanEmail;
      this.Creator = events.Creator;
      this.serverService.GetLanguageEnglishSession(this.SubDivision, this.Division).subscribe((events) => {

        this.ArrLanguage = events;
      });
      
      if((events.Division !=null)||(events.Division=='')){
      if (events.Division.charAt(0) == '0') {
        this.showLikeProp = true;
        this.Division = this.Division.substr(1);
      }
    }
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
    //this.angForm = new FormGroup({
    //  name: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/) )}) ‏
     this.LoginUserName = (this.getCookie('UserName'));
    // this.serverService.getName().subscribe((events) => {
    //   debugger
    //   this.FirstName = events.FirstName;
    //   this.LastName = events.LastName;
    //   this.FirstNameHebrew = events.FirstNameHebrew;
    //   this.LastNameHebrew = events.LastNameHebrew;
    //   this.Title = events.Title;
    // });
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
    this.DraftValue = "DRAFT SAVED";

    this.showsaveDraft = true;

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
    this.Prop.SessionId = this.SeesionId;
    this.Prop.Chairman = this.Chairman;
    this.Prop.ChairmanEmail = this.ChairmanEmail;
    this.Prop.Creator = this.Creator;
    if (this.Keywords != null && this.Language != null && this.Division != null && this.Proposal != null &&
      this.SubDivision != null && this.TitleEnglish != null && this.TitleHebrew != null) {
      this.serverService.enterProposal(this.Prop);
      this.router.navigateByUrl("/Thank2");
    }
    else {
      if (this.Keywords == null) {
        this.key.nativeElement.style.color = "red";
        document.getElementById("keytext").classList.add("allbordercolorRed");
      } if (this.TitleEnglish == null) {
        this.english.nativeElement.style.color = "red";
        document.getElementById("titenglishinput").classList.add("bordercolorRed");
      } if (this.TitleHebrew == null) {
        this.hebrew.nativeElement.style.color = "red";
        document.getElementById("tithebinput").classList.add("bordercolorRed");
      } if (this.Proposal == null) {
        this.abs.nativeElement.style.color = "red";
        document.getElementById("proptext").classList.add("allbordercolorRed");
      } if (this.Language == null) {
        this.lang.nativeElement.style.color = "red";
        document.getElementById("langselect").classList.add("bordercolorRed");
      }

      //this.showErrEmpty = true;

    }
   

  }
  selectlang(lan: string) {
  }
  TitleEnglishP(event){
  }
  maxlength(element, maxvalue) {
    var q = element.split(/[\s]+/).length;
    this.NumWords = q;
    if (q > maxvalue) {
      var r = q - maxvalue;
      this.errMoreThen250 = true;
      return false;
    } else {
      this.errMoreThen250 = false;
    }
  }
  changeProp(element, maxvalue) {
    if(element.Proposal!=null){
    // var q = element.Proposal.split(/[\s]+/).length;
    var q = element.Proposal.split(" "); 
    
    if(q.length > maxvalue){
        var r = q.length - maxvalue;
        alert("You can enter no more than "+ maxvalue+" words");
        // alert(" you have input "+q.length+" words into the "+
        // "text area box you just completed. It can return no more than "+
        // maxvalue+" words to be processed. Please abbreviate "+
        // "your text by at least "+r+" words");
        return false;
    }
  }
  }
  OpenSecondProposal() {
    //this.serverService.enterSecondDraft();
    this.router.navigateByUrl("/CongressRegistrationSecondEnglish");

  }
  focusacademic() {
    this.academic.nativeElement.style.color = "#27b5e5";
  }
  unfocusacademic() {
    this.academic.nativeElement.style.color = "gray";
  }
  focusenglish() {
    this.english.nativeElement.style.color = "#27b5e5";
  }
  unfocusenglish() {
    if (this.TitleEnglish != null && this.TitleEnglish != "" && this.TitleEnglish != undefined) {
      document.getElementById("titenglishinput").classList.remove("bordercolorRed");
      this.english.nativeElement.style.color = "gray";
    }
    this.english.nativeElement.style.color = "gray";
  } focusdiv() {
    this.div.nativeElement.style.color = "#27b5e5";
  }
  unfocusdiv() {
    this.div.nativeElement.style.color = "gray";
  }
  focushebrew() {
    this.hebrew.nativeElement.style.color = "#27b5e5";
  }
  unfocushebrew() {
    if (this.TitleHebrew != null && this.TitleHebrew != "" && this.TitleHebrew != undefined) {
      document.getElementById("tithebinput").classList.remove("bordercolorRed");
      this.hebrew.nativeElement.style.color = "gray";
    }
    this.hebrew.nativeElement.style.color = "gray";
  }
  focuslang() {
    this.lang.nativeElement.style.color = "#27b5e5";
  }
  unfocuslang() {
    if (this.Language != null && this.Language != "" && this.Language != undefined) {
      document.getElementById("langselect").classList.remove("bordercolorRed");
      this.lang.nativeElement.style.color = "gray";
    }
    this.lang.nativeElement.style.color = "gray";
  } focussubdiv() {
    this.subdiv.nativeElement.style.color = "#27b5e5";
  }
  unfocussubdiv() {
    this.subdiv.nativeElement.style.color = "gray";
  } focusabs() {
    this.abs.nativeElement.style.color = "#27b5e5";
  }
  unfocusabs() {
    this.maxlength(this.Proposal, 250);

    if (this.abs != null && this.abs != undefined) {
      document.getElementById("proptext").classList.remove("allbordercolorRed");
      this.abs.nativeElement.style.color = "gray";
    }
    this.abs.nativeElement.style.color = "gray";
  } focustitle() {
    this.title.nativeElement.style.color = "#27b5e5";
  }
  unfocustitle() {
    this.title.nativeElement.style.color = "gray";
  } focusnameh() {
    this.nameh.nativeElement.style.color = "#27b5e5";
  }
  unfocusnameh() {
    this.nameh.nativeElement.style.color = "gray";
  } focusnamee() {
    this.namee.nativeElement.style.color = "#27b5e5";
  }
  unfocusnamee() {
    this.namee.nativeElement.style.color = "gray";
  } focusemail() {
    this.email.nativeElement.style.color = "#27b5e5";
  }
  unfocusemail() {
    this.email.nativeElement.style.color = "gray";
  }focuskey() {
    this.key.nativeElement.style.color = "#27b5e5";
  }
  unfocuskey() {
    if (this.Keywords != null && this.Keywords != undefined) {
      document.getElementById("keytext").classList.remove("allbordercolorRed");
      this.key.nativeElement.style.color = "gray";
    }
    this.key.nativeElement.style.color = "gray";
  }




}
