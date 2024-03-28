import React, { FC } from 'react';
import { useTitle } from '../shared/hooks/useTitle';
import LoginForm from '../features/user/LoginForm/LoginForm';

const Login: FC = () => {
  useTitle('login');
  return <LoginForm />;
};

export default Login;
