import client from './client';

export const login = (data) => client.post('/api/user/login', data);

export const register = (data) => client.post('/api/user/register', data);

export const updateAccount = (data) =>
  client.put('/api/user/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
