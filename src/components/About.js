import React, { useEffect } from 'react';

export default function About(props) {
	useEffect(() => {
		props.setHeadline('about');
	}, [props]);
	return <div>About</div>;
}
