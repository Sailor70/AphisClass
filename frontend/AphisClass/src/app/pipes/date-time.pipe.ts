import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any): string {
    return value ? moment.utc(value).format('DD.MM.YYYY') : value;
  }

}
