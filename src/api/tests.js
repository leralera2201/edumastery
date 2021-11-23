import client from './client';

export const getTests = (params) =>
  client.get('/api/test/getFiltered', {
    params,
  });

export const getCompletedTests = (params) =>
  client.get('/api/testResult/getFilteredByUser', {
    params,
  });

export const createTestResult = (data) =>
  client.post('/api/testResult/add', data);
