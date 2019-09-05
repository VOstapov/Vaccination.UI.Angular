import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { VaccineService } from 'src/app/shared/services/vaccine.service';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vaccine-add',
  templateUrl: './vaccine-add.component.html',
  styleUrls: ['./vaccine-add.component.css']
})
export class VaccineAddComponent implements OnInit, OnDestroy {

  form: FormGroup
  patient: Patient;

  isLoaded: Boolean = false;
  sub1: Subscription;

  constructor(
    private vaccineService: VaccineService,
    private router: Router,
    private patientService: PatientService) { }
/*



Сделать компонент, который бы справа сверху рисовал ФИО.
из него также можно брать ид пациента.




*/




  ngOnInit() {
    this.sub1 = this.patientService.getCurrentPatient()
    .subscribe((patient: Patient) => {
      this.patient = patient;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  formChanged(form: FormGroup) {
    this.form = form;
  }

  onSave() {
    const { medication, date, agreement } = this.form.value;
    const vaccine = new Vaccine(
      medication,
      agreement,
      date,
      undefined);

    const sub = this.vaccineService
    .post(vaccine)
    .subscribe((vaccine: Vaccine) => {
      this.router.navigate(['/patient', `${this.patient.id}`]);
      sub.unsubscribe();
    });
  }
}
