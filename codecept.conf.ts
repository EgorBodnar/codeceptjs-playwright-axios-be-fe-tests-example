export const config: CodeceptJS.MainConfig = {
  name: 'e2e-test-framework',
  tests: 'test/**/*.test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: process.env.FRONTEND_URL || 'http://localhost:3000',
      show: true,
      browser: 'chromium',
      waitForNavigation: 'networkidle',
      fullPageScreenshots: true,
    },
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    },
  },
};
