import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';

const FormComponent = styled(Form)`
  padding: 10;
`;

const ErrorMsg = styled.span`
  color: red;
`;

const SignupDiv = styled.div`
  margin-top: 10px;
`;

const Signup = () => {
  const useInput = (initialValue = null) => {
    const [value, setter] = useState(initialValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      if (!password) {
        setPasswordError(true);
      }

      if (password !== passwordCheck) {
        setPasswordError(true);
      }

      if (!term) {
        setTermError(true);
      }
      e.preventDefault();
    },
    [password, passwordCheck, term],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(!e.target.checked);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <FormComponent onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" required onChange={onChangeId} value={id} />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            type="password"
            name="user-password"
            required
            onChange={onChangePassword}
            value={password}
          />
        </div>
        {passwordError && <ErrorMsg>This password is incorrect.</ErrorMsg>}
        <div>
          <label htmlFor="user-password-check">Password Check</label>
          <br />
          <Input
            type="password"
            name="user-password-check"
            onChange={onChangePasswordCheck}
            value={passwordCheck}
          />
          {passwordError && <ErrorMsg>This password is incorrect</ErrorMsg>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            Please repeat that in a respectful way
          </Checkbox>
          {termError && <ErrorMsg>Please check the term.</ErrorMsg>}
        </div>
        <SignupDiv>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </SignupDiv>
      </FormComponent>
    </>
  );
};

export default Signup;
