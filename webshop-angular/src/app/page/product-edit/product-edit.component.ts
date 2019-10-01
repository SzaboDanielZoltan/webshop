import { Component, OnInit, PipeTransform } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { Subscription } from 'rxjs';
import { SearchFriendlyNamePipe } from 'src/app/pipe/search-friendly-name.pipe';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  editProduct: Product = new Product();
  productList: Array<Product>;
  userSubscription: Subscription;
  urlPostfixPipe: PipeTransform = new SearchFriendlyNamePipe();

  constructor(private ps: ProductService, private router: Router, private ar: ActivatedRoute) {

    let id: number;

    ar.params.forEach(data => id = data.id)
    console.log(id);
    ps.read().forEach(memberArray => {
      this.editProduct = memberArray.filter(member => member.id == id)[0];
      console.log(this.editProduct);
    })
  }

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
    this.editProduct.urlPostfix = this.urlPostfixPipe.transform(value, this.productList);
  }

  onUpdate() {
    this.editProduct.active = parseInt(this.editProduct.active)
    this.ps.update(this.editProduct, this.editProduct.id).forEach(
      data => this.router.navigateByUrl('/products')
    )
  }

}
