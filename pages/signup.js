import React, { useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";

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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = (e) => {
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
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  const onChangeTerm = (e) => {
    setTermError(!e.target.checked);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>Next Bird</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css'
        />
      </Head>
      <AppLayout>
        <FormComponent onSubmit={onSubmit}>
          <div>
            <label htmlFor='user-id'>ID</label>
            <br />
            <Input name='user-id' required onChange={onChangeId} value={id} />
          </div>
          <div>
            <label htmlFor='user-password'>Password</label>
            <br />
            <Input
              type='password'
              name='user-password'
              onChange={onChangePassword}
              value={password}
            />
          </div>
          {passwordError && <ErrorMsg>This password is incorrect.</ErrorMsg>}
          <div>
            <label htmlFor='user-password-check'>Password Check</label>
            <br />
            <Input
              type='password'
              name='user-password-check'
              onChange={onChangePasswordCheck}
              value={passwordCheck}
            />
            {passwordError && <ErrorMsg>This password is incorrect</ErrorMsg>}
          </div>
          <div>
            <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
              Please repeat that in a respectful way
            </Checkbox>
            {termError && <ErrorMsg>Please check the term.</ErrorMsg>}
          </div>
          <SignupDiv>
            <Button type='primary' htmlType='submit' onClick={onSubmit}>
              Submit
            </Button>
          </SignupDiv>
        </FormComponent>
      </AppLayout>
    </>
  );
};

export default Signup;
