import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  orderSubscription: Subscription;
  orderList: Array<Order>;
  editedProductID: number = 0;
  editOrder: Order = new Order();
  changeCounter: number = 0;

  constructor(private os: OrderService, private router: Router, private ar: ActivatedRoute) {

    let id: number;

    ar.params.forEach(data => id = data.id)

    os.read().forEach(memberArray => {
      this.editOrder = memberArray.filter(member => member.id == id)[0];
      this.editOrder.products = JSON.parse(this.editOrder.products);
    })
  }

  onEditedProducID(id) {
    this.editedProductID = id;
  }

  deleteProduct(id) {
    let index = this.editOrder.products.findIndex(product => product.id == id);
    this.editOrder.products.splice(index, 1);
    this.editOrder.totalPrice = 0;
    this.editOrder.products.forEach(product => {
      this.editOrder.totalPrice += product.price * product.amount;
    })

    this.changeCounter++;

  }

  ngOnInit() {
    this.orderSubscription = this.os.read().subscribe(
      orders => {
        this.orderList = orders;
        this.orderList.sort((a, b) => b.id - a.id);
      },
      err => console.error(err)
    );
  }

  changingAmountMinus(id) {

    if (this.editOrder.products[id].amount >= 1) {
      this.editOrder.products[id].amount--;
    }
    this.editOrder.totalPrice = 0;
    this.editOrder.products.forEach(product => {
      this.editOrder.totalPrice += product.price * product.amount;
    })
  }

  changingAmountPlus(id) {
    if (this.editOrder.products[id].amount <= 100) {
      this.editOrder.products[id].amount++;
    }
    this.editOrder.totalPrice = 0;
    this.editOrder.products.forEach(product => {
      this.editOrder.totalPrice += product.price * product.amount;
    })

  }
  onUpdate() {
    let updateOrder = {
      id: this.editOrder.id,
      products: this.editOrder.products,
      shippingAdress: this.editOrder.shippingAdress,
      totalPrice: this.editOrder.totalPrice,
      status: this.editOrder.status
    };
    this.os.update(updateOrder).forEach(
      data => this.router.navigateByUrl('/orders')
    )
  }
  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

  onSoftDelete() {
    this.editOrder.status = 0;
  }

  onDelete(id: number): void {
    this.os.delete(id).forEach(data => {
      let index = this.orderList.findIndex(product => product.id == id);
      this.orderList.splice(index, 1);
      this.changeCounter++;
      this.router.navigateByUrl('/orders');
    });
  }
}
