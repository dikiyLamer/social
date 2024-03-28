import React from 'react';
import { useNewsQuery } from '../../app/endpoints/news';
import { PostList } from '../../features/post/postList/PostList';

import styles from './index.module.scss';

const News = () => {
  const { data } = useNewsQuery();

  return (
    <div className={styles.news}>
      <PostList posts={data?.payload || []} />
    </div>
  );
};

export default News;
