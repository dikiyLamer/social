import React, { FC } from 'react';
import { IPost } from '../../../shared/interfaces/post.interface';

import styles from './index.module.scss';
import { PostCard } from '../postCard/PostCard';

export const PostList: FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div className={styles.posts}>
      {posts.map((post) => (
        <PostCard {...post} key={post.uid} />
      ))}
    </div>
  );
};
