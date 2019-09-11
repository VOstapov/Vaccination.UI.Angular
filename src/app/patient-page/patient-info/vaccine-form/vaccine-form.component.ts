import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { DateValidator } from 'src/app/shared/validators/dateValidator';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent implements OnInit {
  form: FormGroup;

  @Output() formEmitter = new EventEmitter<FormGroup>();

  @Input() vaccine: Vaccine;

  maxDate: Date = new Date();
  minDate: Date = new Date(2000, 0, 1);
  minDateStr: string;
  maxDateStr: string;

  medications: string[] = ['Эджерикс', 'Вианвак', 'АКДС', 'БЦЖ']
  selectedMedication: string = this.medications[0];

  constructor() { 
    this.form = new FormGroup({
      'medication': new FormControl(this.selectedMedication, [Validators.required]),
      'date': new FormControl(null, [Validators.required, DateValidator.checkForCorrectDate(this.minDate, this.maxDate)]),
      'agreement': new FormControl(false, [Validators.requiredTrue])
    });

    this.form.statusChanges.subscribe(x => this.formEmitter.emit(this.form));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vaccine'] && this.vaccine) {
      this.form.patchValue({
        agreement: this.vaccine.agreement,
        date: moment(this.vaccine.date).format("YYYY-MM-DD")
      });

      this.selectedMedication = this.vaccine.medication;
    }
  }

  ngOnInit() {
    this.minDateStr = moment(this.minDate).format("YYYY-MM-DD");
    this.maxDateStr = moment(this.maxDate).format("YYYY-MM-DD");
  }

  onMedicalChange(event: any) {
    this.selectedMedication = event.target.value;
  }
}
