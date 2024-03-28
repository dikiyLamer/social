import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { clientCookies } from '../../shared/utils/cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).credentials;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const tokenQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const { dispatch } = api;
  let result = await baseQuery(args, api, extraOptions);
  const { error } = result;
  if (error?.status === 403 || error?.status === 401) {
    clientCookies.removeData('token');
    dispatch({ type: 'credentials/reset' });
  }
  return result;
};
