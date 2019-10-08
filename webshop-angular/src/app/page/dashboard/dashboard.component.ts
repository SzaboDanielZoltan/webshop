import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { Customer } from 'src/app/model/customer';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { CustomerService } from 'src/app/service/customer.service';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  customerSubscription: Subscription;
  productSubscription: Subscription;
  orderSubscription: Subscription;

  customersTotal: number;
  productsTotal: number;
  productsActive: number;
  ordersInProgress: number;
  ordersDelivered: number;

  constructor(private cs: CustomerService, private ps: ProductService, private os: OrderService) { }

  ngOnInit() {
    this.customerSubscription = this.cs.read().subscribe(
      customers => {
        this.customersTotal = customers.length;
      },
      err => console.error(err)
    );


    this.productSubscription = this.ps.read().subscribe(
      products => {
        this.productsTotal = products.length;
        this.productsActive = products.filter(product => product.active === 1).length;
      },
      err => console.error(err)
    );


    this.orderSubscription = this.os.read().subscribe(
      orders => {
        this.ordersInProgress = orders.filter(order => order.status === 1).length;
        this.ordersDelivered = orders.filter(order => order.status === 0).length;
      },
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}
