import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Visualization } from './Visualization';

function renderApp() {
	return (
		<React.StrictMode>
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
