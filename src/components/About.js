import React, { useEffect } from 'react';

export default function About(props) {
	useEffect(() => {
		props.setHeadline('about');
	}, [props]);
	return (
		<div>
			<h1>Consult</h1>
			<p>
				Yeah, we know you know what you’re doing. But everyone has a tough week
				sometimes. Life, Kids, work, or maybe you’re in a slump. The last thing
				you need is to be scrambling on NFL Sundays when there’s money to be
				made! No more jumping from site to site, or waiting for your buddy to
				text you back. Betbro is here for you, designed to give you consistent,
				reliable information for NFL sports betting, all in one place. It’s like
				asking your buddy at the bar, except our stats are never wrong.
			</p>
			<h1>Customize</h1>
			<p>
				Do you always bet on the over/under? Are you looking for a certain stat
				to give you an edge? Are you keeping track of a multi-bet parlay? Betbro
				allows you to customize your page to give you the stats you need in real
				time while you’re betting. There’s no second guessing when you have all
				the information you need in front of you to maximize your decision, and
				your money.
			</p>
			<h1>Cash Out</h1>
			<p>
				Betbro’s vast odds and NFL stat pools will help you make more informed
				sports bets to earn more. We do the work for you. All you have to do is
				put your money where our mouth is, and see the results.
			</p>
			<h1>Continue</h1>
			<p>
				{' '}
				- Bet bro is a tool designed for you. Save your pages and see past
				history, NFL game results and stats to make informed decisions on your
				next bets so you can continue to earn. Only Betbro offers fast, reliable
				information, that’s always for you. Maybe buy us a beer sometime?
			</p>
		</div>
	);
}
