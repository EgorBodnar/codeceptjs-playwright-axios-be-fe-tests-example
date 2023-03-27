import { TransactionSearchPage } from './pages/TransactionSearchPage';
import { testData } from '../../testData';
import { Transaction } from '../../models/Transaction';

const transactionSearchPage = new TransactionSearchPage();

Feature('Transaction').tag('regression');

Scenario('Find transaction by existing hash', ({ I }) => {
  const { TRANSACTION_INFO_BLOCK } = transactionSearchPage.SELECTORS;

  transactionSearchPage.goTo();
  transactionSearchPage.waitForLoad();

  I.fillField(
    transactionSearchPage.SELECTORS.SEARCH_FIELD,
    testData.SUCCESSFUL_TRANSACTION_HASH
  );
  I.click(transactionSearchPage.SELECTORS.SUBMIT_BUTTON);
  I.waitForElement(TRANSACTION_INFO_BLOCK);

  I.seeTextEquals('ID - 85', locate(TRANSACTION_INFO_BLOCK).find('p').at(1));
  I.seeTextEquals(
    `Hash - ${testData.SUCCESSFUL_TRANSACTION_HASH}`,
    locate(TRANSACTION_INFO_BLOCK).find('p').at(2)
  );
  I.seeTextEquals(
    'Type - ERC20_TRANSFER',
    locate(TRANSACTION_INFO_BLOCK).find('p').at(3)
  );
  I.seeTextEquals(
    'Amount - 2.4029381585039946',
    locate(TRANSACTION_INFO_BLOCK).find('p').at(4)
  );
  I.seeTextEquals(
    'From - 0xCab82C42B5195624671b92b1b0D91adf171f103c',
    locate(TRANSACTION_INFO_BLOCK).find('p').at(5)
  );
  I.seeTextEquals(
    'Created - 1676992575856',
    locate(TRANSACTION_INFO_BLOCK).find('p').at(6)
  );
  I.seeTextEquals(
    'Updated - 1676992575856',
    locate(TRANSACTION_INFO_BLOCK).find('p').at(7)
  );
}).tag('acceptance');

Scenario('Try to find transaction by unexciting hash', ({ I }) => {
  transactionSearchPage.goTo();
  transactionSearchPage.waitForLoad();

  I.fillField(
    transactionSearchPage.SELECTORS.SEARCH_FIELD,
    'qwertyuiopasdfghjkzxcvbn89'
  );
  I.click(transactionSearchPage.SELECTORS.SUBMIT_BUTTON);
  I.dontSeeElement(transactionSearchPage.SELECTORS.TRANSACTION_INFO_BLOCK);
});

Scenario('Find transaction without field (hot mock response)', ({ I }) => {
  const { TRANSACTION_INFO_BLOCK } = transactionSearchPage.SELECTORS;
  const mockedTransaction: Transaction = {
    id: 1,
    hash: 'qqqqqqq',
    type: 'test',
    amount: 100,
    token: 'testToken',
    from_address: 'testAdress',
    to_address: 'test',
    created_at: 1223,
    updated_at: 1311,
  };

  transactionSearchPage.goTo();
  transactionSearchPage.waitForLoad();

  I.fillField(
    transactionSearchPage.SELECTORS.SEARCH_FIELD,
    testData.SUCCESSFUL_TRANSACTION_HASH
  );
  /*
   Thus, it is possible to change the responses from the backend or any
other integrations on the hot and check how the frontend will behave for a particular error, various data.

Since the test frontend does handle errors, I simply replace the data in the response from the BE and validate it.
   */
  I.usePlaywrightTo('mock response', async ({ page }) => {
    await page.route('**/v1/transaction', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(mockedTransaction),
      })
    );
  });
  I.click(transactionSearchPage.SELECTORS.SUBMIT_BUTTON);

  I.seeTextEquals(
    String(mockedTransaction.id),
    locate(TRANSACTION_INFO_BLOCK).find('p').at(1)
  );
  I.seeTextEquals(
    mockedTransaction.hash,
    locate(TRANSACTION_INFO_BLOCK).find('p').at(2)
  );
  I.seeTextEquals(
    mockedTransaction.type,
    locate(TRANSACTION_INFO_BLOCK).find('p').at(3)
  );
  I.seeTextEquals(
    String(mockedTransaction.amount),
    locate(TRANSACTION_INFO_BLOCK).find('p').at(4)
  );
  I.seeTextEquals(
    mockedTransaction.from_address,
    locate(TRANSACTION_INFO_BLOCK).find('p').at(5)
  );
  I.seeTextEquals(
    String(mockedTransaction.created_at),
    locate(TRANSACTION_INFO_BLOCK).find('p').at(6)
  );
  I.seeTextEquals(
    String(mockedTransaction.updated_at),
    locate(TRANSACTION_INFO_BLOCK).find('p').at(7)
  );
});
