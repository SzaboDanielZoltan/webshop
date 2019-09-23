import { Component, OnInit, PipeTransform } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { SearchFriendlyNamePipe } from "../../pipe/search-friendly-name.pipe"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  productsList$: Observable<any> = this.ps.read();
  newProduct: Product = new Product();
  urlPostfixPipe: PipeTransform = new SearchFriendlyNamePipe();

  constructor(private ps: ProductService, private router: Router) { }

  ngOnInit() {
  }

  updateUrlPostfix(value) {
    this.newProduct.urlPostfix = this.urlPostfixPipe.transform(value);
  }

  onCreate() {
    this.ps.create(this.newProduct).forEach(
      data => this.router.navigateByUrl('/products')
    )
  }

}
