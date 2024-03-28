import React, { FC } from 'react';
import { useTitle } from '../shared/hooks/useTitle';
import RegisterForm from '../features/user/register-form/register-form';

const Register: FC = () => {
  useTitle('register');
  return <RegisterForm />;
};

export default Register;
