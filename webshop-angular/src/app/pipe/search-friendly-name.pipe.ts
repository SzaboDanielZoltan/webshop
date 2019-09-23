import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFriendlyName'
})
export class SearchFriendlyNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.toString().toLowerCase().replace(/ /g, '-');
  }

}
