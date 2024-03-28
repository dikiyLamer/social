import { api } from './index';
import { IPost } from '../../shared/interfaces/post.interface';
import { IMessage } from '../../shared/interfaces/common.interface';

export const newsApi = api.injectEndpoints({
  endpoints: (build) => ({
    news: build.query<IMessage<IPost[]>, void>({
      query: () => {
        return { url: '/posts/news' };
      },
      providesTags: ['news'],
    }),
  }),
  overrideExisting: false,
});

export const { useNewsQuery } = newsApi;
