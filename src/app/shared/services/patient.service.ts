import { Injectable } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Patient } from '../models/patient.model';
import { Observable, combineLatest, of, throwError } from 'rxjs';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';

/*
  в di регистрировать в каждом компоненте, т.к. сервис привязан к текущему урл.
*/
@Injectable()
export class PatientService extends BaseApi<Patient>{

  get path(): string {
    return "patient";
  }

  constructor(http: Http,
    private route: ActivatedRoute,
    private router: Router) {
    super(http);
  }

  getCurrentPatient(): Observable<Patient> {
    return this.get(this.route.snapshot.params['patientid'])
      .pipe(map((patient: Patient) => patient))
      .pipe(catchError(err => {
        this.router.navigate(
          ['/patient'],
          { queryParams: { messageText: 'Пациент не найден', messageType: 'danger' } });
        throw throwError(err);
      }));
  }
}
