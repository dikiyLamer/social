import React, { FC } from 'react';
import { IChat } from '../../../shared/interfaces/messages.interface';
import { Link, Outlet } from 'react-router-dom';

import styles from './index.module.scss';

interface Props {
  chats: IChat[];
}
const UsersBlock: FC<Props> = ({ chats }) => {
  return (
    <div className={styles.messages}>
      <div className={styles.chats}>
        {chats.map((chat) => (
          <Link to={`/messages/chat/${chat.uid}`}>{chat.uid}</Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default UsersBlock;
