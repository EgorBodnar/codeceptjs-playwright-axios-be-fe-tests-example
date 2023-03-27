/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface Methods extends Playwright {}
  interface I extends WithTranslation<Methods> {}
  interface SupportObject {
    I: I;
    current: any;
  }
  namespace Translation {
    interface Actions {}
  }
}
