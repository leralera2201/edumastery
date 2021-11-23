import client from './client';

export const getTests = (params) =>
  client.get('/api/test/getFiltered', {
    params,
  });

export const createTestResult = (data) =>
  client.post('/api/testResult/add', data);
