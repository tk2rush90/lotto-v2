import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-loading-cover',
  templateUrl: './loading-cover.component.html',
  styleUrls: ['./loading-cover.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({
        opacity: 0,
      })),
      state('show', style({
        opacity: 1,
      })),
      transition('void => show', animate(0)),
      transition('show => void', animate(1000)),
    ]),
  ]
})
export class LoadingCoverComponent implements OnInit {
  // Set fill state to `true` to make the cover background as black.
  @HostBinding('class.l-filled') @Input() fill = false;

  // Colors for spinner
  colors = [
    '#FA4940',
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
