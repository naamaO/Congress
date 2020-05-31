import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServerService } from '../../services/server.service';
//import { http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Proposals } from '../../../classes/Proposals';
import { Judges } from '../../../classes/Judges';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import 'datatables.net';
import 'datatables.net-bs4';


@Component({
  selector: 'app-judges',
  templateUrl: './judges.component.html',
  styleUrls: ['./judges.component.css']
})
export class JudgesComponent implements OnInit {

  @ViewChild('myModal') openModal: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public myControl = new FormControl();
  public options: string[] = ['One', 'Two', 'Three'];
  public filteredOptions: Observable<string[]>;
  public ShowDiv: boolean;
  public ShowSub: boolean;
  public prop: Judges;
  public Values: string[];
  public FilterValues: string[];
  public field: string;
  public Fields: string[] = ['Name', 'Div', 'Sub Div', 'Title'];
  public displayedColumns: string[] = ['UserName', 'Division', 'SubDivision', 'SessionName', 'TitleEnglish', 'Language', 
    'Status','Review'];
  public DB: Proposals[];
  public PropJudges: Judges[];
  public isShowProp: boolean;
  public itempropID: Judges;
  public oneProp: Judges;
  public Chairman: string;
  public SessionName: string;
  public Status: string;
  public Remarks: string;
  public newProp: Judges;
  public ArrDivision: string[];
  public ArrSubDivision: string[];
 // public ShowSub: boolean;
  public ArrLanguage: string[];
  public Division: string="";
  public subdivision: string = "";
  public Value: string;
  public ArrPropSession: Judges[];
  public isShowPropArrSession: boolean;
  public dataSource = new MatTableDataSource<Judges>();
  public dataSourcFilter = new MatTableDataSource<Judges>();
  page = 1;
  pageSize = 4;
  pages = [];
  collection = [];
  collectionSize = 12;//= this.PropJudges.length;

  constructor(public router: Router, private serverService: ServerService, private http: HttpClient) {


  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  editProp(item: Judges) {
    this.itempropID = item;
    //if (item.SessionId == 0) {
      this.serverService.getId_W_Proposals(item).subscribe((events) => {
        this.oneProp = events;
        this.SessionName = this.oneProp.SessionName;
        this.Chairman = this.oneProp.Chairman;
        this.Remarks = this.oneProp.Remarks;
        this.Status = this.oneProp.Status;
        this.isShowProp = true;
      });
    //}
    //else {
    //  this.serverService.getId_W_ProposalsSession(item).subscribe((events) => {
    //    this.ArrPropSession = events;
    //    this.isShowPropArrSession = true;
    //  });
    //}

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  filterValues(search: string) {
    switch (this.field) {
      case "Name":
        this.dataSource.data = this.dataSourcFilter.data.filter(function (item) {
          var str = (item.FirstNameEnglish + " ").replace(/\s/g, '') + ' ' + (item.LastNameEnglish + " ").replace(/\s/g, '');
          return (str + " ").toLowerCase().includes(search)
        }) as Judges[];
        break;
      case "Title":
        this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.TitleEnglish + " ").toLowerCase().includes(search) }) as Judges[];
        break;
      case "Div":
        this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.Division + " ").toLowerCase().includes(search) }) as Judges[];
        break;
      case "Sub Div":
        this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.SubDivision + " ").toLowerCase().includes(search) }) as Judges[];
        break;
    }
  }  ngOnInit() {

    this.myControl.valueChanges.subscribe(newValue => {
      this.filterValues(newValue);
    })
    this.serverService.DivisionEnglish().subscribe((events) => {
      this.ArrDivision = events;
    });
    this.serverService.getAll_W_Proposals().subscribe(val => {
      this.dataSource.data = val as Judges[];
      this.dataSourcFilter.data = val as Judges[];
    });
  }
  
  Save() {
    this.newProp = new Judges();
    if (this.Division == "")
     this.newProp.Division = this.oneProp.Division;   
    else
     this.newProp.Division = this.Division; 
    if (this.Division == "")
      this.newProp.SubDivision = this.oneProp.SubDivision;
  
    else
      this.newProp.SubDivision = this.subdivision;

    this.newProp.IdProposal = this.oneProp.IdProposal;
    this.newProp.UserName = this.oneProp.UserName;
    this.newProp.TitleEnglish = this.oneProp.TitleEnglish;
    this.newProp.TitleHebrew = this.oneProp.TitleHebrew;
    this.newProp.Proposal = this.oneProp.Proposal;
    this.newProp.Language = this.oneProp.Language;
    this.newProp.Keywords = this.oneProp.Keywords;
    this.newProp.SessionName = this.SessionName;
    this.newProp.Chairman = this.Chairman;
    this.newProp.Remarks = this.Remarks;
    this.newProp.Status = this.Status;


    this.serverService.sendUpdateProp(this.newProp);
    this.isShowProp = false;
    }


  selectDivision(div: string) {
    this.serverService.SubDivisionEnglish(div).subscribe((events) => {

      this.ArrSubDivision = events;
    });
  }

  SelectField() {
    this.serverService.GetValuesByField(this.field).subscribe(val => { this.Values = val; this.FilterValues = val;
  });

  }
  SelectValues(value: string) {

    if (this.field == 'Name') {
      this.dataSource.data = this.dataSourcFilter.data.filter(function (item) {
        var str = item.FirstNameEnglish + ' ' + item.LastNameEnglish;
        return !str.toLowerCase().includes(value)
      }) as Judges[];
    }
    if (this.field == 'Div')
      this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return !item.Division.toLowerCase().includes(value) }) as Judges[];
    if (this.field == 'Sub Div')
      this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return !item.SubDivision.toLowerCase().includes(value) }) as Judges[];

    if (this.field == 'Title') {
      this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return !item.TitleEnglish.toLowerCase().includes(value) }) as Judges[];
    }

  }
  NoFilter() {
    this.serverService.getAll_W_Proposals().subscribe(val => this.PropJudges = val);
  }
}
