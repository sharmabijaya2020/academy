import { Component, OnInit, Input, Output } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavigation: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  events: string[] = [];
  opened: boolean;

  closeSideNav() {
    this.sideNavigation.close();
  }

  logout() {
    this.router.navigate(["login"])
  }
}
