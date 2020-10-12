import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// import { Router } from '@angular/Router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() openSidenav = new EventEmitter<boolean>();
  @Input() sideNavigation: any;
  constructor(
    // private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.openSidenav.emit();
  }

  logout() {
    // this.router.navigate(["login"])

  }
}
