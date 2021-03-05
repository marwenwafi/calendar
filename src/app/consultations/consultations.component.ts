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
  endOfWeek;
  consultationslist;

  constructor(private consService: ConsulationService) {
    //initialize the picker
    this.today = new Date();
    this.startOfWeek = startOfWeek(this.today);
    this.endOfWeek = endOfWeek(this.today);
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

  }

  nextWeek()
  {

  }
}
