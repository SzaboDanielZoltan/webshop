import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  userSubscription: Subscription;
  orderList: Array<Order>;

  constructor(private os: OrderService) {

  }

  ngOnInit() {
    this.userSubscription = this.os.read().subscribe(
      orders => {
        this.orderList = orders;
        console.log(this.orderList);
      },
      err => console.error(err)
    );
  }

}
