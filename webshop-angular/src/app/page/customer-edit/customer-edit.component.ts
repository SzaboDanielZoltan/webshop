import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  editCustomer: Customer = new Customer();

  constructor(private cs: CustomerService, private router: Router, private ar: ActivatedRoute) {

    let id: number;

    ar.params.forEach(data => id = data.id);
    console.log(id);
    cs.read().forEach(memberArray => {
      this.editCustomer = memberArray.filter(member => member.id === id)[0];
      console.log(this.editCustomer);
    });
  }

  ngOnInit() {
  }

  onCustomerUpdate() {
    this.cs.update(this.editCustomer, this.editCustomer.id).forEach(
      data => this.router.navigateByUrl('/customers')
    );
  }

}
