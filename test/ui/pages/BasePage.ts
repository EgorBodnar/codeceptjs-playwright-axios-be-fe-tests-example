const { I } = inject();

type Cookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
};

export class BasePage {
  public setAuthToken = (token: string): void => {
    I.say('Set an authorization token');
    I.executeScript(() => {
      window.localStorage.setItem('token', token);
    }, token);
    I.refreshPage();
  };

  public getCookies = async (): Promise<Cookie[]> => {
    // @ts-ignore
    return I.usePlaywrightTo('get cookie', async ({ page }) => {
      return page.context().cookies();
    });
  };
}
