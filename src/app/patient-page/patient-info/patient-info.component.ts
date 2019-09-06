import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient.model';
import { VaccineService } from 'src/app/shared/services/vaccine.service';
import { Vaccine } from 'src/app/shared/models/vaccine.model';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
  providers: [VaccineService]
})
export class PatientInfoComponent implements OnInit, OnDestroy {

  isLoaded: Boolean = false;
  patient: Patient;
  vaccines: Vaccine[] = [];
  sub: Subscription;

  constructor(
    private vaccineService: VaccineService
  ) { }

  ngOnInit() {
    this.sub =
      this.vaccineService.getAll()
        .subscribe((vaccine: Vaccine[]) => {
          this.vaccines = vaccine;
          this.isLoaded = true;
        });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDefinePatient(patient: Patient) {
    this.patient = patient;
  }

  delete(vaccine: Vaccine) {
    this.vaccineService.delete(vaccine)
      .subscribe((vaccine: Vaccine) => {
        const index = this.vaccines.findIndex(x => x === vaccine);
        this.vaccines.splice(index, 1);
      });
  }
}
