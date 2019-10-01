import { Component, OnInit, PipeTransform, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { SearchFriendlyNamePipe } from "../../pipe/search-friendly-name.pipe"
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit, OnDestroy {

  //productsList$: Observable<any> = this.ps.read();
  newProduct: Product = new Product();
  urlPostfixPipe: PipeTransform = new SearchFriendlyNamePipe();
  productList: Array<Product>
  userSubscription: Subscription;

  constructor(private ps: ProductService, private router: Router) { }


  ngOnInit() {
    this.userSubscription = this.ps.read().subscribe(
      products => {
        this.productList = products;
      },
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


  updateUrlPostfix(value) {
    this.newProduct.urlPostfix = this.urlPostfixPipe.transform(value, this.productList);
  }

  onCreate() {
    this.newProduct.active = parseInt(this.newProduct.active);
    this.ps.create(this.newProduct).forEach(
      data => this.router.navigateByUrl('/products')
    )
  }

}
