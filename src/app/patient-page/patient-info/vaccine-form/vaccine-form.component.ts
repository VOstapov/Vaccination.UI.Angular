import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { Patient } from 'src/app/shared/models/patient.model';
import { Medication } from 'src/app/shared/models/medication.model';
import { MedicationService } from 'src/app/shared/services/medication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css'],
  providers: [MedicationService]
})
export class VaccineFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  patient: Patient;

  @Output() vaccineEmitter = new EventEmitter<Vaccine>();

  @Input() vaccine: Vaccine;

  maxDate: Date = new Date();
  minDate: Date = new Date(2000, 0, 1);
  minDateStr: string;
  maxDateStr: string;

  medications: Medication[];
  sub: Subscription;

  selectedMedication: Number;

  constructor(private medicationService: MedicationService) { 
    this.form = new FormGroup({
      'medication': new FormControl(this.selectedMedication, [Validators.required]),
      'date': new FormControl(null, [Validators.required, DateValidator.checkForCorrectDate(this.minDate, this.maxDate)]),
      'agreement': new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vaccine'] && this.vaccine) {
      this.form.patchValue({
        agreement: this.vaccine.agreement,
        date: moment(this.vaccine.date).format("YYYY-MM-DD")
      });

      this.selectedMedication = this.vaccine.medication.id;
    }
  }

  ngOnInit() {
    this.minDateStr = moment(this.minDate).format("YYYY-MM-DD");
    this.maxDateStr = moment(this.maxDate).format("YYYY-MM-DD");

    this.sub = this.medicationService.getAll()
      .subscribe((medications: Medication[]) => this.medications = medications);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDefinePatient(patient: Patient) {
    this.patient = patient;
  }

  onMedicalChange(event: any) {
    this.selectedMedication = event.target.value;
  }

  onSave() {
    const {medication, date, agreement} = this.form.value;
    this.vaccine = new Vaccine(new Medication(medication, null), agreement, date, undefined, this.patient.id);
    this.vaccineEmitter.emit(this.vaccine);
  }
}
