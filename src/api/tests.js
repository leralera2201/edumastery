import client from './client';

export const getTests = (params) =>
  client.get('/api/test/getFiltered', {
    params,
  });
