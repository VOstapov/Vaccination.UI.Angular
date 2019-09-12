import { Injectable } from '@angular/core';
import { Gender } from '../models/gender.model';
import { BaseApi } from '../core/baseApi';
import { Http } from '@angular/http';

@Injectable()
export class GenderService extends BaseApi<Gender> {
  path: string = "gender";
  constructor(http: Http) {
    super(http);
  }
}