import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPostfixValidate'
})
export class UrlPostfixValidatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
