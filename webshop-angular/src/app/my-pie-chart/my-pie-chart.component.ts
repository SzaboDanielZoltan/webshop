import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {
  public pieChartLabels = ['Human', 'Alien'];
  public pieChartData = [2345, 3456];
  public pieChartType = 'pie';
  constructor() { }

  ngOnInit() {
  }
}