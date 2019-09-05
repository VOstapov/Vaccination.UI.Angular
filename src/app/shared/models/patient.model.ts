import { BaseModel } from './baseModel';

export class Patient extends BaseModel {
  constructor(
    public soname: string,
    public name: string,
    public patronomic: string,
    public birthday: Date,
    public gender: string,
    public snils: string,
    id: Number = undefined
  ) {
    super(id);
  }
}