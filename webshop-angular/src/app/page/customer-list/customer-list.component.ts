import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList$: Observable<any> = this.cs.read();
  // searchCustomer: string = '';
  // changeCounter: number = 0;

  constructor(private cs: CustomerService) {
    cs.access();
  }

  ngOnInit() {
  }

  onCustomerDelete(id: number): void {
    this.cs.delete(id).forEach(data => location.reload());
  }
}
