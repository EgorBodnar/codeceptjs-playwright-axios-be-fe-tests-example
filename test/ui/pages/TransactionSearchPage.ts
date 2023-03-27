import { BasePage } from './BasePage';
import { Page } from '../../../interfaces/Page.interface';

const { I } = inject();

export class TransactionSearchPage extends BasePage implements Page {
  SELECTORS = {
    TITLE: { css: 'div > h1' },
    TRANSACTION_HASH_LABEL: { css: 'form label' },
    SEARCH_FIELD: { css: 'form input' },
    SUBMIT_BUTTON: { css: 'button[type="submit"]' },
    TRANSACTION_INFO_BLOCK: { css: 'div > div:has(p)' },
  };

  public waitForLoad = (): void => {
    I.waitForElement(this.SELECTORS.TITLE);
    I.waitForElement(this.SELECTORS.TRANSACTION_HASH_LABEL);
    I.waitForElement(this.SELECTORS.SEARCH_FIELD);
    I.waitForElement(this.SELECTORS.SUBMIT_BUTTON);
  };

  public goTo = (): void => {
    I.amOnPage('/');
  };
}
