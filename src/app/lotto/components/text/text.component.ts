import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type TextType =
  'default'
  | 'title'
  | 'section-header'
  | 'grey'
  | 'default-transparent'
  | 'default-transparent-more';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  // Set the text type.
  @Input() type: TextType = 'default';

  constructor() {
  }

  // Bind default style.
  @HostBinding('class.l-default') get default(): boolean {
    return this.type === 'default';
  };

  // Bind title style.
  @HostBinding('class.l-title') get title(): boolean {
    return this.type === 'title';
  };

  // Bind section-header style.
  @HostBinding('class.l-section-header') get sectionHeader(): boolean {
    return this.type === 'section-header';
  };

  // Bind grey style.
  @HostBinding('class.l-grey') get grey(): boolean {
    return this.type === 'grey';
  };

  // Bind default-transparent style.
  @HostBinding('class.l-default-transparent') get defaultTransparent(): boolean {
    return this.type === 'default-transparent';
  };

  // Bind default-transparent-more style.
  @HostBinding('class.l-default-transparent-more') get defaultTransparentMore(): boolean {
    return this.type === 'default-transparent-more';
  };

  ngOnInit(): void {
  }

}
