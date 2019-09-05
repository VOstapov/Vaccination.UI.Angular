import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent implements OnInit {

  @Input() isLoaded = false;

  form: FormGroup;

  @Output() formEmitter = new EventEmitter<FormGroup>();

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 0, 1);
  minDateStr: string;
  maxDateStr: string;

  medications: string[] = ['Эджерикс', 'Вианвак', 'АКДС', 'БЦЖ']

  constructor() { }

  ngOnInit() {
    this.minDateStr = moment(this.minDate).format("YYYY-MM-DD");
    this.maxDateStr = moment(this.maxDate).format("YYYY-MM-DD");
    this.form = new FormGroup({
      'medication': new FormControl(this.medications[0], [Validators.required]),
      'date': new FormControl(null, [Validators.required, this.checkForCorrectDate.bind(this)]),
      'agreement': new FormControl(false, [Validators.requiredTrue])
    });

    this.form.statusChanges.subscribe(x => this.formEmitter.emit(this.form));
  }

  checkForCorrectDate(control: FormControl) {
    const date = new Date(control.value);

    if (date > this.maxDate) {
      return {
        'maxDateError': true
      };
    } else if (date < this.minDate) {
      return {
        'minDateError': true
      };
    }

    return null;
  }

  onSave() {
    console.log(this.form);
  }

}
