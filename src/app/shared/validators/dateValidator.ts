import { FormControl, ValidatorFn } from '@angular/forms';

export class DateValidator {
  static checkForCorrectDate(minDate: Date, maxDate: Date): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      const date = new Date(control.value);

      if (date > maxDate) {
        return {
          'maxDateError': true
        };
      } else if (date < minDate) {
        return {
          'minDateError': true
        };
      }

      return null;
    }
  }
}