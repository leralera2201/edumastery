import client from './client';

export const login = (data) => client.post('/login', data);

export const register = (data) => client.post('/register', data);
