import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-definer',
  templateUrl: './patient-definer.component.html',
  styleUrls: ['./patient-definer.component.css'],
  providers: [PatientService]
})
export class PatientDefinerComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  patient: Patient;
  isLoaded = false;

  @Output() patientEmitter = new EventEmitter<Patient>();

  constructor(
    private patientService: PatientService) { }

  ngOnInit() {
    this.sub1 = this.patientService.getCurrentPatient()
    .subscribe((patient: Patient) => {
      this.patient = patient;
      this.isLoaded = true;
      this.patientEmitter.emit(patient);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
