import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  editOrder: Order = new Order();
  orderList: Array<Order>;
  userSubscription: Subscription;
  details: boolean = true;

  constructor(private os: OrderService, private router: Router, private ar: ActivatedRoute) {

    let id: number;

    ar.params.forEach(data => id = data.id)
    console.log(id);
    os.read().forEach(memberArray => {
      this.editOrder = memberArray.filter(member => member.id == id)[0];
      console.log(this.editOrder);
    })
  }
  changeDetails() {
    if (this.details == true) {
      this.details = false;
    } else {
      this.details = true;
    }
  }

  ngOnInit() {

    this.userSubscription = this.os.read().subscribe(
      products => {
        this.orderList = products;
      },
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onUpdate() {
    this.os.update(this.editOrder, this.editOrder.id).forEach(
      data => this.router.navigateByUrl('/orders')
    )
  }
}
