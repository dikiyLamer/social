import React, { FC } from 'react';
import styles from './index.module.scss';
import { ICurrentUser } from '../../../shared/interfaces/auth.interface';
import { Popover } from 'antd';
import LogoutButton from './ui';
import { useAppDispatch } from '../../../app/store';
import { credentialsSlice } from '../../../entities/credentials';
import { clientCookies } from '../../../shared/utils/cookie';
import UserPhoto from '../UserPhoto/UserPhoto';

const Avatar: FC<ICurrentUser> = ({ email, firstName, secondName, photo }) => {
  const dispatch = useAppDispatch();
  const logout = () => {
    clientCookies.remove('token');
    dispatch(credentialsSlice.actions.reset());
  };
  return (
    <Popover content={<LogoutButton logout={logout} />} title={email} trigger="click">
      <div className={styles['photo-block']}>
        <p>{firstName}</p>
        <UserPhoto firstName={firstName} photo={photo} secondName={secondName} />
      </div>
    </Popover>
  );
};

export default Avatar;
