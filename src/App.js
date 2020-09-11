import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/Navbar';
import Headline from './components/Headline';
import Home from './components/Home';
import Breakdowns from './components/Breakdowns';
import About from './components/About';
import MyBetBro from './components/MyBetBro';
import NotFound from './components/NotFound';
import { fillDatabase } from './tools/database';

function App() {
	const [headline, setHeadline] = useState(window.location.pathname);
	useEffect(() => {
		setHeadline(window.location.pathname);
	}, []);
	return (
		<BrowserRouter>
			<div className='App'>
				<NavBar />
				<Headline headline={headline} />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/breakdowns' component={Breakdowns} />
					<Route exact path='/mybetbro' component={MyBetBro} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
