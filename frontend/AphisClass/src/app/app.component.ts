import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AphisClass';
  menuItems: MenuItem[];
  selectedMenuItem: MenuItem;

  constructor(
    public readonly router: Router,
  ) {
    this.menuItems = [
      {label: 'Lista mszyc', fragment: 'aphids', visible: true},
      {label: 'Dodaj', fragment: 'add', visible: true},
      {label: 'Klasyfikuj', fragment: 'classify', visible: true}
    ];
    this.selectedMenuItem = this.menuItems[0];
  }

    onMenuItemClick(menuItem: MenuItem) {
      this.selectedMenuItem = menuItem;
      this.router.navigate([this.selectedMenuItem.fragment])
  }
}
