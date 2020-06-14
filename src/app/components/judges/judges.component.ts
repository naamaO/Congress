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
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import {MatPaginatorIntl} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import 'datatables.net';
import 'datatables.net-bs4';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'app-judges',
    templateUrl: './judges.component.html',
    styleUrls: ['./judges.component.css']
})
export class JudgesComponent  implements OnInit  {

    @ViewChild('myModal') openModal: ElementRef;
  @ViewChild('SelectDiv') SelectDiv: ElementRef;
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
    public filterOfValue = {};
    public field: string;
    public Fields: string[] = ['All','Name', 'Div', 'Sub Div', 'Title'];
    public displayedColumns: string[] = ['Icon','UserName', 'Division', 'SubDivision', 'TitleEnglish', 'SessionName', 'Language',
        'Status', 'Review'];
    public DB: Proposals[];
    public PropJudges: Judges[];
    public isShowProp: boolean = false;
    public isShowPropArrSession: boolean = false;
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
    public Division: string = "";
    public subdivision: string = "";
    public Value: string;
    public ArrPropSession: Judges[];
    public dataSource = new MatTableDataSource<Judges>();
    public dataSourcFilter = new MatTableDataSource<Judges>();
    filterSelectObj = [];
    public showPropSession: boolean;
    page = 1;
    pageSize = 4;
    pages = [];
    collection = [];
    collectionSize = 12;//= this.PropJudges.length;
    pageEvent: PageEvent;
    p: number = 1;
    size = 10;
    pageIndex = 1;
    data: any;
    constructor(public router: Router, private serverService: ServerService,
         private http: HttpClient, private MatPaginatorIntl:MatPaginatorIntl) {

 // Object to create Filter for
      this.filterSelectObj = [
        {
          name: 'UserName',
          columnProp: 'UserName',
          options: []
        }, {
          name: 'Division',
          columnProp: 'Division',
          options: []
        }, {
          name: 'SubDivision',
          columnProp: 'SubDivision',
          options: []
        }, {
          name: 'TitleEnglish',
          columnProp: 'TitleEnglish',
          options: []
        }, {
          name: 'SessionName',
          columnProp: 'SessionName',
          options: []
        }, {
            name: 'Language',
            columnProp: 'Language',
            options: []
        }, {
            name: 'Status',
            columnProp: 'Status',
            options: []
        }
      ]

    }

    pageChanged(event:any){
        // this.page=event;
        this.pageIndex=event;
        // this.data=this.dataSource.data;
        console.log("this.dataSource.data",this.dataSource.data)
        this.dataSource.data = this.data.slice(event * this.size - this.size, event * this.size);
        console.log("this.dataSource.data",this.dataSource.data)
      }
      

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel ='Displaynig';
        this.dataSource.paginator._intl.nextPageLabel ='Displaynig';
        this.dataSource.paginator._intl.previousPageLabel ='Displaynig';
        console.log("this.dataSource.data",this.dataSource.data)

