import React from 'react';
import { useSubscribesQuery } from '../../app/endpoints/subscriptions';
import { RootState, useAppSelector } from '../../app/store';
import SubCardsList from '../../features/subscrtptions/sub-card-list/SubCardList';

const Subscribes = () => {
  const { uid } = useAppSelector((state: RootState) => state.user.currentUser);
  const { data } = useSubscribesQuery(uid!);

  return <SubCardsList users={data?.payload || []} />;
};

export default Subscribes;
