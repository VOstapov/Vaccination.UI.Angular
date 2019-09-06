import { Injectable } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Patient } from '../models/patient.model';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { mergeMap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class PatientService extends BaseApi<Patient>{

  constructor(http: Http,
    private route: ActivatedRoute) {
    super(http, "patient");
  }

  getCurrentPatient(): Observable<Patient> {
    return this.route.params
      .pipe(switchMap((params: Params) => {
        if (params.id) {
          return this.get(params.id);
        } else {
          return null;
        }
      }));
  }
}
