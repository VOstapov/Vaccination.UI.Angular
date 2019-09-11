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

  vaccine: Vaccine;
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

  onSave(vaccine: Vaccine) {
    vaccine.id = this.route.snapshot.params['vaccineid'];

    const sub = this.vaccineService
      .put(vaccine)
      .subscribe((vaccine: Vaccine) => {
        this.router.navigate(['/patient', `${vaccine.patientId}`]);
        sub.unsubscribe();
      });
  }
}
