import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Consultation} from "../model/Consultation";

@Injectable({
  providedIn: 'root'
})
export class ConsulationService {

  url = "./assets/consultation.json"

  constructor(private http: HttpClient) { }


  //get all consultations list from specified url above

  getAllConsultations()
  {
    return this.http.get<Consultation[]>(this.url);
  }
}
