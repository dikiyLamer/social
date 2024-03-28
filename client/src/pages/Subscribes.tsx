import React from 'react';
import SubscribesWidget from '../widgets/subscribes/Subscribes';
import { useTitle } from '../shared/hooks/useTitle';

const Subscribes = () => {
  useTitle('subscribes');
  return (
    <div>
      <SubscribesWidget />
    </div>
  );
};

export default Subscribes;
