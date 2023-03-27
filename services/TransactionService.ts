import HttpService from '../utils/HttpService';
import expect from 'expect';

import { Transaction } from '../models/Transaction';

export class TransactionService extends HttpService {
  private readonly path = '/v1/transaction';

  public requestGetTransactionInfo = async (
    transactionHash: string
  ): Promise<void> => {
    const body = JSON.stringify({ hash: transactionHash });
    await this.post(this.path, body);
  };

  public getTransactionInfo = async (
    transactionHash: string
  ): Promise<Transaction> => {
    await this.requestGetTransactionInfo(transactionHash);

    expect(this.response.status).toBe(200);
    expect(this.response.data).not.toBeUndefined();

    return this.response.data;
  };
}
