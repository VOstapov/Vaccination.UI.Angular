import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  constructor(
    private router: Router,
    private patientService: PatientService) {

  }

  ngOnInit(): void {
    
  }

  onSave(patient: Patient) {
    const sub = this.patientService
    .post(patient)
    .subscribe((patient: Patient) => {
      this.router.navigate(['/patient', `${patient.id}`,'edit']);
      sub.unsubscribe();
    });
  }

}