        this.data=this.dataSource.data;

    }
    editProp(item: Judges) {
        this.itempropID = item;
        if (item.SessionName == null) {
            this.serverService.getId_W_Proposals(item).subscribe((events) => {
                this.oneProp = events;
                this.SessionName = this.oneProp.SessionName;
                this.Chairman = this.oneProp.Chairman;
                this.Remarks = this.oneProp.Remarks;
                this.Status = this.oneProp.Status;
                this.isShowProp = true;
            });
        }
        else {
            this.serverService.getId_W_ProposalsSession(item).subscribe((events) => {
                this.ArrPropSession = events;
                this.SessionName = item.SessionName;
                this.Chairman = item.Chairman;
                this.isShowPropArrSession = true;
            });
        }
    }

    getImgIcon(item: Judges) {
        if (item.SessionName == null)
            return "/assets/images/single.gif";
        else {
            if (item.SessionName) {
                //to do check - isGroupMissing
                //  return "/assets/images/group_missing.gif";
                return "/assets/images/group.gif";
            }
        }
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
            case "All":
                this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.SubDivision + " ").toLowerCase().includes(search) }) as Judges[];
                break;
        }
    }
    ngOnInit() {

        this.myControl.valueChanges.subscribe(newValue => {
            this.filterValues(newValue);
        })
        this.serverService.DivisionEnglish().subscribe((events) => {
            this.ArrDivision = events;
        });
        this.serverService.getAll_W_Proposals().subscribe(val => {
            this.dataSource.data = val as Judges[];
            this.dataSourcFilter.data = val as Judges[];
            this.data = this.dataSource.data;
            console.log("this.data",this.data )
            this.dataSource.filterPredicate = this.createFilter();
            this.filterSelectObj.filter((o) => {
                o.options = this.getFilterObject(this.dataSource.filteredData, o.columnProp);
              });
        });
    }
 // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
      
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  
  filterChange(filter, event) {
    let filterOfValue = {}
    this.filterOfValue[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterOfValue)
    this.SelectDiv.nativeElement.style.color = "#E8E8E8 ";

  }
  ChangecolorBlueDiv() {
    this.SelectDiv.nativeElement.style.color = "#167c9f ";
  }
  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

     // console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
                if (data[col]!=null){
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }}
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }


  // Reset table filters
  resetFilters() {
    this.filterOfValue = []
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }
    Save() {
        this.newProp = new Judges();
        if (this.oneProp.Division == null)
            this.newProp.Division = this.Division;
        else
            if (this.Division == "")
                this.newProp.Division = this.oneProp.Division;

        if (this.oneProp.SubDivision == null)
            this.newProp.SubDivision = this.subdivision;
        else
            if (this.subdivision == "")
                this.newProp.SubDivision = this.oneProp.SubDivision;


        this.newProp.IdProposal = this.oneProp.IdProposal;
        this.newProp.UserName = this.oneProp.UserName;
        if (this.oneProp.TitleEnglish == null)
            this.newProp.TitleEnglish = "";
        else
            this.newProp.TitleEnglish = this.oneProp.TitleEnglish;
        if (this.oneProp.TitleHebrew == null)
            this.newProp.TitleHebrew = "";
        else
            this.newProp.TitleHebrew = this.oneProp.TitleHebrew;
        if (this.oneProp.Proposal == null)
            this.newProp.Proposal = "";
        else
            this.newProp.Proposal = this.oneProp.Proposal;
        if (this.oneProp.Language == null)
            this.newProp.Language = "";
        else
            this.newProp.Language = this.oneProp.Language;
        if (this.oneProp.Keywords == null)
            this.newProp.Keywords = "";
        else
            this.newProp.Keywords = this.oneProp.Keywords;
        if (this.oneProp.SessionName == null)
            this.newProp.SessionName = "";
        else
            this.newProp.SessionName = this.oneProp.SessionName;
        if (this.oneProp.Chairman == null)
            this.newProp.Chairman = "";
        else
            this.newProp.Chairman = this.oneProp.Chairman;
        if (this.oneProp.Remarks == null)
            this.newProp.Remarks = "";
        else
            this.newProp.Remarks = this.oneProp.Remarks;
        if (this.oneProp.Status == null)
            this.newProp.Status = "";
        else
            this.newProp.Status = this.oneProp.Status;

        this.serverService.sendUpdateProp(this.newProp);
        this.isShowProp = false;
    }

    SavePropSession(PropSession) {
        this.newProp = new Judges();
        if (PropSession.Division == null)
            this.newProp.Division = this.Division;
        else
            if (this.Division == "")
                this.newProp.Division = PropSession.Division;

        if (PropSession.SubDivision == null)
            this.newProp.SubDivision = this.subdivision;
        else
            if (this.subdivision == "")
                this.newProp.SubDivision = PropSession.SubDivision;


        this.newProp.IdProposal = PropSession.IdProposal;
        this.newProp.UserName = PropSession.UserName;
        if (PropSession.TitleEnglish == null)
            this.newProp.TitleEnglish = "";
        else
            this.newProp.TitleEnglish = PropSession.TitleEnglish;
        if (PropSession.TitleHebrew == null)
            this.newProp.TitleHebrew = "";
        else
            this.newProp.TitleHebrew = PropSession.TitleHebrew;
        if (PropSession.Proposal == null)
            this.newProp.Proposal = "";
        else
            this.newProp.Proposal = PropSession.Proposal;
        if (PropSession.Language == null)
            this.newProp.Language = "";
        else
            this.newProp.Language = PropSession.Language;
        if (PropSession.Keywords == null)
            this.newProp.Keywords = "";
        else
            this.newProp.Keywords = PropSession.Keywords;
        if (PropSession.SessionName == null)
            this.newProp.SessionName = "";
        else
            this.newProp.SessionName = PropSession.SessionName;
        if (PropSession.Chairman == null)
            this.newProp.Chairman = "";
        else
            this.newProp.Chairman = PropSession.Chairman;
        if (PropSession.Remarks == null)
            this.newProp.Remarks = "";
        else
            this.newProp.Remarks = PropSession.Remarks;
        if (PropSession.Status == null)
            this.newProp.Status = "";
        else
            this.newProp.Status = PropSession.Status;

        this.serverService.sendUpdateProp(this.newProp);
        this.isShowPropArrSession = true;
    }

    selectDivision(div: string) {
        this.serverService.SubDivisionEnglish(div).subscribe((events) => {

            this.ArrSubDivision = events;
        });
    }

    SelectField() {
        this.serverService.GetValuesByField(this.field).subscribe(val => {
        this.Values = val; 
        this.FilterValues = val;
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
        if (this.field == 'All') {
            this.dataSource.data = this.dataSourcFilter.data;
        }
    }
    NoFilter() {
        this.serverService.getAll_W_Proposals().subscribe(val => this.PropJudges = val);
    }
}

