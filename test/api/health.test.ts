import expect from 'expect';
import { HealthService } from '../../services/HealthService';

Feature('Health').tag('healthCheck').tag('regression');

Scenario('Health should return actual server info', async () => {
  const healthService = new HealthService();
  await healthService.requestGetHealthInfo();

  expect(healthService.response.status).toBe(200);
  expect(healthService.response.statusText).toEqual('OK');
  expect(healthService.response.data.message).toEqual(
    'i am healthy, thanks for asking'
  );
})
  .tag('smoke')
  .tag('acceptance');
