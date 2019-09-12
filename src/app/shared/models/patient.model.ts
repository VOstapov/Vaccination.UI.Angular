import { BaseModel } from './baseModel';
import { Gender } from './gender.model';

export class Patient extends BaseModel {
  constructor(
    public soname: string,
    public name: string,
    public patronomic: string,
    public birthday: Date,
    public gender: Gender,
    public snils: string,
    id: Number = undefined
  ) {
    super(id);
  }
}