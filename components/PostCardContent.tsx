import * as React from 'react';
import Link from 'next/link';

type PostCardContentProps = {
	postData: string;
};

const PostCardContent = ({ postData }: PostCardContentProps): React.ReactElement => {
	return (
		<div>
			{postData.split(/(#[^\s]+)/g).map((v, index) => {
				if (v.match(/#[^\s]+/)) {
					return (
						<Link
							href={{ pathname: `/hashtag`, query: { tag: v.slice(1) } }}
							as={`/hashtag/${v.slice(1)}`}
							key={index}
						>
							<a>{v}</a>
						</Link>
					);
				}
				return v;
			})}
		</div>
	);
};

export default PostCardContent;
