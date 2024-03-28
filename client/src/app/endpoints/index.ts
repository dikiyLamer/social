import { createApi } from '@reduxjs/toolkit/query/react';
import { tokenQuery } from './tokenQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: tokenQuery,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
  tagTypes: [
    'users',
    'credentials',
    'posts',
    'subscribes',
    'subscribers',
    'news',
    'chats',
    'messages',
  ],
});
