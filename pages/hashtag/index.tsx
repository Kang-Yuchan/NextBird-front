import * as React from 'react';

type ContextProps = {
  tag: string | number;
};

const Hashtag = ({ tag }: ContextProps) => {
  return (
    <React.Fragment>
      <div>{tag}</div>
    </React.Fragment>
  );
};

Hashtag.getInitialProps = async (context) => {
  return { tag: context.query.tag };
};

export default Hashtag;
