import React, { FC } from 'react';
import { CreatePostForm } from '../../../features/post/createPostForm/CreatePostForm';
import { PostList } from '../../../features/post/postList/PostList';
import { useNewPostMutation, useUserPostsQuery } from '../../../app/endpoints/posts';
import { IPost } from '../../../shared/interfaces/post.interface';

import styles from './index.module.scss';
import { useAppSelector } from '../../../app/store';

interface Props {
  uid: string | undefined;
}

const PostsWidget: FC<Props> = ({ uid }) => {
  const { data: posts } = useUserPostsQuery(uid as string);
  const { currentUser } = useAppSelector((state) => state.user);

  const [createNewPost] = useNewPostMutation();
  const createPost = (post: IPost) => {
    createNewPost(post);
  };

  return (
    <div className={styles['all-info']}>
      <div className={styles.posts}>
        {uid === currentUser.uid ? <CreatePostForm create={createPost} /> : null}
        <PostList posts={posts?.payload || []} />
      </div>
    </div>
  );
};

export default PostsWidget;
