import * as React from 'react';
import { useRouter } from 'next/router';

const HashtagName: React.FunctionComponent = () => {
  const router = useRouter();
  const { hashtagname } = router.query;
  return <p>{hashtagname}</p>;
};

export default HashtagName;
