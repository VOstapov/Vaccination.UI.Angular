import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Patient } from 'src/app/shared/models/patient.model';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { SnilsValidator } from 'src/app/shared/validators/snils.validator';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  form: FormGroup;

  @Output() formEmitter = new EventEmitter<FormGroup>();
  @Input() patient: Patient;

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 0, 1);
  minDateStr: string;
  maxDateStr: string;

  constructor() {
    this.form = new FormGroup({
      'soname': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'patronomic': new FormControl(null),
      'birthday': new FormControl(null, [Validators.required, DateValidator.checkForCorrectDate(this.minDate, this.maxDate)]),
      'snils': new FormControl(null, [Validators.required, SnilsValidator.checkOnControlSum()]),
      'gender': new FormControl("Мужской", [Validators.required])
    });

    this.form.statusChanges
      .subscribe(() => this.formEmitter.emit(this.form));
  }

  ngOnInit() {
    this.minDateStr = moment(this.minDate).format("YYYY-MM-DD");
    this.maxDateStr = moment(this.maxDate).format("YYYY-MM-DD");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.form.patchValue({
        soname: this.patient.soname,
        name: this.patient.name,
        patronomic: this.patient.patronomic,
        birthday:  moment(this.patient.birthday).format("YYYY-MM-DD"),
        gender: this.patient.gender,
        snils: this.patient.snils
      });
    }
  }
}
