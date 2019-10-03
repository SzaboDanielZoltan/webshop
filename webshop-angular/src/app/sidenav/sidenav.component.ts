import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../service/logout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  collapsed: boolean = false;
  collapsing: boolean = false;

  constructor(private los: LogoutService) { }

  ngOnInit() {
  }

  toggleShow(ev) {
    ev.preventDefault();
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.los.read();
  }
}
