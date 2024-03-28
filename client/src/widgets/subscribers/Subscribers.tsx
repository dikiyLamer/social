import React from 'react';
import SubCardsList from '../../features/subscrtptions/sub-card-list/SubCardList';
import { RootState, useAppSelector } from '../../app/store';
import { useSubscribersQuery } from '../../app/endpoints/subscriptions';

const Subscribers = () => {
  const { uid } = useAppSelector((state: RootState) => state.user.currentUser);
  const { data } = useSubscribersQuery(uid!);

  return <SubCardsList users={data?.payload || []} />;
};

export default Subscribers;
