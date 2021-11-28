import client from './client';

export const login = (data) => client.post('/api/user/login', data);

export const register = (data) => client.post('/api/user/register', data);

export const changePassword = (data) =>
  client.put('/api/user/changePassword', data);

export const updateAccount = (data) =>
  client.put('/api/user/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getAccount = (id) => client.get(`/api/user/${id}`);
