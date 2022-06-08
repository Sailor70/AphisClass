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

@NgModule({
  declarations: [
    AppComponent,
    AphidsListComponent,
    AddAphisComponent,
    AphisDetailsComponent,
    ClassifyAphidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
