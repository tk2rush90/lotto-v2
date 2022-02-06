import {Component, Input, OnInit} from '@angular/core';
import {WinningResult} from '@lotto/models/winning-result';

@Component({
  selector: 'app-winning-detail-item',
  templateUrl: './winning-detail-item.component.html',
  styleUrls: ['./winning-detail-item.component.scss']
})
export class WinningDetailItemComponent implements OnInit {
  // Winning result detail data.
  @Input() data!: WinningResult;

  constructor() {
  }

  ngOnInit(): void {
  }

}
