import client from './client';

export const getCategories = () => client.get('/api/category/get');
