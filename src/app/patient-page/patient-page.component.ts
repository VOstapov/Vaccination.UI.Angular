import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from '../shared/services/patient.service';
import { Patient } from '../shared/models/patient.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Message } from '../shared/models/message.model';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css'],
  providers: [PatientService]
})
export class PatientPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  isLoaded: Boolean = false;
  message: Message;

  patients: Patient[] = [];

  searchString: string;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.sub2 = this.route.queryParams
      .subscribe((params: Params) => this.message = new Message(params.messageText, params.messageType));

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

  onKeyUp(event: KeyboardEvent) {
    // enter
    if (event.keyCode === 13) {
      this.onClick();
    }
  }

  onClick() {
    let searchStr: string = "";
    if(this.searchString) {
      searchStr = this.searchString.toLowerCase().trim();
    }

    this.patientService.getAll(`?searchString=${searchStr}`)
      .subscribe((patients: Patient[]) => this.patients = patients);
  }
}


/*

  в сервисе сделал пол и препараты в отедльных сущностях.
  нужно добавить получение справочников, для отрисовки на форме, а также поправить модели, и сервис.

*/