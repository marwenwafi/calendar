import {Patient} from "./Patient";
import {ConsultationType} from "./ConsultationType";

export class Consultation {
  id: number;
  start_time: Date;
  end_time: Date;
  patient: Patient;
  type: ConsultationType;
}
