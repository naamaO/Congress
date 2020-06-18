import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { book } from './../../classes/classItem';
import { shoppingCart } from 'src/classes/shoppingCart';
import { User } from '../../classes/User';
import { UserPass } from 'src/classes/UserPass';
import { Proposals } from '../../classes/Proposals';
import { invited } from '../../classes/invited';
import { Judges } from '../../classes/Judges';
import { Drafts } from 'src/classes/Drafts';
import { CookieService } from 'angular2-cookie';
import { Name } from 'src/classes/Name';
import { ReturnStatement } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  d: object;
  public LoginUserName: string;
  public LoginDiv: string;
  public port: string = 'http://localhost:64905';
 // public port: string = 'http://jewish-studies.b2story.com/webApi';

  constructor(public cookieService: CookieService, private http: HttpClient) {
    this.port = 'http://localhost:64905';
    //this.port = ' http://jewish-studies.b2story.com/webApi';

  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  getUserNameExists(): Observable<boolean> {
    return this.http.get<boolean>(this.port + "/api/Home/getUserNameExists");

  }

  getAllDBFromServer(): Observable<book[]> {
    return this.http.get<book[]>(this.port + "/api/Home/getFromDB");
  }
  getAllDBFromServerHebrew(): Observable<book[]> {
    return this.http.get<book[]>(this.port + "/api/Home/getFromDBHebrew");
  }

  getAllDBShoppingCart(): Observable<shoppingCart[]> {
    this.LoginUserName = (this.getCookie('UserName'));

    return this.http.get<shoppingCart[]>(this.port + "/api/Home/getFromDBCart?LoginUserName=" + this.LoginUserName);

  }
  enterItemToCart(item: shoppingCart):any {
    this.LoginUserName = (this.getCookie('UserName'));
    //item.login = this.LoginUserName;
   return this.http.post(this.port + "/api/Home/PostToCart", item).subscribe();
  }
  postAddQuantity(item: shoppingCart) {
    this.http.post(this.port + "/api/Home/postAddQuantity", item).subscribe();

  }
  postRemoveQuantity(item: shoppingCart) {
    this.http.post(this.port + "/api/Home/postRemoveQuantity", item).subscribe();

  }
  postdeleteQuantity(item: shoppingCart) {

    this.http.post(this.port + "/api/Home/postdeleteQuantity", item).subscribe();

  }
  enterItemToCar2t(item: book) {
    // this.http.post("http://localhost:64905/api/Home/PostToCart", item);
    //  this.http.post("http://localhost:64905/api/Home/PostToCart", item).subscribe(res => console.log(res));
  }
  Detais(Id: number): Observable<book> {
    return this.http.get<book>(this.port + "/api/Home/GetBookById?Id=" + Id)
  }
  DetailsHebrew(Id: number): Observable<book> {
    return this.http.get<book>(this.port + "/api/Home/GetBookByIdHebrew?Id=" + Id)
  }
  getNumProduct(): Observable<number> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<number>(this.port + "/api/Home/getNumProduct?LoginUserName=" + this.LoginUserName)
  }
  Registration(user: User) {
    this.http.post(this.port + "/api/Home/Registration", user).subscribe();
  }
  SendCheckUserPassword(item: UserPass): Observable<boolean> {
    return this.http.post<boolean>(this.port + "/api/Home/CheckUserPassword", item)//.subscribe();

  }
  DivisionEnglish(): Observable<string[]> {
    return this.http.get<string[]>(this.port + "/api/Home/GetDivisionEnglish")
  }
  DivisionHebrew(): Observable<string[]> {
    return this.http.get<string[]>(this.port + "/api/Home/GetDivisionHebrew")
  }
  SubDivisionEnglish(div: string): Observable<string[]> {
    return this.http.get<string[]>(this.port + "/api/Home/GetSubDivisionEnglish?Div=" + div)

  }
  SubDivisionHebrew(div: string): Observable<string[]> {
    return this.http.get<string[]>(this.port + "/api/Home/GetSubDivisionHebrew?Div=" + div)

  }
  GetLanguageEnglish(Subdiv: string): Observable<string[]> {
    this.LoginDiv = (this.getCookie('Division'));

    return this.http.get<string[]>(this.port + "/api/Home/GetLanguageEnglish?SubDiv=" + Subdiv + "&Division=" + this.LoginDiv)

  }
  GetLanguageHebrew(Subdiv: string): Observable<string[]> {
    this.LoginDiv = (this.getCookie('Division'));
    return this.http.get<string[]>(this.port + "/api/Home/GetLanguageHebrew?SubDiv=" + Subdiv + "&Division=" + this.LoginDiv)

  }
  enterDraft(Prop: Proposals) {
    this.LoginUserName = (this.getCookie('UserName'));
    Prop.UserName = this.LoginUserName;
    if (Prop.Keywords == null) {
      Prop.Keywords = "";
    } if (Prop.Language == null) {
      Prop.Language = "";
    } if (Prop.Division == null) {
      Prop.Division = "";
    } if (Prop.SubDivision == null) {
      Prop.SubDivision = "";
    } if (Prop.Proposal == null) {
      Prop.Proposal = "";
    } if (Prop.TitleEnglish == null) {
      Prop.TitleEnglish = "";
    } if (Prop.TitleHebrew == null) {
      Prop.TitleHebrew = "";
    }
    this.http.post(this.port + "/api/Home/enterDraft", Prop).subscribe();
  }
  enterSecondDraft(Prop: Proposals) {
    this.LoginUserName = (this.getCookie('UserName'));
    // alert("http://localhost:64905/api/Home/enterSecondDraft?prop=" + Prop + " &LoginUserName=" + this.LoginUserName)
    Prop.UserName = this.LoginUserName;
    this.http.post(this.port + "/api/Home/enterSecondDraft?prop=", Prop).subscribe();
  }
  enterProposal(Prop: Proposals) {
    this.LoginUserName = (this.getCookie('UserName'));
    Prop.UserName = this.LoginUserName;
    this.http.post(this.port + "/api/Home/enterProposal", Prop).subscribe();
  }

  selectDraft(): Observable<Proposals> {
    this.LoginUserName = (this.getCookie('UserName'));

    return this.http.get<Proposals>(this.port + "/api/Home/selectDraft?LoginUserName=" + this.LoginUserName);

  }
  selectSecondDraft(): Observable<Proposals> {
    this.LoginUserName = (this.getCookie('UserName'));

    return this.http.get<Proposals>(this.port + "/api/Home/selectSecondDraft?LoginUserName=" + this.LoginUserName);

  }
  forgetPass(item: UserPass) {
    this.http.post(this.port + "/api/Home/forgetPass", item).subscribe();

  }
  getTotalPrice() {
    this.LoginUserName = (this.getCookie('UserName'));

    return this.http.get<number>(this.port + "/api/Home/getPriceShoppCart?LoginUserName=" + this.LoginUserName)

  }
  InviteMembers(arr: invited[]) {
    this.LoginUserName = (this.getCookie('UserName'));
    this.http.post(this.port + "/api/Home/InviteMembers?arrInvited=", arr).subscribe();

  }
  getAll_W_Proposals(): Observable<Judges[]> {
    return this.http.get<Judges[]>(this.port + "/api/Home/GetJudgeInterface")
  }

  getAll_W_Drafts(): Observable<Drafts[]> {
    return this.http.get<Drafts[]>(this.port + "/api/Home/GetDrafts")
  }
  getId_W_Proposals(item: Judges): Observable<Judges> {
    return this.http.get<Judges>(this.port + "/api/Home/GetJudgeInterfaceBiIdProp?Id=" + item.IdProposal)
  }
    getId_W_ProposalsSession(item: Judges): Observable<Judges[]> {
        return this.http.get<Judges[]>(this.port + "/api/Home/getId_W_ProposalsSession?session=" + item.SessionName)
  }
  sendUpdateProp(newProp: Judges) {
    this.http.post(this.port + "/api/Home/UpdateProp", newProp).subscribe();

  }
  GetValuesByField(Field: string): Observable<string[]> {
    return this.http.get<string[]>(this.port + "/api/Home/GetValuesByField?field=" + Field)

  }

  GetValuesByFieldDrafts(Field: string): Observable<string[]> {
    return this.http.get<string[]>(this.port + "/api/Home/GetValuesByFieldDrafts?field=" + Field)

  }
  getUserNameLoginFromServer(): Observable<string> {
    this.LoginUserName = (this.getCookie('UserName'));

    return this.http.get<string>(this.port + "/api/Home/GetUserNameLogin?LoginUserName=" + this.LoginUserName);
  }
  getName(): Observable<Name> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<Name>(this.port + "/api/Home/getName?LoginUserName=" + this.LoginUserName);
  }
  getNameHebrew(): Observable<Name> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<Name>(this.port + "/api/Home/getNameHebrew?LoginUserName=" + this.LoginUserName);
  }
  CheckIfInSession(): Observable<number> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<number>(this.port + "/api/Home/CheckIfInSession?LoginUserName=" + this.LoginUserName);
  }
  CheckIfInDraft(): Observable<number> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<number>(this.port + "/api/Home/CheckIfInDraft?LoginUserName=" + this.LoginUserName);
  }
}
