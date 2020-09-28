import React, { useEffect } from 'react';

export default function Contact(props) {
	useEffect(() => {
		props.setHeadline('contact');
	}, [props]);

	const submitHandler = (e) => {};
	return (
		<div>
			<h1>
				Have questions about how to use BETBRO? Have a suggestion for how to
				make BETBRO even more kick ass? Fill out this form!
			</h1>
			<form onSubmit={submitHandler}>
				<input type='text' placeholder='test'></input>
			</form>
		</div>
	);
}
