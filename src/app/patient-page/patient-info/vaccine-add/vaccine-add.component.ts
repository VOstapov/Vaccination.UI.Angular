import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { VaccineService } from 'src/app/shared/services/vaccine.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vaccine-add',
  templateUrl: './vaccine-add.component.html',
  styleUrls: ['./vaccine-add.component.css'],
  providers: [VaccineService]
})
export class VaccineAddComponent implements OnInit, OnDestroy {

  form: FormGroup
  patient: Patient;

  isLoaded: Boolean = false;
  sub1: Subscription;

  constructor(
    private vaccineService: VaccineService,
    private router: Router) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    
  }

  formChanged(form: FormGroup) {
    this.form = form;
  }

  onDefinePatient(patient: Patient) {
    this.patient = patient;
    this.isLoaded = true;
  }

  onSave() {
    const { medication, date, agreement } = this.form.value;
    const vaccine = new Vaccine(
      medication,
      agreement,
      date,
      undefined,
      this.patient.id);

    const sub = this.vaccineService
    .post(vaccine)
    .subscribe((vaccine: Vaccine) => {
      this.router.navigate(['/patient', `${this.patient.id}`]);
      sub.unsubscribe();
    });
  }
}
