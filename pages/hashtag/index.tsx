import * as React from 'react';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';

type ContextProps = {
  tag: string | number;
};

const Hashtag = ({ tag }: ContextProps) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);

  React.useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, []);

  return (
    <React.Fragment>
      {mainPosts.map((c) => (
        <Post key={c.createdAt} post={c} />
      ))}
    </React.Fragment>
  );
};

Hashtag.getInitialProps = async (context) => {
  return { tag: context.query.tag };
};

export default Hashtag;
