import React, { FC } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { RootState, useAppSelector } from '../../app/store';
import Avatar from '../../features/user/Avatar/Avatar';

import GlobalSearch from '../../shared/components/search/GlobalSearch';

const Header: FC<{ children: any }> = ({ children }) => {
  const user = useAppSelector((state: RootState) => state.user.currentUser);
  const { isAuth } = useAppSelector((state: RootState) => state.credentials);

  return (
    <header>
      <div className={styles.main}>
        <Link to="/">
          <p className={styles.title}>Social</p>
        </Link>
        {isAuth && <GlobalSearch />}
      </div>

      <div className={styles['user-actions']}>
        {isAuth ? (
          <Avatar {...user} />
        ) : (
          <>
            <Link to="/login">
              <p>Войти</p>
            </Link>
            <Link to="/register">
              <p>Регистрация</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
