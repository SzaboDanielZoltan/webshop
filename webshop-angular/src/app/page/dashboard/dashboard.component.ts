import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { Customer } from 'src/app/model/customer';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  customerSubscription: Subscription;
  customerList$: Array<Customer>;
  productSubscription: Subscription;
  productList$: Array<Product>;
  constructor(private cs: CustomerService, private ps: ProductService) { }

  ngOnInit() {
    this.customerSubscription = this.cs.read().subscribe(
      customers => {
        this.customerList$ = customers;
      },
      err => console.error(err)
    );


    this.productSubscription = this.ps.read().subscribe(
      products => {
        this.productList$ = products;
      },
      err => console.error(err)
    );
  }


  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}
