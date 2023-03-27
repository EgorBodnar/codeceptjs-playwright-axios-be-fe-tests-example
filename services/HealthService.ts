import HttpService from '../utils/HttpService';

export class HealthService extends HttpService {
  private readonly path = '/v1/health';

  public requestGetHealthInfo = async (): Promise<void> => {
    await this.get(this.path);
  };
}
