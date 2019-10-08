import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any, searchCustomer: string, changeCounter) {
    if (!value){
      return value;
    }
    return value.filter(item => item.email.toLowerCase().indexOf(searchCustomer.toLowerCase()) > -1);
  }

}
