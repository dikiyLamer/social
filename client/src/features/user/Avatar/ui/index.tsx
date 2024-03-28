import { Button } from 'antd';
import React, { FC } from 'react';
interface ILogout {
  logout: () => void;
}
const LogoutButton: FC<ILogout> = ({ logout }) => {
  const handleClick = () => {
    logout();
  };
  return <Button onClick={handleClick}>Выйти</Button>;
};

export default LogoutButton;
