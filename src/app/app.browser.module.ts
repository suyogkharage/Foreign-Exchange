import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataService} from './data.service';
import { MatTableModule } from '@angular/material'  
import { MatPaginatorModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    AppModule,
    BrowserTransferStateModule
   
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
