import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AphidsListComponent } from './components/aphids-list/aphids-list.component';
import { AddAphisComponent } from './components/add-aphis/add-aphis.component';
import { AphisDetailsComponent } from './components/aphis-details/aphis-details.component';
import { ClassifyAphidComponent } from './components/classify-aphid/classify-aphid.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DateTimePipe } from './pipes/date-time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AphidsListComponent,
    AddAphisComponent,
    AphisDetailsComponent,
    ClassifyAphidComponent,
    DateTimePipe
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        TooltipModule,
        InfiniteScrollModule,
        CalendarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
