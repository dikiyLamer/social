import { api } from './index';
import { IPost } from '../../shared/interfaces/post.interface';
import { IMessage } from '../../shared/interfaces/common.interface';

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    posts: build.query<IMessage<IPost[]>, void>({
      query: () => {
        return { url: '/posts' };
      },
      providesTags: ['posts'],
    }),
    userPosts: build.query<IMessage<IPost[]>, string>({
      query: (uid: string) => {
        return { url: `/posts/user/${uid}` };
      },
      providesTags: ['posts'],
    }),
    getPost: build.query<IMessage<IPost>, string>({
      query: (uid: string) => {
        return { url: `/posts/${uid}` };
      },
      providesTags: ['posts'],
    }),
    newPost: build.mutation<IMessage<void>, { description: string }>({
      query: (postData: IPost) => {
        return { url: `/posts`, method: 'POST', body: postData };
      },
      invalidatesTags: ['posts'],
    }),
    editPost: build.mutation<IMessage<void>, IPost>({
      query: (postData: IPost) => {
        return { url: `/posts/${postData.uid}`, method: 'PATCH', body: postData };
      },
      invalidatesTags: ['posts'],
    }),
    deletePost: build.mutation<IMessage<void>, string>({
      query: (uid: string) => {
        return { url: `/posts/${uid}`, method: 'DELETE' };
      },
      invalidatesTags: ['posts'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostQuery,
  useDeletePostMutation,
  useEditPostMutation,
  usePostsQuery,
  useUserPostsQuery,
  useNewPostMutation,
} = postsApi;
