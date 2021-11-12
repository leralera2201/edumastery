import client from './client';

export const login = (data) => client.post('/api/user/login', data);

export const register = (data) => client.post('/api/user/register', data);
