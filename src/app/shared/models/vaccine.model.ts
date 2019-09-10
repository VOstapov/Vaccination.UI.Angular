import { BaseModel } from './baseModel';

export class Vaccine extends BaseModel {
  constructor(
    public medication: string,
    public agreement: boolean,
    public date: Date,
    id: Number
  ) {
    super(id);
  }
}