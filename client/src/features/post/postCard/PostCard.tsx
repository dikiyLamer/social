import { Card } from 'antd';
import React, { FC, useEffect, useRef } from 'react';
import { IPost } from '../../../shared/interfaces/post.interface';

import styles from './index.module.scss';
import PostCardTitle from './post-card-title/PostCardTitle';

export const PostCard: FC<IPost> = ({ user, description }) => {
  const desc = useRef(null);
  useEffect(() => {
    (desc.current! as HTMLParagraphElement).innerHTML = description;
  });
  return (
    <Card title={<PostCardTitle {...user!} />} hoverable={false}>
      <p className={styles.description} ref={desc}></p>
    </Card>
  );
};
