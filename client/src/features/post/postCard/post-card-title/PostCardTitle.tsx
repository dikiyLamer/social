import React, { FC } from 'react';
import { ICurrentUser } from '../../../../shared/interfaces/auth.interface';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const PostCardTitle: FC<ICurrentUser> = ({ firstName, secondName, uid }) => {
  return (
    <Link className={styles.title} to={`/user/${uid}`}>
      {firstName} {secondName}
    </Link>
  );
};

export default PostCardTitle;
