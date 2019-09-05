import { Injectable } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Vaccine } from '../models/vaccine.model';
import { Route, ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class VaccineService extends BaseApi<Vaccine> {
  constructor(http: Http,
    router: Router) {

      const spl = router.url.split('/');
      spl[spl.findIndex(x => x === "patient") + 1];
      // http://localhost:4200/patient/{id}/...
      // вытащим id
      super(http, `patient/${spl[spl.findIndex(x => x === "patient") + 1]}/vaccine`);
  }
}