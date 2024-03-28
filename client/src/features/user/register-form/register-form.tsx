import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';

import styles from './index.module.scss';
import { useRegisterMutation } from '../../../app/endpoints/auth';
import { IUserData } from '../../../shared/interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [login, { isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();
  const onFinish = (data: IUserData) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess]);

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

        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="secondName"
          rules={[{ required: true, message: 'Введите фамилию' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
