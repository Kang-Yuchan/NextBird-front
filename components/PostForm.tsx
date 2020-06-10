import * as React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const Form = styled.form`
  margin-bottom: 20px;
`;

const TweetBtn = styled(Button)`
  float: right;
`;

const ImgDiv = styled.div`
  display: inline-block;
`;

const Img = styled.img`
  width: 200px;
`;

const PostForm = (): React.ReactElement => {
  const { imagePaths } = useSelector((state) => state.post);
  return (
    <Form encType="multipart/form-data">
      <Input.TextArea maxLength={140} placeholder="Let's Tweet!!"></Input.TextArea>
      <div>
        <input type="file" multiple hidden />
        <Button>Upload Image</Button>
        <TweetBtn type="primary" htmlType="submit">
          Tweet
        </TweetBtn>
      </div>
      <div>
        {imagePaths.map(
          (v: string): React.ReactElement => {
            return (
              <ImgDiv key={v}>
                <Img src={`http://localhost:3065/` + v} alt={v} />
                <div>
                  <Button>Delete</Button>
                </div>
              </ImgDiv>
            );
          },
        )}
      </div>
    </Form>
  );
};
export default PostForm;
