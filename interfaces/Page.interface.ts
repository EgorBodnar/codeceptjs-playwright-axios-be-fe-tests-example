export interface Page {
  SELECTORS: object;
  waitForLoad(): void;
  goTo(): void;
}
