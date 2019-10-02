import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  editCustomer: Customer = new Customer();
  customerSubscription: Subscription;
  customerList$: Array<Customer>;
  changeCounter: number = 0;

  constructor(private cs: CustomerService, private router: Router, private ar: ActivatedRoute) {

    let id: number;

    ar.params.forEach(data => id = data.id);
    console.log(id);
    cs.read().forEach(memberArray => {
      this.editCustomer = memberArray.filter(member => member.id == id)[0];
      console.log(this.editCustomer);
    });
  }

  ngOnInit() {

    this.customerSubscription = this.cs.read().subscribe(
      customers => {
        this.customerList$ = customers;
      },
      err => console.error(err)
    );
  }

  onCustomerUpdate() {
    this.cs.update(this.editCustomer, this.editCustomer.id).forEach(
      data => this.router.navigateByUrl('/customers')
    );
  }

  isPasswordDisabled: boolean = true;

  onPasswordChangeAllowed() {
    this.isPasswordDisabled = false;
    this.editCustomer.password = "";
  }
  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

  onCustomerDelete(id: number): void {
    this.cs.delete(id).forEach(data => {
      let index = this.customerList$.findIndex(customer => customer.id == id);
      this.customerList$.splice(index, 1);
      this.changeCounter++;
      this.router.navigateByUrl('/customers');
    });
  }
}
