import React from 'react';
import WallWidget from '../widgets/wall/Wall';
import { useTitle } from '../shared/hooks/useTitle';
const Wall = () => {
  useTitle('Моя страница');
  return <WallWidget />;
};

export default Wall;
