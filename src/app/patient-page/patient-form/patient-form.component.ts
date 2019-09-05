import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from 'src/app/shared/services/patient.service';
import * as moment from 'moment';
import { Patient } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  form: FormGroup;

  @Input() isLoaded = false;

  @Output() patientEmitter = new EventEmitter<Patient>();

  @Input() patient: Patient;

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

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 0, 1);
  minDateStr: string;
  maxDateStr: string;

  constructor() { }

  ngOnInit() {
    this.minDateStr = moment(this.minDate).format("YYYY-MM-DD");
    this.maxDateStr = moment(this.maxDate).format("YYYY-MM-DD");

    this.form = new FormGroup({
      'soname': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'patronomic': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required, this.checkForCorrectDate.bind(this)]),
      'snils': new FormControl(null, [Validators.required]),
      'gender': new FormControl("Мужской", [Validators.required])
    });
  }

  checkForCorrectDate(control: FormControl) {
    const date = new Date(control.value);

    if (date > this.maxDate) {
      return {
        'maxDateError': true
      };
    } else if (date < this.minDate) {
      return {
        'minDateError': true
      };
    }

    return null;
  }

  onSubmit() {
    const { soname, name, patronomic, birthday, gender, snils } = this.form.value;
    const patient = new Patient(
      soname,
      name,
      patronomic,
      birthday,
      gender,
      snils, this.patient ? this.patient.id : undefined);
    this.patientEmitter.emit(patient);
  }
}
