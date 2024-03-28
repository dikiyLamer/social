import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AppLayout from '../layouts/layout';
import Register from './Register';
import { RootState, useAppSelector } from '../app/store';
import News from './News';
import Subscribes from './Subscribes';
import Subscribers from './Subscribers';
import Messages from './Messages';
import Wall from './Wall';
import Chat from '../features/messages/chat/chat/Chat';

const Routing: FC = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.credentials);
  return !isAuth ? (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/news" element={<News />}></Route>
        <Route path="/subscribes" element={<Subscribes />}></Route>
        <Route path="/subscribers" element={<Subscribers />}></Route>
        <Route path="/messages" element={<Messages />}>
          <Route path="/messages/chat/:uid" element={<Chat />}></Route>
        </Route>
        <Route path="/user/:uid" element={<Wall />}></Route>
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Routing;
