import {Component, ElementRef, OnInit} from '@angular/core';
import {ConsulationService} from "../services/consulation.service";
import {FormControl, FormGroup} from "@angular/forms";
import { add, sub, format, startOfWeek,endOfWeek } from 'date-fns'


@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {

  today;
  startOfWeek;
  start;
  endOfWeek;
  end;
  consultationslist;

  constructor(private consService: ConsulationService) {
    //initialize the picker
    this.today = new Date();
    this.startOfWeek = startOfWeek(this.today, { weekStartsOn: 1 });
    this.start = format(this.startOfWeek, "d MMMM yyyy");
    this.endOfWeek = endOfWeek(this.today, { weekStartsOn: 1 });
    this.end = format(this.endOfWeek,"d MMMM yyyy");
  }

  ngOnInit(): void {

    this.loadConsultations();
  }

  //load Consultations from service
  loadConsultations()
  {
    this.consService.getAllConsultations().subscribe(
      (data) => {this.consultationslist = data;},
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

  previousWeek()
  {
    this.startOfWeek = sub(this.startOfWeek,{days:7});
    this.start = format(this.startOfWeek, "d MMMM yyyy");
    this.endOfWeek = sub(this.endOfWeek,{days:7});
    this.end = format(this.endOfWeek,"d MMMM yyyy");
  }

  nextWeek()
  {
    this.startOfWeek = add(this.startOfWeek,{days:7});
    this.start = format(this.startOfWeek, "d MMMM yyyy");
    this.endOfWeek = add(this.endOfWeek,{days:7});
    this.end = format(this.endOfWeek,"d MMMM yyyy");
  }
}
