import * as React from 'react';
import Error from 'next/error';

const MyError = (props) => {
	return (
		<React.Fragment>
			<h1>Error!</h1>
			<Error statusCode={props.statusCode} />
		</React.Fragment>
	);
};

MyError.getInitialProps = async (context) => {
	const statusCode = context.res ? context.res.statusCode : context.err ? err.statusCode : null;
	return { statusCode };
};

export default MyError;
