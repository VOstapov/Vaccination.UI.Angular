import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from 'src/app/shared/models/patient.model';
import { mergeMap } from 'rxjs/operators';
import { VaccineService } from 'src/app/shared/services/vaccine.service';
import { Vaccine } from 'src/app/shared/models/vaccine.model';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit, OnDestroy {

  isLoaded: Boolean = false;
  patient: Patient;
  vaccines: Vaccine[] = [];


  constructor(
    private router: Router,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private vaccineService: VaccineService
  ) { }
  sub: Subscription;

  ngOnInit() {
    this.sub = combineLatest(
      this.route.params.pipe(mergeMap((params: Params) => this.patientService.get(params.id))),
      this.vaccineService.getAll()
    ).subscribe((data: [Patient, Vaccine[]]) => {
      this.patient = data[0];
      this.vaccines = data[1];

      this.isLoaded = true;
    });

   /* this.sub = this.route.params
      .pipe(mergeMap((params: Params) => this.patientService.get(params.id)))
      .subscribe((patient: Patient) => {
        this.patient = patient;
        this.isLoaded = true;
        return patient;
      })*/

      // сделать сервис прививок
      // загрузить привики (через observable.combine)
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
