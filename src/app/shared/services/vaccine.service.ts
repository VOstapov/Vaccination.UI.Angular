import { Injectable, OnDestroy } from "@angular/core";
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';
import { Vaccine } from '../models/vaccine.model';
import { Route, ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class VaccineService extends BaseApi<Vaccine> implements OnDestroy {

  sub: Subscription;

  constructor(http: Http,
    router: Router,
    route:ActivatedRoute) {
      super(http, '');

      this.sub = route.params.subscribe((params: Params) => this.url = `patient/${params.id}/vaccine`);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}