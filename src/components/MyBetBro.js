import React, { useEffect } from 'react';

export default function MyBetBro(props) {
	useEffect(() => {
		props.setHeadline('mybetbro');
	}, [props]);

	return <div>You must be logged in to use this feature</div>;
}
