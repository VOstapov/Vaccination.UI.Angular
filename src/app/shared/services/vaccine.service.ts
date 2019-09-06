import { Injectable, OnDestroy } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Vaccine } from '../models/vaccine.model';
import { Route, ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
/*
  в di регистрировать в каждом компоненте, т.к. в конструкторе идет определение
*/
export class VaccineService extends BaseApi<Vaccine> {

  get path(): string {
    return `patient/${this.route.snapshot.params['patientid']}/vaccine`;
  }

  constructor(http: Http,
    private route: ActivatedRoute) {
    super(http);
  }
}