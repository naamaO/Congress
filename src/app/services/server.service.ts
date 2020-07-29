import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { book } from './../../classes/classItem';
import { shoppingCart } from 'src/classes/shoppingCart';
import { User } from '../../classes/User';
import { UserPass } from 'src/classes/UserPass';
import { Proposals } from '../../classes/Proposals';
import { NewProp } from '../../classes/NewProp';
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
  public Rout: number;
  public LoginUserName: string;
  public LoginDiv: string;
  public currency: number = 1;
  public total: any;
  public lang: string = 'il';
  public email: string;
  public Country: string[] = [];
  public jsonPurchaseData: Array<any>= [];
  public resNotifyTranzila:any;
  
  public CART = {
    KEY: 'ShoppingCartGuest',
    contents: []
  }
  public CARTMEMBERSHIP = {
    KEY: 'ShoppingCart',
    contents: []
  }
//  public port: string = 'http://localhost:64905';
public port: string = 'http://jewish-studies.b2story.com/webApi';
// public port: string = 'https://jewish-studies.b2story.com/webApi';

  constructor(public cookieService: CookieService, private http: HttpClient) {
   //this.port = 'http://localhost:64905';
   this.port = ' http://jewish-studies.b2story.com/webApi';
   //this.port = ' https://jewish-studies.b2story.com/webApi';
    this.Country = [
      "Afghanistan",
      "Åland Islands",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas (the)",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia (Plurinational State of)",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory (the)",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cayman Islands (the)",
      "Central African Republic (the)",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands (the)",
      "Colombia",
      "Comoros (the)",
      "Congo (the Democratic Republic of the)",
      "Congo (the)",
      "Cook Islands (the)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Curaçao",
      "Cyprus",
      "Czechia",
      "Côte d'Ivoire",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic (the)",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Falkland Islands (the) [Malvinas]",
      "Faroe Islands (the)",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories (the)",
      "Gabon",
      "Gambia (the)",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See (the)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran (Islamic Republic of)",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea (the Democratic People's Republic of)",
      "Korea (the Republic of)",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic (the)",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands (the)",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia (Federated States of)",
      "Moldova (the Republic of)",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands (the)",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger (the)",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands (the)",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine, State of",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines (the)",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Republic of North Macedonia",
      "Romania",
      "Russian Federation (the)",
      "Rwanda",
      "Réunion",
      "Saint Barthélemy",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin (French part)",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten (Dutch part)",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan (the)",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan (Province of China)",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands (the)",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates (the)",
      "United Kingdom of Great Britain and Northern Ireland (the)",
      "United States Minor Outlying Islands (the)",
      "United States of America (the)",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela (Bolivarian Republic of)",
      "Viet Nam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe"];
  }
  ngOnInit() {
  //  this.setCurrency(this.currency);
  //  this.setLang(this.lang);
    this.setEmail(this.email);
  //  this.setTotal();
  }

  setjsonPurchaseData2(){
  console.log( localStorage.getItem(this.CART.KEY));
   return  localStorage.getItem(this.CART.KEY);
  }
  setjsonPurchaseData1(){
    console.log( localStorage.getItem(this.CARTMEMBERSHIP.KEY));
     return  localStorage.getItem(this.CARTMEMBERSHIP.KEY);
    }
  setTotal(){
    this.total = JSON.parse(this.getCookie('Total'));
    return this.total;
  }

  setCurrency(){
  this.currency = JSON.parse(this.getCookie('Currency'));
  return this.currency;
  }

  setLang(){
    this.lang = this.getCookie('Lang');
    return this.lang;
  }

  setEmail(email){
    this.email = email;
  } 
  
  setRout(Rout){
    this.Rout = Rout;
  }

  setNotify(resNoyify){
    this.resNotifyTranzila = resNoyify;
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  getAllDBFromServer(): Observable<book[]> {
    return this.http.get<book[]>(this.port + "/api/Home/getFromDB");
  }
  getAllDBFromServerHebrew(): Observable<book[]> {
    return this.http.get<book[]>(this.port + "/api/Home/getFromDBHebrew");
  }

  getAllDBShoppingCart(): Observable<shoppingCart[]> {  
    if(this.getCookie('UserName')){
      this.LoginUserName = (this.getCookie('UserName'));
    }
    else{
      this.LoginUserName=null;
    }
    return this.http.get<shoppingCart[]>(this.port + "/api/Home/getFromDBCart?LoginUserName=" + this.LoginUserName);
  }
  enterItemToCart(item: shoppingCart):any {
    this.LoginUserName = (this.getCookie('UserName'));
    //item.login = this.LoginUserName;
   return this.http.post(this.port + "/api/Home/PostToCart", item);
  }
  AddItemToCart(item: shoppingCart):any {
    this.LoginUserName = (this.getCookie('UserName'));
    //item.login = this.LoginUserName;
   return this.http.post(this.port + "/api/Home/AddToCart", item);
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
    //alert("F");
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<number>(this.port + "/api/Home/getNumProduct?LoginUserName=" + this.LoginUserName)
  }
  RegistrationNewGuest(user: User) {
    this.http.post(this.port + "/api/Home/RegistrationGuest", user).subscribe();
  }
  Registration(user: User) {
    this.http.post(this.port + "/api/Home/Registration", user).subscribe();
  }
  SendCheckUserPassword(item: UserPass): Observable<boolean> {
    return this.http.post<boolean>(this.port + "/api/Home/CheckUserPassword", item)//.subscribe();
  }
  getUserNameExists(UserName:string): Observable<any> {
    if(this.getCookie('UserName')){
      this.LoginUserName = (this.getCookie('UserName'));
    }
    else{
      this.LoginUserName=UserName;
    }  
    //  return this.http.get<boolean>(this.port + "/api/Home/checkEmailFind?email="+this.LoginUserName);
    return this.http.get<any>(this.port + "/api/Home/checkEmailFind?email="+this.LoginUserName);
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
    Subdiv = (this.getCookie('SubDivision'));
    return this.http.get<string[]>(this.port + "/api/Home/GetLanguageEnglish?SubDiv=" + Subdiv + "&Division=" + this.LoginDiv)

  }
  GetLanguageEnglishSession(Subdiv: string, Division: string): Observable<string[]> {
    //this.LoginDiv = (this.getCookie('Division'));

    return this.http.get<string[]>(this.port + "/api/Home/GetLanguageEnglishSession?SubDiv=" + Subdiv + "&Division=" + Division)

  }
  GetLanguageHebrew(Subdiv: string): Observable<string[]> {
    this.LoginDiv = (this.getCookie('Division'));
    return this.http.get<string[]>(this.port + "/api/Home/GetLanguageHebrew?SubDiv=" + Subdiv + "&Division=" + this.LoginDiv)

  }
  enterDraft(Prop: Proposals) {
    this.LoginUserName = (this.getCookie('UserName'));
    Prop.UserName = this.LoginUserName;
    //if (Prop.Keywords == null) {
    //  Prop.Keywords = "";
    //} if (Prop.Language == null) {
    //  Prop.Language = "";
    //} if (Prop.Division == null) {
    //  Prop.Division = "";
    //} if (Prop.SubDivision == null) {
    //  Prop.SubDivision = "";
    //} if (Prop.Proposal == null) {
    //  Prop.Proposal = "";
    //} if (Prop.TitleEnglish == null) {
    //  Prop.TitleEnglish = "";
    //} if (Prop.TitleHebrew == null) {
    //  Prop.TitleHebrew = "";
    //}
    this.http.post(this.port + "/api/Home/enterDraft", Prop).subscribe();
  }
  enterNewDraft(Prop: NewProp) {
    //if (Prop.Title == null) {
    //  Prop.Title = "";
    //} if (Prop.FirstNameEnglish == null) {
    //  Prop.FirstNameEnglish = "";
    //} if (Prop.LastNameEnglish == null) {
    //  Prop.LastNameEnglish = "";
    //} if (Prop.FirstNameHebrew == null) {
    //  Prop.FirstNameHebrew = "";
    //} if (Prop.LastNameHebrew == null) {
    //  Prop.LastNameHebrew = "";
    //}
    //if (Prop.Keywords == null) {
    //  Prop.Keywords = "";
    //} if (Prop.Language == null) {
    //  Prop.Language = "";
    //} if (Prop.Division == null) {
    //  Prop.Division = "";
    //} if (Prop.SubDivision == null) {
    //  Prop.SubDivision = "";
    //} if (Prop.Proposal == null) {
    //  Prop.Proposal = "";
    //} if (Prop.TitleEnglish == null) {
    //  Prop.TitleEnglish = "";
    //} if (Prop.TitleHebrew == null) {
    //  Prop.TitleHebrew = "";
    //}
    this.http.post(this.port + "/api/Home/enterNewDraft", Prop).subscribe();
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

  } selectProp(): Observable<Proposals> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<Proposals>(this.port + "/api/Home/selectProp?LoginUserName=" + this.LoginUserName);

  }
  selectSecondDraft(): Observable<Proposals> {
    this.LoginUserName = (this.getCookie('UserName'));

    return this.http.get<Proposals>(this.port + "/api/Home/selectSecondDraft?LoginUserName=" + this.LoginUserName);

  }
  forgetPass(item: string): any {
   // alert("r")
    return this.http.get<number>(this.port + "/api/Home/forgetPass?email=" + item);

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
    return this.http.get<Judges[]>(this.port + "/api/Home/getId_W_ProposalsSession?sessionId=" + item.SessionId)
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
  getUserDetails(): Observable<User> {
    this.LoginUserName = (this.getCookie('UserName'));
    return this.http.get<User>(this.port + "/api/Home/getUserDetails?LoginUserName=" + this.LoginUserName);
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
