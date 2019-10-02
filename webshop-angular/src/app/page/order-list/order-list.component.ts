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
  searchText: string = '';
  orderDirection: number = 1;
  orderKey: string = '';
  changeCounter: number = 0;


  constructor(private os: OrderService) {

  }

  ngOnInit() {
    this.userSubscription = this.os.read().subscribe(
      orders => {
        this.orderList = orders;
        this.orderList.sort((a, b) => b.id - a.id);
      },
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onDelete(id: number): void {
    this.os.delete(id).forEach(data => {
      let index = this.orderList.findIndex(product => product.id == id);
      this.orderList.splice(index, 1);
      this.changeCounter++;
    });
  }

  setSorterKey(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection === 1 ? -1 : 1;
    } else {
      this.orderDirection = 1;
    }
    this.orderKey = key;
  }

}
