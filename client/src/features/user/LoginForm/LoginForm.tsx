import { Button, Form, Input } from 'antd';
import React from 'react';

import styles from './index.module.scss';
import { useLoginMutation } from '../../../app/endpoints/auth';
import { IToken, IUserData } from '../../../shared/interfaces/auth.interface';
import { clientCookies } from '../../../shared/utils/cookie';
import { IMessage } from '../../../shared/interfaces/common.interface';

const LoginForm = () => {
  const [login] = useLoginMutation();
  const onFinish = async (data: IUserData) => {
    try {
      const { payload: credentials }: IMessage<IToken> = await login(data).unwrap();
      clientCookies.setData('token', credentials!.token, new Date(+credentials!.tokenTTL));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.login}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Введите E-mail' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
