import {Component, ElementRef, OnInit} from '@angular/core';
import {ConsulationService} from "../services/consulation.service";
import {IMyDpOptions} from 'mydatepicker';
import { ViewChildren, QueryList } from '@angular/core';


@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {

  consultationslist;

  constructor(private consService: ConsulationService) { }

  @ViewChildren('cmp') components:ElementRef;

  ngAfterViewInit(){
    // print array of CustomComponent objects
    console.log(this.components);
  }

  ngOnInit(): void {
    this.consService.getAllConsultations().subscribe(
      (data) => {this.consultationslist = data;},
      (error) => console.log(error)
    );
    console.log(this.consultationslist);
  }

}
