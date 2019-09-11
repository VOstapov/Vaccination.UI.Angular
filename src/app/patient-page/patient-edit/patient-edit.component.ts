import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from 'src/app/shared/services/patient.service';
import * as moment from 'moment';
import { Patient } from 'src/app/shared/models/patient.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
  providers: [PatientService]
})
export class PatientEditComponent implements OnInit, OnDestroy {


  form: FormGroup;

  s1: Subscription;
  patient: Patient;

  isLoaded = false;

  constructor(
    private router: Router,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.s1 = this.patientService.getCurrentPatient()
      .subscribe(
        (patient: Patient) => {
          this.patient = patient;
          this.isLoaded = true;
          return patient;
        });
  }

  ngOnDestroy(): void {
    if (this.s1) {
      this.s1.unsubscribe();
    }
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
      gender,
      snils,
      this.patient.id);

    const sub = this.patientService
      .put(patient)
      .subscribe((patient: Patient) => {
        this.router.navigate(['/patient']);
        sub.unsubscribe();
      });
  }
}
