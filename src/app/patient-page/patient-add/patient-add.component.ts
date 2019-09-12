import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Gender } from 'src/app/shared/models/gender.model';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css'],
  providers: [PatientService]
})
export class PatientAddComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private patientService: PatientService) {

  }

  ngOnInit(): void {
    
  }

  formChanged(form: FormGroup) {
    this.form = form;
  }

  onSave() {
    const { soname, name, patronomic, birthday, gender, snils } = this.form.value;
    const patient = new Patient(
      soname,
      name,
      patronomic,
      birthday,
      new Gender(gender, null),
      snils,
      undefined);

    const sub = this.patientService
    .post(patient)
    .subscribe((patient: Patient) => {
      this.router.navigate(['/patient', `${patient.id}`,'edit']);
      sub.unsubscribe();
    });
  }

}
