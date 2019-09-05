import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from '../shared/services/patient.service';
import { Patient } from '../shared/models/patient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  isLoaded: Boolean = false;

  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.sub1 = this.patientService.getAll()
    .subscribe(patients => {
      this.patients = patients;
      this.isLoaded = true;
    });
  }

  delete(patient: Patient) {
    let subDel = this.patientService.delete(patient)
    .subscribe(patient => {
      let index = this.patients.findIndex(p => p == patient);
      this.patients.splice(index, 1);
      subDel.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
