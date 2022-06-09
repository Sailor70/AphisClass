import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, PrimeNGConfig} from "primeng/api";

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
    private config: PrimeNGConfig
  ) {
    this.menuItems = [
      {label: 'Lista mszyc', fragment: 'aphids', visible: true},
      {label: 'Dodaj', fragment: 'add', visible: true},
      {label: 'Klasyfikuj', fragment: 'classify', visible: true}
    ];
    this.selectedMenuItem = this.menuItems[0];
  }

  ngOnInit() {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
      dayNamesShort: ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
      dayNamesMin: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
      monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
      monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      today: 'Dzisiaj',
      clear: 'Wyczyść',
      dateFormat: 'dd.mm.yy',
      weekHeader: 'Tdz',
    });
  }

  onMenuItemClick(menuItem: MenuItem) {
    this.selectedMenuItem = menuItem;
    this.router.navigate([this.selectedMenuItem.fragment])
  }
}
