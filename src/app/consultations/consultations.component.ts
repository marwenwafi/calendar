import { Component, OnInit } from '@angular/core';
import {ConsulationService} from "../services/consulation.service";

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {

  consultationslist;

  constructor(private consService: ConsulationService) { }

  ngOnInit(): void {
    this.consService.getAllConsultations().subscribe(
      (data) => {this.consultationslist = data;},
      (error) => console.log(error)
    );
    console.log(this.consultationslist);
  }

}
