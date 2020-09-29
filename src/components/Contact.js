import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Bouncer from 'formbouncerjs';

new Bouncer('form', { disableSubmit: true });

const FormDiv = styled.div`
	width: 40%;
	min-width: 330px;
	padding: 1.5rem;
	border: 1px solid #ddd;
	margin: 1rem auto;
`;

const H1 = styled.h1`
	text-align: center;
	font-size: calc(1rem + 0.3vw);
	padding: 0.6rem;
`;

const Form = styled.form`
	text-align: center;
	margin: 1rem auto;
`;

const Input = styled.input`
	display: block;
	width: 50%;
	padding: 0.5rem;
	margin: 0.5rem auto;
`;
const TextArea = styled.textarea`
	display: block;
	width: 50%;
	padding: 0.5rem;
	margin: 0.5rem auto;
`;

export default function Contact(props) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [formSubmitted, setFormSubmitted] = useState(false);

	useEffect(() => {
		props.setHeadline('contact');
	}, [props]);

	const checkSessionStorage = () => {
		if (JSON.parse(sessionStorage.getItem('betBroFormSubmitted')) === true) {
			setFormSubmitted(true);
		}
	};

	const setSessionStorage = () => {
		sessionStorage.setItem('betBroFormSubmitted', JSON.stringify(true));
	};

	useEffect(() => {
		checkSessionStorage();
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setSessionStorage();
		checkSessionStorage();
		console.log(formData);
	};

	const handleChange = (e) => {
		const newData = { ...formData };
		newData[e.target.name] = e.target.value;
		setFormData(newData);
	};

	return formSubmitted ? (
		<FormDiv>
			<H1>Thank you for your message. We will respond as soon as we can!</H1>
		</FormDiv>
	) : (
		<FormDiv>
			<H1>Have questions about how to use BETBRO? </H1>
			<H1>Have a suggestion for how to make BETBRO even more kick ass? </H1>
			<H1> Fill out this form!</H1>
			<Form onSubmit={handleSubmit} method='POST' name='contact' netlify>
				<Input
					type='text'
					placeholder='Name'
					name='name'
					onChange={handleChange}
					required
				/>
				<Input
					type='email'
					placeholder='Email'
					name='email'
					onChange={handleChange}
					required
				/>
				<TextArea
					placeholder='Message'
					name='message'
					height='60px'
					width='auto'
					minLength='20'
					onChange={handleChange}
					required
				/>
				<button style={{ padding: '0.5rem' }}>Submit</button>
			</Form>
		</FormDiv>
	);
}
