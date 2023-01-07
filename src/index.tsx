import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Visualization } from './Visualization';
import { Typography } from '@mui/material';

function renderApp() {
	return (
		<React.StrictMode>
			<center><Typography variant="h1">MIDI Visualization</Typography></center>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/visualization/:id' element={<Visualization />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	)
}

ReactDOM.render(renderApp(), document.getElementById('root'));
