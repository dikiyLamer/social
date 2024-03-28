import React from 'react';
import SubscribersWidget from '../widgets/subscribers/Subscribers';
import { useTitle } from '../shared/hooks/useTitle';

const Subscribers = () => {
  useTitle('subscribers');
  return (
    <div>
      <SubscribersWidget />
    </div>
  );
};

export default Subscribers;
