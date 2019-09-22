import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  newProduct: Product = new Product();

  constructor(private ps: ProductService, private router: Router) { }

  ngOnInit() {
  }

  onCreate() {
    this.ps.create(this.newProduct).forEach(
      data => this.router.navigateByUrl('/')
    )
  }

}
