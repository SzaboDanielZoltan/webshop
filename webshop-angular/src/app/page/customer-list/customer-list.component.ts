import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable, Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customerSubscription: Subscription;
  customerList$: Array<Customer>;
  searchCustomer: string = '';
  changeCounter: number = 0;

  constructor(private cs: CustomerService) {
  }

  ngOnInit() {
this.customerSubscription = this.cs.read().subscribe(
  customers => {
    this.customerList$ = customers;
  },
  err => console.error(err)
);
  }

ngOnDestroy() {
  this.customerSubscription.unsubscribe();
}

  onCustomerDelete(id: number): void {
    this.cs.delete(id).forEach(data => {
      let index = this.customerList$.findIndex(customer => customer.id == id);
      this.customerList$.splice(index, 1);
      this.changeCounter++;
    });
  }
}
