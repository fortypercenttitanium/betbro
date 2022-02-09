import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

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
  width: 18rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
`;
const TextArea = styled.textarea`
  display: block;
  width: 18rem;
  height: 10rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const reCaptchaRef = useRef();

  const checkSessionStorage = () => {
    if (sessionStorage.getItem('betBroFormSubmitted') === 'true') {
      setFormSubmitted();
    }
  };

  const setSessionStorage = () => {
    sessionStorage.setItem('betBroFormSubmitted', 'true');
  };

  useEffect(() => {
    checkSessionStorage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await reCaptchaRef.current.executeAsync();
    const postPath =
      process.env.REACT_APP_NODE_ENV === 'dev' ? 'https://betbro.io/' : '/';
    fetch(postPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        'g-recaptcha-response': token,
        ...formData,
      }),
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

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="BetBro is pretty great, but everything can be better. Let us know your suggestions!"
        />
        <title>{'BetBro - Contact Us'}</title>
      </Helmet>
      {formSubmitted ? (
        <FormDiv>
          <H1>
            Thank you for your message. We will respond as soon as we can!
          </H1>
        </FormDiv>
      ) : (
        <FormDiv>
          <H1>Have questions about how to use BETBRO? </H1>
          <H1>Have a suggestion for how to make BETBRO even more kick ass? </H1>
          <H1> Fill out this form!</H1>
          <Form
            onSubmit={handleSubmit}
            method="POST"
            name="contact"
            data-netlify="true"
            data-netlify-recaptcha="true"
          >
            <ReCAPTCHA
              ref={reCaptchaRef}
              size="invisible"
              sitekey="6Lf9zdEZAAAAAKTNPXdWrT2Gfn4FoY1_QBbQRYYa"
            />
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <TextArea
              placeholder="Message (min: 15 chars)"
              name="message"
              height="60px"
              width="auto"
              minLength="15"
              onChange={handleChange}
              required
            />
            <button style={{ padding: '0.5rem' }}>
              <span style={{ margin: 'auto' }}>Submit</span>
            </button>
          </Form>
          <p
            style={{
              margin: 'auto',
              textAlign: 'center',
              width: '20rem',
              fontSize: '0.7rem',
              marginBottom: '0.5rem',
              textShadow: '1px 1px 1px black',
            }}
          >
            Note: Google reCAPTCHA is implemented for this form.
            <br /> The use of reCAPTCHA is subject to the Google{' '}
            <a href="https://www.google.com/policies/privacy/">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://www.google.com/policies/terms/">Terms of Use.</a>
          </p>
        </FormDiv>
      )}
    </div>
  );
}
