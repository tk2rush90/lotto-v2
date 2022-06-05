import {Component} from '@angular/core';

/**
 * The tabs for global navigation.
 */
@Component({
  selector: 'app-page-tabs',
  templateUrl: './page-tabs.component.html',
  styleUrls: ['./page-tabs.component.scss']
})
export class PageTabsComponent {
  /**
   * Page routes.
   */
  routes = [
    {
      routes: ['/manual'],
      name: '수동선택',
    },
    {
      routes: ['/auto'],
      name: '자동선택',
    },
    {
      routes: ['/statistics'],
      name: '통계',
    },
  ];
}
