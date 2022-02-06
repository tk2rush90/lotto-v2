import {Component, Input, OnInit} from '@angular/core';
import {IconDefinitions} from '@tk-ui/components/icon/icon-defs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  // Set icon name.
  @Input() icon!: keyof typeof IconDefinitions;

  constructor() { }

  ngOnInit(): void {
  }

}
