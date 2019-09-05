import { Injectable } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Patient } from '../models/patient.model';

@Injectable()
export class PatientService extends BaseApi<Patient>{
  constructor(http: Http) {
    super(http, "patient");
  }
}
