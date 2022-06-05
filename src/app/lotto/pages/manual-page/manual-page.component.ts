import {Component, OnInit} from '@angular/core';
import {LoggerUtil} from '@tk-ui/utils/logger.util';
import {SeoService} from '@tk-ui/services/common/seo.service';

/**
 * The manual selecting page.
 * User can select the numbers by him/herself and see result for the numbers.
 */
@Component({
  selector: 'app-manual-page',
  templateUrl: './manual-page.component.html',
  styleUrls: ['./manual-page.component.scss']
})
export class ManualPageComponent implements OnInit {
  /**
   * Selected numbers.
   */
  selectedNumbers: number[] = [];

  /**
   * Logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  constructor(
    private seoService: SeoService,
  ) {
    this._logger.debug('Page created');
  }

  /**
   * Get state of whether all numbers are selected or not.
   */
  get allSelected(): boolean {
    return this.selectedNumbers.length === 6;
  }

  ngOnInit(): void {
    this.seoService.update({
      canonical: '/manual/',
    });
  }

  /**
   * Update selected numbers.
   * @param numbers - The selected numbers.
   */
  updateSelectedNumbers(numbers: number[]): void {
    this.selectedNumbers = numbers;
  }
}
