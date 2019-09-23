import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: any, searchText: string, changeCounter) {
    return value.filter(item => item.productName.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
  }

}
