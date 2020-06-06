import * as React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const Form = styled.form`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const ProfileForm = (): React.ReactElement => {
  return (
    <Form>
      <Input addonBefore="name" />
      <Button type="primary">Edit</Button>
    </Form>
  );
};

export default ProfileForm;
