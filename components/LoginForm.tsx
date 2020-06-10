import * as React from 'react';
import Link from 'next/link';
import { Input, Button } from 'antd';
import { useInput, UseInputType, Form } from '../pages/signup';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

const LoginForm: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [id, onChangeId]: UseInputType = useInput('');
  const [password, onChangePassword]: UseInputType = useInput('');

  const onSubmitForm = React.useCallback((e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    dispatch(loginAction);
  }, []);
  return (
    <Form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          Log In
        </Button>
        <Link href="/signup">
          <a>
            <Button>Sign Up</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
