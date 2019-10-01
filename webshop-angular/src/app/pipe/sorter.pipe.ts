import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(baseArray: any[], key: string = '', direction: number = 1): any {
    if (key === '') {
      return baseArray;
    } else if (key === 'name') {
      baseArray.sort((a, b) => {
        if (typeof a.name.first === 'number') {
          return ((a.name.first - b.name.first) * direction);
        } else {
          return (a.name.first.toString() as string).localeCompare(b.name.first.toString()) * direction;
        }

      });
    } else {
      baseArray.sort((a, b) => {
        if (typeof a[key] === 'number') {
          return ((a[key] - b[key]) * direction);
        } else {
          return (a[key].toString() as string).localeCompare(b[key].toString()) * direction;
        }

      });
    }
    return baseArray;
  }

}
