import { Component, OnInit,ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import {DataService} from './data.service';
import {Exchange} from './exchange';
import {User} from './user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
   
  
    if (!isPlatformBrowser(this.platformId)) {
        let bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
            bases[0].setAttribute('href', environment.baseHref);
        }
    }
}

  displayedColumns: string[] = ['countryCode', 'rate'];
  
  selected;
  users: User[];
  keyArr = [];
  valueArr = [];
  ELEMENT_DATA: Exchange[] = [];
  newCode="";

  nameFilter = new FormControl('');
  
  
  //columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  filterValues = {
    countryCode: '',
    
  };

  dataSource = new MatTableDataSource<Exchange>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any, private dataService:DataService, private route: Router){
    
    this.getData("");
  }

  
  
  fromDropDown(code){
    var code1 = code;
    this.dataSource = new MatTableDataSource<Exchange>();
    this.getData(code1);
  }
  
  getData(code){

    this.nameFilter.valueChanges
    .subscribe(
      name => {
        this.filterValues.countryCode = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.newCode = code;
    console.log(this.newCode);
    
    return this.dataService.getExchangeData(this.newCode)
    .subscribe(data=>{
      this.users=data;

      this.users = Object.keys(this.users).map(e=>this.users[e]);
      
      var arr = this.users[1];
      this.keyArr = Object.keys(arr).map(e=>e);
      this.valueArr = Object.keys(arr).map(e=>arr[e]);

      console.log(this.ELEMENT_DATA.length);
      if(this.ELEMENT_DATA.length>0){
        this.ELEMENT_DATA = [];
      }

      for(var i in this.keyArr, this.valueArr){
        if(this.keyArr[i]!=code){
          this.ELEMENT_DATA.push({countryCode:this.keyArr[i],rate:this.valueArr[i]});
        }
        
      }
      console.log(this.ELEMENT_DATA);

      this.dataSource = new MatTableDataSource<Exchange>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
    
    })
  }
  createFilter(): (dataSource: any, filter: string) => boolean {
    let filterFunction = function(dataSource, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return dataSource.countryCode.toLowerCase().indexOf(searchTerms.countryCode) !== -1;
       
    }
    return filterFunction;
  }

}
