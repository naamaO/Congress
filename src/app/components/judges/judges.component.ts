import { AfterViewInit,Component, OnInit, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
import { __await } from 'tslib';
import { map, startWith } from 'rxjs/operators';
import  $ from 'jquery';
import { ControlValueAccessor } from '@angular/forms';
import 'datatables.net';
import 'datatables.net-bs4';
import { forEach } from '@angular/router/src/utils/collection';
//declare var $: JQueryStatic;
//import * as $ from 'jquery';
//<script type="text/javascript" src = "assets/js/jquery-2.1.1.min.js" > </script>

@Component({
    selector: 'app-judges',
    templateUrl: './judges.component.html',
    styleUrls: ['./judges.component.css']
})
export class JudgesComponent  implements OnInit  {

    @ViewChild('myModal') openModal: ElementRef;
  @ViewChild('SelectDiv') SelectDiv: ElementRef;
  @ViewChild('Accepted1') Accepted1: ElementRef;
  @ViewChild('Accepted2') Accepted2: ElementRef;
  @ViewChild('Accepted3') Accepted3: ElementRef;
  @ViewChild('Accepted') Accepted: ElementRef;
  @ViewChild('RR1') RR1: ElementRef;
  @ViewChild('RR2') RR2: ElementRef;
  @ViewChild('RR3') RR3: ElementRef;
  @ViewChild('RR') RR: ElementRef;
  @ViewChild('Rejected') Rejected: ElementRef;
  @ViewChild('Rejected1') Rejected1: ElementRef;
  @ViewChild('Rejected2') Rejected2: ElementRef;
  @ViewChild('Rejected3') Rejected3: ElementRef;
  @ViewChild('RejectedSession') RejectedSession: ElementRef;
  @ViewChild('AcceptedSession') AcceptedSession: ElementRef;
  @ViewChild('RRSession') RRSession: ElementRef;
  @ViewChild('indexPropSession') indexPropSession: ElementRef;
  //@ViewChild('edit') edit: ElementRef;
    @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public Dark: boolean = false;
  over: boolean[];
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
// public Fields: string[] = ['All','Name', 'Div', 'Sub Div', 'Title'];
public Fields: string[] = ['All','Lecturer Name', 'Lecture Name', 'Session Name'];
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
    public Division: string;
    public subdivision: string;
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
  public imgSrc: string = "/assets/images/Edit.jpg";

  constructor(private ngZone: NgZone,public router: Router, private serverService: ServerService,
         private http: HttpClient, private MatPaginatorIntl:MatPaginatorIntl) {
      //alert("rr");
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
  changePlaying() {
    __await(1000);
    this.ngZone.run(() => {

      this.serverService.getAll_W_Proposals().subscribe(val => {
        this.over = new Array(val.length);
        let d = new MatTableDataSource<Judges>(val as Judges[]);
        this.dataSource.data = d.data;
        this.dataSourcFilter.data = d.data;
        this.data = this.dataSource.data;
        console.log("this.data", this.data)
        this.dataSource.filterPredicate = this.createFilter();
        this.filterSelectObj.filter((o) => {
          o.options = this.getFilterObject(this.dataSource.filteredData, o.columnProp);
        });
      });
    });

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
    //alert(item.SessionId)
      this.itempropID = item;
    if (item.SessionId == 0) {
            this.serverService.getId_W_Proposals(item).subscribe((events) => {
                this.oneProp = events;
                this.SessionName = this.oneProp.SessionName;
              this.Chairman = this.oneProp.Chairman;
              if (events.Remarks == null) {
                this.oneProp.Remarks = "";
              }
                this.Remarks = this.oneProp.Remarks;
              this.Status = this.oneProp.Status;
              //alert("'ss"+this.Status+"'ss");
              this.isShowPropArrSession = false;

                this.isShowProp = true;
            });
        }
      else {
            this.serverService.getId_W_ProposalsSession(item).subscribe((events) => {
              this.ArrPropSession = events;
              console.log("session",events)
                this.SessionName = item.SessionName;
                this.Chairman = item.Chairman;
              this.Status = item.Status;
              this.isShowProp = false;
                this.isShowPropArrSession = true;
            });
        }
    }

    getImgIcon(item: Judges) {
      if (item.NumOfProposals==0)
            return "/assets/images/single.gif";
        else {
          if (item.NumOfProposals<4) {
            return "/assets/images/group_missing.gif";
             
          }
          else {
            
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
            case "Lecturer Name":
                this.dataSource.data = this.dataSourcFilter.data.filter(function (item) {
                    var str = (item.FirstNameEnglish + " ").replace(/\s/g, '') + ' ' + (item.LastNameEnglish + " ").replace(/\s/g, '');
                    return (str + " ").toLowerCase().includes(search)
                }) as Judges[];
                break;
            case "Lecture Name":
                this.dataSource.data = this.dataSourcFilter.data.filter(function (item) {
                     return (item.UserName + " ").toLowerCase().includes(search)
                     }) as Judges[];
                break;
            case "Session Name":
                this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.SessionName + " ").toLowerCase().includes(search) }) as Judges[];
                break;
            // case "Sub Div":
            //     this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.SubDivision + " ").toLowerCase().includes(search) }) as Judges[];
            //     break;
            case "All":
                this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return (item.SubDivision + " ").toLowerCase().includes(search) }) as Judges[];
                break;
        }
    }

  ngOnInit() {
   // alert("ss");
      
        this.myControl.valueChanges.subscribe(newValue => {
            this.filterValues(newValue);
        })
        this.serverService.DivisionEnglish().subscribe((events) => {
            this.ArrDivision = events;
        });
    this.serverService.getAll_W_Proposals().subscribe(val => {
      this.over = new Array(val.length);
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
  imageDark(element) {
    //alert("hover");
   // element.setAttribute('src', '/assets/images/EditHover.jpg');
    this.imgSrc = "/assets/images/EditHover.jpg";
   // this.edit.nativeElement.src = "/assets/images/EditHover.jpg"
  }
  imageNormal(){
    this.imgSrc = "/assets/images/Edit.jpg";
  }
  filterChange(filter, event) {
    //this.SelectDiv.nativeElement.style.color = "#E8E8E8";

    let filterOfValue = {}
    this.filterOfValue[filter.columnProp] = event.target.value.trim().toLocaleLowerCase()
    
    //this.dataSource.filterPredicate = function (data: any, filterValue: string) {
    //  return data.Division /** replace this with the column name you want to filter */
    //    .trim()
    //    .toLocaleLowerCase().indexOf([filter.modelValue].trim().toLocaleLowerCase()) >= 0;
    //};
    this.dataSource.filter = JSON.stringify(this.filterOfValue);
    // this.SelectDiv.nativeElement.se
    //document.getElementsByClassName
   // document.getElementById["SelectDiv"].
  }
   
  ChangecolorBlueDiv() {
   // this.SelectDiv.nativeElement.style.color = "#167c9f";
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
  
  onStatusChange(statusValueChecked: string) {
    if (this.oneProp.Status == "Accepted" || this.oneProp.Status == "Accepted            ") {
      this.oneProp.Status = statusValueChecked;
      if (statusValueChecked == "Rejected") {
        if (typeof this.Accepted1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }
        if (typeof this.Accepted2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }
        if (typeof this.Accepted3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }
        if (typeof this.Accepted !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;}
        
      } if (statusValueChecked == "Accepted") {
        if (typeof this.Rejected1 !== 'undefined') {

          this.Rejected1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        } if (typeof this.Rejected2 !== 'undefined') {

          this.Rejected2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        } if (typeof this.Rejected3 !== 'undefined') {

          this.Rejected3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        } if (typeof this.Rejected !== 'undefined') {

          this.Rejected.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }
      }

      if (statusValueChecked == "RR") {
        if (typeof this.Rejected1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.Rejected1.nativeElement.checked = false;
        }
        if (typeof this.Rejected2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.Rejected2.nativeElement.checked = false;
        } if (typeof this.Rejected3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.Rejected3.nativeElement.checked = false;
        } if (typeof this.Rejected !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.Rejected.nativeElement.checked = false;
        }
      }
    }

    if (this.oneProp.Status == "Rejected" || this.oneProp.Status == "Rejected            ") {
      this.oneProp.Status = statusValueChecked;
      if (statusValueChecked == "Rejected") {
        if (typeof this.Accepted2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }if (typeof this.Accepted1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }if (typeof this.Accepted3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }if (typeof this.Accepted !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }
      } if (statusValueChecked == "Accepted") {
        if (typeof this.Rejected2 !== 'undefined') {
          this.Rejected2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }if (typeof this.Rejected1 !== 'undefined') {
          this.Rejected1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }if (typeof this.Rejected3 !== 'undefined') {
          this.Rejected3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }if (typeof this.Rejected !== 'undefined') {
          this.Rejected.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }
      } if (statusValueChecked == "RR") {
        if (typeof this.Rejected2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.Rejected2.nativeElement.checked = false;
        } if (typeof this.Rejected1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.Rejected1.nativeElement.checked = false;
        } if (typeof this.Rejected3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.Rejected3.nativeElement.checked = false;
        } if (typeof this.Rejected !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.Rejected.nativeElement.checked = false;
        }
      }
    } if (this.oneProp.Status == "RR                  " || this.oneProp.Status == "RR") {
      this.oneProp.Status = statusValueChecked;
      if (statusValueChecked == "Rejected") {
        if (typeof this.Accepted3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }if (typeof this.Accepted1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }if (typeof this.Accepted2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }if (typeof this.Accepted !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }
      } if (statusValueChecked == "Accepted") {
        if (typeof this.Rejected3 !== 'undefined') {
          this.Rejected3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }if (typeof this.Rejected1 !== 'undefined') {
          this.Rejected1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }if (typeof this.Rejected2 !== 'undefined') {
          this.Rejected2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }if (typeof this.Rejected !== 'undefined') {
          this.Rejected.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }
      } if (statusValueChecked == "RR") {
        if (typeof this.Rejected3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.Rejected3.nativeElement.checked = false;
        }if (typeof this.Rejected2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.Rejected2.nativeElement.checked = false;
        }if (typeof this.Rejected1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.Rejected1.nativeElement.checked = false;
        }if (typeof this.Rejected !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.Rejected.nativeElement.checked = false;
        }
      }
    }
    if (this.oneProp.Status == "Pending" || this.oneProp.Status == "Pending             ") {
      this.oneProp.Status = statusValueChecked;
      if (statusValueChecked == "Rejected") {
        if (typeof this.Accepted !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }if (typeof this.Accepted1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }if (typeof this.Accepted2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }if (typeof this.Accepted3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }
      } if (statusValueChecked == "Accepted") {
        if (typeof this.Rejected !== 'undefined') {
          this.Rejected.nativeElement.checked = false;
          this.RR.nativeElement.checked = false;
        }if (typeof this.Rejected1 !== 'undefined') {
          this.Rejected1.nativeElement.checked = false;
          this.RR1.nativeElement.checked = false;
        }if (typeof this.Rejected2 !== 'undefined') {
          this.Rejected2.nativeElement.checked = false;
          this.RR2.nativeElement.checked = false;
        }if (typeof this.Rejected3 !== 'undefined') {
          this.Rejected3.nativeElement.checked = false;
          this.RR3.nativeElement.checked = false;
        }
      } if (statusValueChecked == "RR") {
        if (typeof this.Rejected !== 'undefined') {
          this.Accepted.nativeElement.checked = false;
          this.Rejected.nativeElement.checked = false;
        } if (typeof this.Rejected1 !== 'undefined') {
          this.Accepted1.nativeElement.checked = false;
          this.Rejected1.nativeElement.checked = false;
        } if (typeof this.Rejected2 !== 'undefined') {
          this.Accepted2.nativeElement.checked = false;
          this.Rejected2.nativeElement.checked = false;
        } if (typeof this.Rejected3 !== 'undefined') {
          this.Accepted3.nativeElement.checked = false;
          this.Rejected3.nativeElement.checked = false;
        }
      }
}
    
 
    console.log(" this.oneProp.Status Value is : ",this.oneProp.Status );
  }
  onStatusPropSessionChangeR(PropSession) {
    
    this.ArrPropSession.forEach((prop) => {
      if (prop.IdProposal == PropSession.IdProposal){
            prop.Status=  "Rejected            ";

        }
        });
} onStatusPropSessionChangeRR(PropSession) {
    
    this.ArrPropSession.forEach((prop) => {
      if (prop.IdProposal == PropSession.IdProposal){
            prop.Status=  "RR                  ";

        }
        });
} onStatusPropSessionChangeA(PropSession) {
    
    this.ArrPropSession.forEach((prop) => {
      if (prop.IdProposal == PropSession.IdProposal){
            prop.Status=  "Accepted            ";

        }
        });
} 
  
  Save(oneProp: any) {
        this.newProp = new Judges();
        if (this.oneProp.Division == null)
            this.newProp.Division = this.Division;
        else
                this.newProp.Division = this.oneProp.Division;

        if (this.oneProp.SubDivision == null)
            this.newProp.SubDivision = this.subdivision;
        else
                this.newProp.SubDivision = this.oneProp.SubDivision;


        this.newProp.IdProposal = this.oneProp.IdProposal;
        this.newProp.UserName = this.oneProp.UserName;
        if (this.oneProp.TitleEnglish == null)
            this.newProp.TitleEnglish = null;
        else
            this.newProp.TitleEnglish = this.oneProp.TitleEnglish;
        if (this.oneProp.TitleHebrew == null)
            this.newProp.TitleHebrew = null;
        else
            this.newProp.TitleHebrew = this.oneProp.TitleHebrew;
        if (this.oneProp.Proposal == null)
            this.newProp.Proposal = null;
        else
            this.newProp.Proposal = this.oneProp.Proposal;
        if (this.oneProp.Language == null)
            this.newProp.Language = null;
        else
            this.newProp.Language = this.oneProp.Language;
        if (this.oneProp.Keywords == null)
            this.newProp.Keywords = null;
        else
            this.newProp.Keywords = this.oneProp.Keywords;
        if (this.oneProp.SessionName == null)
            this.newProp.SessionName = null;
        else
            this.newProp.SessionName = this.oneProp.SessionName;
        if (this.oneProp.Chairman == null)
            this.newProp.Chairman = null;
        else
            this.newProp.Chairman = this.oneProp.Chairman;
        if (this.oneProp.Remarks == null)
            this.newProp.Remarks = null;
        else
            this.newProp.Remarks = this.oneProp.Remarks;
        if (this.oneProp.Status == null)
            this.newProp.Status = null;
        else
      this.newProp.Status = this.oneProp.Status;
        this.serverService.sendUpdateProp(this.newProp);

        this.isShowProp = false;
        this.dataSource.data.forEach((prop) => {
            if(prop.IdProposal==this.oneProp.IdProposal){
                prop=this.oneProp
            }
            });
    this.changePlaying();
    this.changePlaying();
    this.changePlaying();
            //this.serverService.getAll_W_Proposals().subscribe(val => {
            //    this.over = new Array(val.length);
            //         let d=new MatTableDataSource<Judges>(val as Judges[]);
            //         this.dataSource.data = d.data;
            //          this.dataSourcFilter.data = d.data;
            //          this.data = this.dataSource.data;
            //          console.log("this.data",this.data )
            //          this.dataSource.filterPredicate = this.createFilter();
            //          this.filterSelectObj.filter((o) => {
            //              o.options = this.getFilterObject(this.dataSource.filteredData, o.columnProp);
            //            });
            //      });
                // location.reload();
    }

    

    SavePropSession(PropSession) {
        this.newProp = new Judges();

        if (PropSession.Division == null)
            this.newProp.Division = null;
        else
                this.newProp.Division = PropSession.Division;

        if (PropSession.SubDivision == null)
            this.newProp.SubDivision = null;
        else
                this.newProp.SubDivision = PropSession.SubDivision;


        this.newProp.IdProposal = PropSession.IdProposal;
        this.newProp.UserName = PropSession.UserName;
        if (PropSession.TitleEnglish == null)
            this.newProp.TitleEnglish = null;
        else
            this.newProp.TitleEnglish = PropSession.TitleEnglish;
        if (PropSession.TitleHebrew == null)
            this.newProp.TitleHebrew = null;
        else
            this.newProp.TitleHebrew = PropSession.TitleHebrew;
        if (PropSession.Proposal == null)
            this.newProp.Proposal = null;
        else
            this.newProp.Proposal = PropSession.Proposal;
        if (PropSession.Language == null)
            this.newProp.Language = null;
        else
            this.newProp.Language = PropSession.Language;
        if (PropSession.Keywords == null)
            this.newProp.Keywords = null;
        else
            this.newProp.Keywords = PropSession.Keywords;
        if (PropSession.SessionName == null)
            this.newProp.SessionName = null;
        else
            this.newProp.SessionName = PropSession.SessionName;
        if (PropSession.Chairman == null)
            this.newProp.Chairman = null;
        else
            this.newProp.Chairman = PropSession.Chairman;
        if (PropSession.Remarks == null)
            this.newProp.Remarks = null;
        else
            this.newProp.Remarks = PropSession.Remarks;
        if (PropSession.Status == null)
            this.newProp.Status = null;
        else
            this.newProp.Status = PropSession.Status;
        this.serverService.sendUpdateProp(this.newProp);

        this.isShowPropArrSession = true;

            // this.ArrPropSession.forEach((prop) => {
            //     if(prop.IdProposal==this.newProp.IdProposal){
            //         prop=this.newProp;
        
            //     }
            //     });


      this.changePlaying();
      this.changePlaying();
      this.changePlaying();
            //this.serverService.getAll_W_Proposals().subscribe(val => {
            //    this.over = new Array(val.length);
            //         let d=new MatTableDataSource<Judges>(val as Judges[]);
            //         this.dataSource.data = d.data;
            //          this.dataSourcFilter.data = d.data;
            //          this.data = this.dataSource.data;
            //          console.log("this.data",this.data )
            //          this.dataSource.filterPredicate = this.createFilter();
            //          this.filterSelectObj.filter((o) => {
            //              o.options = this.getFilterObject(this.dataSource.filteredData, o.columnProp);
            //            });
            //      });
        return;
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
        if (this.field == 'Lecture Name'){
            this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return !item.UserName.toLowerCase().includes(value) }) as Judges[];
         }
          if (this.field == 'Session Name'){
            this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return !item.SessionName.toLowerCase().includes(value) }) as Judges[];
          }
        // if (this.field == 'Title') {
        //     this.dataSource.data = this.dataSourcFilter.data.filter(function (item) { return !item.TitleEnglish.toLowerCase().includes(value) }) as Judges[];
        // }
        if (this.field == 'All') {
            this.dataSource.data = this.dataSourcFilter.data;
        }
  }
  Accepted11(value: string): boolean {
    if (value == "Accepted            ")
      return true;
    return false;
  } RR11(value: string): boolean {
    if (value == "RR                  ")
      return true;
    return false;
  } Rejected11(value: string): boolean {
    if (value == "Rejected            ")
      return true;
    return false;
  }
    NoFilter() {
        this.serverService.getAll_W_Proposals().subscribe(val => this.PropJudges = val);
  }
 
}

