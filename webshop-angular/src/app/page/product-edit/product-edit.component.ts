import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  editProduct: Product = new Product();

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
  }

  onUpdate() {
    this.ps.update(this.editProduct, this.editProduct.id).forEach(
      data => this.router.navigateByUrl('/')
    )
  }

}
