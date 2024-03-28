import React from 'react';
import UsersBlock from '../../features/messages/users-block/UsersBlock';
import { useChatsQuery } from '../../app/endpoints/messages';

const Messages = () => {
  const { data } = useChatsQuery();
  const chats = data?.payload;
  return <UsersBlock chats={chats || []} />;
};

export default Messages;
