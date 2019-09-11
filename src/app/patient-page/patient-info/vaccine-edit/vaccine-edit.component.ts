import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { VaccineService } from 'src/app/shared/services/vaccine.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaccine-edit',
  templateUrl: './vaccine-edit.component.html',
  styleUrls: ['./vaccine-edit.component.css'],
  providers: [VaccineService]
})
export class VaccineEditComponent implements OnInit, OnDestroy {

  form: FormGroup
  patient: Patient;
  vaccine: Vaccine;

  isLoaded: Boolean = false;
  sub1: Subscription;

  constructor(
    private vaccineService: VaccineService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['vaccineid'];
    this.sub1 = this.vaccineService.get(id)
      .subscribe(
        (vaccine: Vaccine) => {
          this.vaccine = vaccine;
          this.isLoaded = true;
          return vaccine;
        },
        (error: Response) => {
          this.router.navigate(
            ['/patient', this.route.snapshot.params['patientid']],
            { queryParams: { messageText: 'Прививка не найдена', messageType: 'danger' } });
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
      this.route.snapshot.params['vaccineid'],
      this.patient.id);

    const sub = this.vaccineService
      .put(vaccine)
      .subscribe((vaccine: Vaccine) => {
        this.router.navigate(['/patient', `${this.patient.id}`]);
        sub.unsubscribe();
      });
  }
}
