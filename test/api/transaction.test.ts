import expect from 'expect';
import { TransactionService } from '../../services/TransactionService';
import { Transaction } from '../../models/Transaction';
import { testData } from '../../testData';

Feature('Transaction info by hash').tag('transaction').tag('regression');

Scenario('Get transaction by existing hash', async () => {
  const transactionService = new TransactionService();
  await transactionService.requestGetTransactionInfo(
    testData.SUCCESSFUL_TRANSACTION_HASH
  );

  expect(transactionService.response.status).toBe(200);
  expect(transactionService.response.statusText).toEqual('OK');
  expect(transactionService.response.data).not.toBeUndefined();

  const transaction: Transaction = transactionService.response.data;
  expect(transaction.id).toEqual(85);
  expect(transaction.hash).toEqual(testData.SUCCESSFUL_TRANSACTION_HASH);
  expect(transaction.type).toEqual('ERC20_TRANSFER');
  expect(transaction.amount).toEqual(2.4029381585039946);
  expect(transaction.token).toEqual('WETH');
  expect(transaction.from_address).toEqual(
    '0xCab82C42B5195624671b92b1b0D91adf171f103c'
  );
  expect(transaction.to_address).toEqual(
    '0xFb3cEe83A0a97C8d7999eBD59496A4fde4f40033'
  );
  expect(transaction.created_at).toEqual(1676992575856);
  expect(transaction.updated_at).toEqual(1676992575856);
})
  .tag('smoke')
  .tag('acceptance');

Scenario('Get transaction by not existing hash', async () => {
  const transactionService = new TransactionService();
  await transactionService.requestGetTransactionInfo('11222333444555qq');

  expect(transactionService.response.status).toBe(200);
  expect(transactionService.response.statusText).toEqual('OK');
  expect(transactionService.response.data).not.toBeUndefined();
  /*
Currently, the endpoint does not handle now the situation when the transaction hash is incorrect
 or it is not included in the block yet. There should be checks for an error status code and error message
   */
  expect(transactionService.response.data).toEqual('');
}).tag('acceptance');
