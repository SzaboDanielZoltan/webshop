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

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Gastronaut Monthly "
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "January" },
          { y: 55, label: "February" },
          { y: 50, label: "Marc" },
          { y: 65, label: "April" },
          { y: 95, label: "May" },
          { y: 68, label: "June" },
          { y: 28, label: "July" },
          { y: 34, label: "August" },
          { y: 14, label: "September" },
          { y: 64, label: "October" },
          { y: 14, label: "November" },
          { y: 74, label: "December" }
        ]
      }]
    });
      
    chart.render();
      

  }




  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}
