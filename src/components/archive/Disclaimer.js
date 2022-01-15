import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import 'reactjs-popup/dist/index.css';

const StyledPopup = styled(Popup)`
	&-overlay {
		background-color: rgba(0, 0, 0, 0.2);
	}
	&-content {
		background-color: rgba(200, 200, 200, 1);
		display: flex;
		color: #222;
		padding: 3rem 1rem;
		text-align: left;
		max-height: 80%;
		width: 50%;
		min-width: 300px;
		overflow: auto;
	}
`;

const StyledP = styled.p`
	margin: 1rem auto;
	font-size: 1.2rem;
	text-align: left;
	padding: 1rem;
	@media (max-width: 750px) {
		font-size: 0.9rem;
		padding: 0;
	}
`;

export default function Disclaimer() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('BetBroDisclaimerRead') !== 'true') {
			setOpen(true);
		}
	}, [setOpen]);
	const closeModal = () => setOpen(false);
	const handleClick = () => {
		// set the message as read
		localStorage.setItem('BetBroDisclaimerRead', 'true');
		closeModal();
	};
	// for testing
	// const clearLocal = () => {
	// 	localStorage.setItem('BetBroDisclaimerRead', 'false');
	// 	console.log(localStorage.getItem('BetBroDisclaimerRead'));
	// };
	return (
		<StyledPopup
			open={open}
			closeOnDocumentClick={false}
			closeOnEscape={false}
			modal
		>
			<div style={{ textAlign: 'center' }}>
				<h1 tabIndex='0'>Disclaimer</h1>
				<StyledP>
					<strong>
						<i>BETBRO</i>
					</strong>{' '}
					is a powerful tool that gives you up-to-date statistical and betting
					information on this week's NFL games. While we do our best to provide
					100% accurate information, unknown circumstances may render some
					information incorrect. If you find false information on our site,
					please use the contact form to let us know.{' '}
				</StyledP>
				<StyledP>
					<strong>
						<i>BETBRO</i>
					</strong>{' '}
					is currently in beta testing.{' '}
				</StyledP>
				<StyledP>
					<strong>
						<i>BETBRO</i>
					</strong>{' '}
					is not responsible for any wagers made using the site's provided data.
				</StyledP>
				<StyledP>
					By using{' '}
					<strong>
						<i>BETBRO</i>
					</strong>
					, you agree to follow all local, state, and federal wagering laws, and
					any bets you make are at your own risk.
				</StyledP>
				<button
					onClick={handleClick}
					style={{
						padding: '0.5rem 1rem',
						margin: 'auto auto 1rem',
						cursor: 'pointer',
					}}
				>
					I agree
				</button>
			</div>
		</StyledPopup>
	);
}
