import { api } from './index';
import { ICurrentUser } from '../../shared/interfaces/auth.interface';
import { IMessage } from '../../shared/interfaces/common.interface';

export const subsApi = api.injectEndpoints({
  endpoints: (build) => ({
    subscribes: build.query<IMessage<ICurrentUser[]>, string>({
      query: (uid) => {
        return { url: `/subs/subscribes/${uid}` };
      },
      providesTags: ['subscribes'],
    }),
    subscribers: build.query<IMessage<ICurrentUser[]>, string>({
      query: (uid) => {
        return { url: `/subs/subscribers/${uid}` };
      },
      providesTags: ['subscribers'],
    }),
    isSubscribed: build.query<IMessage<boolean>, [string, string]>({
      query: (users) => {
        return { url: `/subs/issubscribed`, params: { me: users[0], user: users[1] } };
      },
    }),
    subscribe: build.mutation<IMessage<void>, [string, string]>({
      query: (users) => {
        return { url: '/subs/subscribe', method: 'POST', params: { me: users[0], user: users[1] } };
      },
      invalidatesTags: ['subscribes', 'subscribers'],
    }),
    unsubscribe: build.mutation<IMessage<void>, [string, string]>({
      query: (users) => {
        return {
          url: '/subs/unsubscribe',
          method: 'DELETE',
          params: { me: users[0], user: users[1] },
        };
      },
      invalidatesTags: ['subscribes', 'subscribers'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubscribesQuery,
  useIsSubscribedQuery,
  useSubscribeMutation,
  useSubscribersQuery,
  useUnsubscribeMutation,
} = subsApi;
