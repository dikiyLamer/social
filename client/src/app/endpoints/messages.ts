import { api } from './index';
import { IMessage } from '../../shared/interfaces/common.interface';
import {
  IChat,
  IChatMessageData,
  ICreateMessageReq,
} from '../../shared/interfaces/messages.interface';

export const messagesApi = api.injectEndpoints({
  endpoints: (build) => ({
    chats: build.query<IMessage<IChat[]>, void>({
      query: () => {
        return { url: `/chat/chats` };
      },
      providesTags: ['chats'],
    }),
    messages: build.query<IMessage<IChatMessageData>, { chatId: string; size: number }>({
      query: ({ chatId, size }) => {
        return { url: `/chat/messages`, params: { chatId, size } };
      },
      providesTags: ['messages'],
    }),
    createChat: build.mutation<IMessage<undefined>, string[]>({
      query: (users) => {
        return { url: '/chat/chats', method: 'POST', body: { userUids: users } };
      },
      invalidatesTags: ['chats'],
    }),
    createMessage: build.mutation<IMessage<undefined>, ICreateMessageReq>({
      query: (chatData) => {
        return { url: '/chat/messages', method: 'POST', body: chatData };
      },
      invalidatesTags: ['messages'],
    }),
  }),
  overrideExisting: false,
});

export const { useChatsQuery, useMessagesQuery, useCreateChatMutation, useCreateMessageMutation } =
  messagesApi;
