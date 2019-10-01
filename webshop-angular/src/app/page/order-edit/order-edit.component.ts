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

  changeCounter: number = 0;

  constructor(private os: OrderService, private router: Router, private ar: ActivatedRoute) {

    let id: number;

    ar.params.forEach(data => id = data.id)

    os.read().forEach(memberArray => {
      this.editOrder = memberArray.filter(member => member.id == id)[0];
      this.editOrder.products = JSON.parse(this.editOrder.products);
    })
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
  }

  ngOnDestroy() {
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
      data => console.log(updateOrder.status)//this.router.navigateByUrl('/orders')
    )
  }
}
