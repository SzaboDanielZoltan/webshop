import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {

  showChart: boolean = false;

  constructor() {
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2015', '2016', '2017', '2016', '2017', '2018', '2019']
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit() {
    setTimeout(()=>{

      this.barChartData = [
        {data: [80, 59, 70, 81, 56, 70, 40], label: 'Income from Human'},
        {data: [28, 48, 40, 19, 86, 60, 87], label: 'Income from Alien'}
      ];


      this.showChart = true;
    },3000)
  }
}