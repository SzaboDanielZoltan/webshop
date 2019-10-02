import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels;
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];
  showChart: boolean = false;

  thisYear: number;

  constructor(private os: OrderService) {
    this.thisYear = new Date().getFullYear();
    this.os.read().forEach(data => {
      this.barChartLabels = [`${this.thisYear} Jan`, `${this.thisYear} Feb`, `${this.thisYear} Mar`, `${this.thisYear} Apr`, `${this.thisYear} May`, `${this.thisYear} Jun`, `${this.thisYear} Jul`, `${this.thisYear} Aug`, `${this.thisYear} Sep`, `${this.thisYear} Oct`, `${this.thisYear} Nov`, `${this.thisYear} Dec`]
      this.barChartData = [
        { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Total income" }
      ];
      data.forEach(el =>
        new Date(el.orderDate).getFullYear() === this.thisYear ? this.barChartData[0].data[new Date(el.orderDate).getMonth()] += el.totalPrice : el);
      this.showChart = true;
    });
  }

  ngOnInit() {
  }
}