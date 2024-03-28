import React, { useRef } from 'react';

import styles from './index.module.scss';
import ChatMessages from '../messages/ChatMessages';
import { Button } from 'antd';
import { useCreateMessageMutation } from '../../../../app/endpoints/messages';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/store';

const Chat = () => {
  const [newMessage] = useCreateMessageMutation();
  const { uid } = useParams<string>();
  const { currentUser } = useAppSelector((state) => state.user);

  const text = useRef(null);
  const createMessage = () => {
    newMessage({
      chatId: uid!,
      text: (text.current! as HTMLTextAreaElement).value,
      userId: currentUser.uid!,
    });
  };
  return (
    <div className={styles.chat}>
      <div className={styles['work-zone']}>
        <ChatMessages />
      </div>
      <div className={styles['typing-zone']}>
        <textarea
          ref={text}
          name="message"
          id=""
          placeholder="Введите сообщение..."
          cols={30}
          rows={10}
        ></textarea>
        <Button className={styles.send} type="primary" onClick={createMessage}>
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default Chat;
