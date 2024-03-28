import { api } from './index';
import { IToken, IUserData } from '../../shared/interfaces/auth.interface';
import { IMessage } from '../../shared/interfaces/common.interface';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IMessage<IToken>, IUserData>({
      query: (userData) => {
        return { url: '/auth/login', method: 'POST', body: userData };
      },
      invalidatesTags: ['credentials'],
    }),
    register: build.mutation<IMessage<IToken>, IUserData>({
      query: (userData) => {
        return { url: '/auth/register', method: 'POST', body: userData };
      },
      invalidatesTags: ['credentials'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
