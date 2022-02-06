import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lotto-number',
  templateUrl: './lotto-number.component.html',
  styleUrls: ['./lotto-number.component.scss']
})
export class LottoNumberComponent implements OnInit {
  // Set and bind selected state.
  @HostBinding('class.l-selected') @Input() selected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
