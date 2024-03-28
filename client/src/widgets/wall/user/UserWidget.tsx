import React, { FC } from 'react';
import UserPhoto from '../../../features/user/UserPhoto/UserPhoto';
import { Button } from 'antd';
import { useAppSelector } from '../../../app/store';
import { ICurrentUser } from '../../../shared/interfaces/auth.interface';
import { useSubscribeMutation } from '../../../app/endpoints/subscriptions';

import styles from './index.module.scss';
import { useCreateChatMutation } from '../../../app/endpoints/messages';

interface Props {
  uid?: string;
  user?: ICurrentUser;
}

const UserWidget: FC<Props> = ({ uid, user }) => {
  const [subscribe] = useSubscribeMutation();

  const { currentUser } = useAppSelector((state) => state.user);
  const [createNewChat] = useCreateChatMutation();

  const createSubscription = () => {
    subscribe([currentUser?.uid as string, uid as string]);
  };

  const createChat = () => {
    createNewChat([uid!, currentUser.uid!]);
  };

  return (
    <div className={styles.user}>
      <UserPhoto
        firstName={user?.firstName || ''}
        secondName={user?.secondName || ''}
        width="150px"
        height="150px"
      />
      <div className={styles['user-name-actions']}>
        <div className={styles.name}>
          {user?.firstName || ''} {user?.secondName || ''}
        </div>
        {user && user.uid !== currentUser.uid ? (
          <div className={styles.name}>
            <Button type="primary" onClick={createSubscription}>
              Подписаться
            </Button>
            <Button type="primary" onClick={createChat}>
              Написать
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserWidget;
