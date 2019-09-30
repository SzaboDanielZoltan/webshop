import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-radar-chart',
  templateUrl: './my-radar-chart.component.html',
  styleUrls: ['./my-radar-chart.component.css']
})
export class MyRadarChartComponent implements OnInit {
  public radarChartLabels = ['Human drink', 'Human food', 'Alien food', 'Alien drink'];
  public radarChartData = [
    { data: [120, 130, 180, 70], label: '2017' },
    { data: [90, 150, 200, 80], label: '2018' }
  ];
  public radarChartType = 'radar';
  constructor() { }
  ngOnInit() {
  }
}