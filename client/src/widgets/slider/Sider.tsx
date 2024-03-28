import React from 'react';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../app/store';
import { userSlice } from '../../entities/user';

const Sider = () => {
  let user = useAppSelector((state: RootState) => state.user.currentUser);
  const dispatch = useAppDispatch();
  let { uid } = user;
  uid = uid ? `/user/${uid}` : '';

  const tabs = [
    {
      name: uid,
      alias: 'Моя страница',
      onClick: () => {
        dispatch(userSlice.actions.userPage(user));
      },
    },
    { name: 'news', alias: 'Новости' },
    { name: 'subscribes', alias: 'Подписки' },
    { name: 'subscribers', alias: 'Подписчики' },
    { name: 'messages', alias: 'Сообщения' },
  ];
  return (
    <div className={styles.slider}>
      {tabs.map((tab) => (
        <Link className={styles.tab} to={tab.name} key={tab.name} onClick={tab.onClick}>
          {tab.alias}
        </Link>
      ))}
    </div>
  );
};

export default Sider;
