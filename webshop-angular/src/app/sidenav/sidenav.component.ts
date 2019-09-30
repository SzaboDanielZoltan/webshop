import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  collapsed: boolean = false;
  collapsing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleShow(ev) {
    ev.preventDefault();
    this.collapsed = !this.collapsed;
  }

}
