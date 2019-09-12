import { Injectable } from '@angular/core';
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Medication } from '../models/medication.model';

@Injectable()
export class MedicationService extends BaseApi<Medication> {
  path: string = "medication";
  constructor(http: Http) {
    super(http);
  }
}