import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productSubscription: Subscription;
  productList: Array<Product>;
  searchText: string = '';
  changeCounter: number = 0;

  constructor(private ps: ProductService) {

  }

  ngOnInit() {
    this.productSubscription = this.ps.read().subscribe(
      products => {
        this.productList = products;
      },
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  onDelete(id: number): void {
    this.ps.delete(id).forEach(data => {
      let index = this.productList.findIndex(product => product.id == id);
      this.productList.splice(index, 1);
      this.changeCounter++;
    });
  }

}
