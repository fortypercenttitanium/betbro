import React, { useEffect } from 'react';

export default function Contact(props) {
	useEffect(() => {
		props.setHeadline('contact');
	}, [props]);
	return <div>Contact</div>;
}
