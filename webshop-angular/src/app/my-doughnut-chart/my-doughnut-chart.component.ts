import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-doughnut-chart',
  templateUrl: './my-doughnut-chart.component.html',
  styleUrls: ['./my-doughnut-chart.component.css']
})
export class MyDoughnutChartComponent implements OnInit {
  public doughnutChartLabels = ['Human Orders', 'Alien Orders', 'Drinks'];
  public doughnutChartData = [1011, 700, 1800];
  public doughnutChartType = 'doughnut';
  constructor() { }
  ngOnInit() {
  }
}