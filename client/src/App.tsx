import React from 'react';
import { withHocs } from './app/providers';
import Routing from './pages';
import { RootState, useAppSelector } from './app/store';
import { useMeQuery } from './app/endpoints/user';

function App() {
  const { isAuth } = useAppSelector((state: RootState) => state.credentials);
  useMeQuery(null, { skip: !isAuth });
  return <Routing />;
}

export default withHocs(() => <App />);
