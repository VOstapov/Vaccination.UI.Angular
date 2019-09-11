import { ValidatorFn, FormControl } from '@angular/forms';

export class SnilsValidator {
  static checkOnControlSum(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
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

      const snils: string = control.value.replace(/[^0-9]/g, '');
      if (snils.length != 11) {
        return {
          'incorrectLenght': true
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
  }

  private static checkControlSum(sum: number, checksum: number): boolean {
    return ((sum < 100 && sum === checksum) || ((sum === 100 || sum === 101) && checksum === 0));
  }
}