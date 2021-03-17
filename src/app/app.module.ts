import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationsComponent } from './consultations/consultations.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {DateFnsDateAdapter, MAT_DATE_FNS_DATE_FORMATS} from "./utils/DateFnsDateAdapter";
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    ConsultationsComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [{
    provide: DateAdapter,
    useClass: DateFnsDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FNS_DATE_FORMATS
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
