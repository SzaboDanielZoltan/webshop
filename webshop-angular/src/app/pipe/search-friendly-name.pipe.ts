import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'searchFriendlyName'
})
export class SearchFriendlyNamePipe implements PipeTransform {

  transform(value: any, allProducts: Array<Product>, id: number): any {

    const valuePostfix = value.toString().toLowerCase().replace(/ /g, '-');

    if (id) {
      let index = allProducts.findIndex(product => product.id == id);
      for (let i = 0; i < allProducts.length; i++) {
        if(i!==index){
        if (allProducts[i].urlPostfix === valuePostfix) {
          return "This postfix is already exist"
        }
      }
      }
      return valuePostfix;
    }
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].urlPostfix === valuePostfix) {
        return "This postfix is already exist"
      }
    }
    return valuePostfix;
  }

}
