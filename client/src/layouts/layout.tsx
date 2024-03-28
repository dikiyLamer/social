import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../widgets/header/Header';
import Sider from '../widgets/slider/Sider';
import { RootState, useAppSelector } from '../app/store';

const AppLayout = () => {
  const isAuth = useAppSelector((state: RootState) => state.credentials.isAuth);
  return (
    <Layout style={{ display: 'flex', height: '100%' }}>
      <Header>Header</Header>
      <Layout style={{ flexGrow: 1, flexBasis: 'auto', display: 'flex', flexDirection: 'row' }}>
        {isAuth ? <Sider /> : null}
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
