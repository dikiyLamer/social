import React, { FC } from 'react';
import styles from './index.module.scss';
import UserPhoto from '../../user/UserPhoto/UserPhoto';
import { ICurrentUser } from '../../../shared/interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

const SubCard: FC<{ user: ICurrentUser }> = ({ user }) => {
  const navigate = useNavigate();

  const goToUserPage = () => {
    navigate(`/user/${user.uid}`);
  };
  return (
    <div className={styles.card} onClick={goToUserPage}>
      <UserPhoto {...user} />
      <div className={styles['user-name-actions']}>
        <div className={styles.name}>
          {user.firstName} {user.secondName}
        </div>
      </div>
    </div>
  );
};

export default SubCard;
