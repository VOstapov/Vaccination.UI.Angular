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
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit, OnDestroy {


  s1: Subscription;
  patient: Patient;
  
  isLoaded = false;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private route: ActivatedRoute) {

  }
  
  ngOnInit(): void {
    this.s1 = this.route.params
      .pipe(mergeMap((params: Params) => this.patientService.get(params.id)))
      .subscribe((patient: Patient) => {
        this.patient = patient;
        this.isLoaded = true;
        return patient;
      })
  }

  ngOnDestroy(): void {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

  onSave(patient: Patient) {
    const sub = this.patientService
      .put(patient)
      .subscribe((patient: Patient) => {
        this.router.navigate(['/patient']);
        sub.unsubscribe();
      });
  }
}
