import React, { FC } from 'react';

import styles from './index.module.scss';
import { ICurrentUser } from '../../../shared/interfaces/auth.interface';
import SubCard from '../sub-card/SubCard';

const SubCardsList: FC<{ users: ICurrentUser[] }> = ({ users }) => {
  return users ? (
    <div className={styles.cardList}>
      {users.map((user) => (
        <SubCard user={user} key={user.uid} />
      ))}
    </div>
  ) : null;
};

export default SubCardsList;
