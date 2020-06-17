import * as React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

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
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>('');
  const { imagePaths, isAddingPost, addedPost } = useSelector((state) => state.post);

  React.useEffect(() => {
    setText('');
  }, [addedPost === true]);

  const onSubmitForm = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          text: text,
        },
      });
    },
    [text],
  );

  const onChangeText = React.useCallback((e) => {
    setText(e.target.value);
  }, []);
  return (
    <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="Let's Tweet!!"
        value={text}
        onChange={onChangeText}
      ></Input.TextArea>
      <div>
        <input type="file" multiple hidden />
        <Button>Upload Image</Button>
        <TweetBtn type="primary" htmlType="submit" loading={isAddingPost}>
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
