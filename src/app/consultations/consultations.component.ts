import {Component, ElementRef, OnInit} from '@angular/core';
import {ConsulationService} from "../services/consulation.service";
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {

  faCalendar = faCalendar;
  today = new Date();
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy'
    // other options are here...
  };

  model: IMyDateModel = null;



  consultationslist;

  constructor(private consService: ConsulationService) { }

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
    console.log(this.consultationslist);
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    console.log(event.singleDate.date);
  }

}
