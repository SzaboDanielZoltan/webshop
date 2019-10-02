import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {
  pieChartLabels = ['Active', 'Delivered'];
  pieChartData = [0, 0];
  pieChartType = 'pie';
  constructor(private os: OrderService) {
    this.os.read().forEach(allOrders => {
      const now = new Date();
      allOrders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        if (now.getFullYear() === orderDate.getFullYear() &&
          now.getMonth() === orderDate.getMonth() &&
          now.getDate() === orderDate.getDate()) {
          order.status === 1 ? this.pieChartData[0] += 1 : this.pieChartData[1] += 1
        }
      });
    });
  }

  ngOnInit() {
  }
}