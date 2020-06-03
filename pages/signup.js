import React, { useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";

const FormComponent = styled(Form)`
  padding: 10;
`;

const Signup = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
  };
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);

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
            <Input
              type='text'
              required
              name='user-id'
              onChange={onChangeId}
              value={id}
            />
          </div>
          <div>
            <label htmlFor='user-password'>Password</label>
            <br />
            <Input
              type='password'
              required
              name='user-password'
              onChange={onChangePassword}
              value={password}
            />
          </div>
          <div>
            <label htmlFor='user-password-check'>Password Check</label>
            <br />
            <Input
              type='password'
              required
              name='user-password-check'
              onChange={onChangePasswordCheck}
              value={passwordCheck}
            />
          </div>
          <div>
            <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
              Please repeat that in a respectful way
            </Checkbox>
          </div>
          <div>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </div>
        </FormComponent>
      </AppLayout>
    </>
  );
};

export default Signup;
