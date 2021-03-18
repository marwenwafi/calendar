import {Component, ElementRef, OnInit} from '@angular/core';
import {ConsulationService} from "../services/consulation.service";
import {FormControl, FormGroup} from "@angular/forms";
import {add, sub, format, startOfWeek, endOfWeek, getHours, getMinutes} from 'date-fns'
import {Consultation} from "../model/Consultation";


@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {

  today;
  startOfWeek;
  startText;
  endOfWeek;
  endText;
  consultationslist;
  classes;

  constructor(private consService: ConsulationService) {
  }

  ngOnInit(): void {
    //initialize the picker
    this.backToCurrentWeek();
  }

  ngOnChanges(): void{
    console.log("here!!!!!!!!!!!");
  }

  //load Consultations from service
  loadConsultationsByWeek(start, end) {
    this.consService.getAllConsultations().subscribe(
      (data) => {
        this.consultationslist = data.filter(m => new Date(m.start_time) >= new Date(start) && new Date(m.start_time) <= new Date(end));
        //this.sortByDateAsc();
        console.log(this.consultationslist);
        //this.setConsultationsList(
        //data
        //data.filter(m => new Date(m.start_time) >= new Date(start) && new Date(m.start_time) <= new Date(end))
        //);
      },
      (error) => console.log(error)
    );
  }

  // Make only Mondays Selectable
  filterSelectableDays() {
    return (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      return day == 1;
    }
  }

  // change week to previous one and load Consulations
  previousWeek() {
    this.startOfWeek = sub(this.startOfWeek, {days: 7});
    this.startText = format(this.startOfWeek, "d MMMM yyyy");
    this.endOfWeek = sub(this.endOfWeek, {days: 7});
    this.endText = format(this.endOfWeek, "d MMMM yyyy");
    this.loadConsultationsByWeek(this.startOfWeek, this.endOfWeek);
  }

  // change week to next one and load Consulations
  nextWeek() {
    this.startOfWeek = add(this.startOfWeek, {days: 7});
    this.startText = format(this.startOfWeek, "d MMMM yyyy");
    this.endOfWeek = add(this.endOfWeek, {days: 7});
    this.endText = format(this.endOfWeek, "d MMMM yyyy");
    this.loadConsultationsByWeek(this.startOfWeek, this.endOfWeek);
  }

  //Today button logic
  backToCurrentWeek() {
    this.today = new Date();
    this.startOfWeek = startOfWeek(this.today, {weekStartsOn: 1});
    this.startText = format(this.startOfWeek, "d MMMM yyyy");
    this.endOfWeek = endOfWeek(this.today, {weekStartsOn: 1});
    this.endText = format(this.endOfWeek, "d MMMM yyyy");
    this.loadConsultationsByWeek(this.startOfWeek, this.endOfWeek);
  }

  // Sort Consultations By Asc order
  public sortByDateAsc(): void {
    this.consultationslist.sort((a: Consultation, b: Consultation) => {
      return +new Date(a.start_time) - +new Date(b.start_time);
    });
  }

  //Decide classes according to Dates, hence placement in the grid
  getEventClass(start_time: any) {
    var classes = "session session-1";
    switch (format(new Date(start_time), "ccc")) {
      case "Mon": {
        classes += " track-1"
        break;
      }
      case "Tue": {
        classes += " track-2"
        break;
      }
      case "Wed": {
        classes += " track-3"
        break;
      }
      case "Thu": {
        classes += " track-4"
        break;
      }
      case "Fri": {
        classes += " track-5"
        break;
      }
    }
    //console.log(classes);
    return classes;
  }

  roundTime(date: any) {
    var coeff = 1000 * 60 * 30;
    return new Date(Math.round(new Date(date).getTime() / coeff) * coeff);
  }


  getEventTime(start_time: any, end_time: any): object {
    var rows = (getHours(new Date(start_time)) - 8) * 60 + getMinutes(new Date(start_time))+2;
    var rowe = (getHours(new Date(end_time)) - 8) * 60 + getMinutes(new Date(end_time))+2;
    console.log("grid-row: " + rows + "/" + rowe);
    return {'grid-row': rows + "/" + rowe};
  }
}
