import { Http, Response } from "../../../../node_modules/@angular/http";
import { Injectable } from "../../../../node_modules/@angular/core";
import { Observable } from "../../../../node_modules/rxjs";
import { map } from 'rxjs/operators';
import { BaseModel } from '../models/baseModel';

@Injectable()
export abstract class BaseApi<TResult extends BaseModel> {

  abstract get path(): string;

  private get baseUrl(): string {
    return `api/${this.path}/`;
  }

  constructor(protected http: Http) { }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<TResult> {
    return this.http.get(this.getUrl(url))
      .pipe(map((response: Response) => response.json()))
  }

  public getAll(url: string = ''): Observable<TResult[]> {
    return this.http.get(this.getUrl(url))
      .pipe(map((response: Response) => response.json()));
  }

  public post(data: TResult): Observable<TResult> {
    return this.http.post(this.baseUrl, data)
      .pipe(map((response: Response) => response.json()));
  }

  public put(data: TResult): Observable<TResult> {
    return this.http.put(this.getUrl(data.id.toString()), data)
      .pipe(map((response: Response) => response.json()));
  }

  public delete(data: TResult): Observable<TResult> {
    return this.http.delete(this.getUrl(data.id.toString()))
      .pipe(map((response: Response) => data));
  }
}