import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any, searchCustomer: string, changeCounter) {
    return value.filter(item => item.userName.toLowerCase().indexOf(searchCustomer.toLowerCase()) > -1);
  }

}
