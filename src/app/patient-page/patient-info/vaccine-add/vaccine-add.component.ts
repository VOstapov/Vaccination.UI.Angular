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
export class VaccineAddComponent implements OnInit {

  patient: Patient;

  constructor(
    private vaccineService: VaccineService,
    private router: Router) { }

  ngOnInit() {

  }

  onSave(vaccine: Vaccine) {
    const sub = this.vaccineService
    .post(vaccine)
    .subscribe((vaccine: Vaccine) => {
      this.router.navigate(['/patient', `${vaccine.patientId}`]);
      sub.unsubscribe();
    });
  }
}
