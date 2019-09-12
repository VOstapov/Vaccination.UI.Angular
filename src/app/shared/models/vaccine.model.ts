import { BaseModel } from './baseModel';
import { Medication } from './medication.model';

export class Vaccine extends BaseModel {
  constructor(
    public medication: Medication,
    public agreement: boolean,
    public date: Date,
    id: Number,
    public patientId: Number
  ) {
    super(id);
  }
}