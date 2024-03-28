import React from 'react';

import { useParams } from 'react-router-dom';
import { useFindByIdQuery } from '../../app/endpoints/user';
import PostsWidget from './posts/PostsWidget';

import styles from './index.module.scss';
import { Spin } from 'antd';
import UserWidget from './user/UserWidget';

const Wall = () => {
  const { uid } = useParams<string>();

  const { data, isLoading, isFetching } = useFindByIdQuery(uid);
  const user = data?.payload;

  return (
    <div className={styles.wall}>
      {isLoading || isFetching ? (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <UserWidget uid={uid} user={user} />
          <PostsWidget uid={uid} />
        </>
      )}
    </div>
  );
};

export default Wall;
