import { Injectable } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class PatientService extends BaseApi<Patient>{

  constructor(http: Http,
    private router: Router) {
    super(http, "patient");
  }

  getCurrentPatient(): Observable<Patient> {
    const spl = this.router.url.split('/');
    const inx = spl.findIndex(x => x === "patient");
    if (inx >= 0) {
      const id = spl[inx + 1];
      return this.get(id);
    } else {
      return null;
    }
  }
}
