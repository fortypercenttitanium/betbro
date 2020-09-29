import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Bouncer from 'formbouncerjs';
import ReCAPTCHA from 'react-google-recaptcha';

const encode = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&');
};

new Bouncer('form', { disableSubmit: true });

const FormDiv = styled.div`
	overflow: auto;
	width: 100%;
	margin-top: 2rem;
`;

const H1 = styled.h1`
	text-align: center;
	font-size: calc(1rem + 0.3vw);
	padding: 0.6rem;
`;

const Form = styled.form`
	width: 40%;
	min-width: 330px;
	text-align: center;
	margin: 1rem auto 2rem;
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
		token: '',
	});

	const [formSubmitted, setFormSubmitted] = useState(false);

	const reCaptchaRef = useRef();

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await reCaptchaRef.current.executeAsync();
		formData.token = token;
		const postPath =
			process.env.REACT_APP_NODE_ENV === 'dev' ? 'https://betbro.io/' : '/';
		fetch(postPath, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({ 'form-name': 'contact', ...formData }),
		})
			.then(() => {
				setSessionStorage();
				checkSessionStorage();
			})
			.catch((error) => alert(error));
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
			<Form
				onSubmit={handleSubmit}
				method='POST'
				name='contact'
				data-netlify='true'
			>
				<ReCAPTCHA
					ref={reCaptchaRef}
					size='invisible'
					sitekey='6Lf9zdEZAAAAAKTNPXdWrT2Gfn4FoY1_QBbQRYYa'
				/>
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
			<p
				style={{
					margin: 'auto',
					textAlign: 'center',
					width: '40%',
					fontSize: '0.7rem',
					marginBottom: '0.5rem',
				}}
			>
				Note: Google reCAPTCHA is implemented for this form. The use of
				reCAPTCHA is subject to the Google{' '}
				<a href='https://www.google.com/policies/privacy/'>Privacy Policy</a>{' '}
				and <a href='https://www.google.com/policies/terms/'>Terms of Use.</a>
			</p>
		</FormDiv>
	);
}
