import { api } from './index';
import { ICurrentUser } from '../../shared/interfaces/auth.interface';
import { IMessage } from '../../shared/interfaces/common.interface';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<IMessage<ICurrentUser>, null>({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['users'],
    }),
    findByName: build.query<IMessage<ICurrentUser[]>, string | undefined>({
      query: (searchQuery: string | undefined) => ({ url: `/users/find/${searchQuery}` }),
      providesTags: ['users'],
    }),
    findById: build.query<IMessage<ICurrentUser>, string | undefined>({
      query: (uid: string) => ({ url: `/users/${uid}` }),
      providesTags: ['users'],
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useFindByNameQuery, useFindByIdQuery } = userApi;
