import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Patient } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  form: FormGroup;

  @Output() formEmitter = new EventEmitter<FormGroup>();
  @Input() patient: Patient;

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 0, 1);
  minDateStr: string;
  maxDateStr: string;

  constructor() {
    this.form = new FormGroup({
      'soname': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'patronomic': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required, this.checkForCorrectDate.bind(this)]),
      'snils': new FormControl(null, [Validators.required, this.snilsValidator.bind(this)]),
      'gender': new FormControl("Мужской", [Validators.required])
    });

    this.form.statusChanges
      .subscribe(() => this.formEmitter.emit(this.form));
  }

  ngOnInit() {
    this.minDateStr = moment(this.minDate).format("YYYY-MM-DD");
    this.maxDateStr = moment(this.maxDate).format("YYYY-MM-DD");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.form.patchValue({
        soname: this.patient.soname,
        name: this.patient.name,
        patronomic: this.patient.patronomic,
        birthday:  moment(this.patient.birthday).format("YYYY-MM-DD"),
        gender: this.patient.gender,
        snils: this.patient.snils
      });
    }
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


  snilsValidator(control: FormControl) {
/*
    1. Проверка контрольного числа Страхового номера проводится только для номеров больше номера 001-001-998
    2. Контрольное число СНИЛС рассчитывается следующим образом:
    2.1. Каждая цифра СНИЛС умножается на номер своей позиции (позиции отсчитываются с конца)
    2.2. Полученные произведения суммируются
    2.3. Если сумма меньше 100, то контрольное число равно самой сумме
    2.4. Если сумма равна 100 или 101, то контрольное число равно 00
    2.5. Если сумма больше 101, то сумма делится по остатку на 101 и контрольное число определяется остатком от деления аналогично пунктам 2.3 и 2.4
*/
    if (!control.value) {
      return {
        "empty": true
      };
    }

    const snils: string = control.value.replace(/[^0-9]/g,'');
    if (snils.length != 11) {
      return {
        'incorrectLenght' : true
      };
    }

    const number = snils.substr(0, 9);
    const checksum = snils.substr(9, 2);

    if (+number <= 1001998) {
      return null;
    }

    let sum = 0;
    let i = 9;
    for (let s of number) {
      sum += i-- * +s;
    }

    if (this.checkControlSum(sum, +checksum)) {
      return null;
    }

    if (sum > 101) {
      let devided = sum % 101;
      if (this.checkControlSum(devided, +checksum)) {
        return null;
      }
    }

    return {
      'incorrectChecksum': true
    };
  }

  checkControlSum(sum: number, checksum: number) : boolean {
    return ((sum < 100 && sum === checksum) || ((sum === 100 || sum === 101) && checksum === 0));
  }
}
