import React from 'react';
import MessagesWidget from '../widgets/messages/Messages';
import { useTitle } from '../shared/hooks/useTitle';
const Messages = () => {
  useTitle('messages');
  return <MessagesWidget />;
};

export default Messages;
