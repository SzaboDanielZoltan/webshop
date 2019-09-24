import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable, Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { Customer } from 'src/app/model/customer';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
