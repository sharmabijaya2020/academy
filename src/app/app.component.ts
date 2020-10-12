import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'academy';
  openSideNav: boolean = false;

  toggleSideNav() {
    this.openSideNav = !this.openSideNav;
  }
}
