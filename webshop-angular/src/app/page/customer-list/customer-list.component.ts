import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  list$: Observable<any> = this.cs.read();
  searchCustomer: string = '';

  constructor(private cs: CustomerService) {
    cs.access();
  }

  ngOnInit() {
  }

}
