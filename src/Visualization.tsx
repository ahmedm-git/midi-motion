import * as React from 'react';
// import Soundfont from 'soundfont-player';

export class Visualization extends React.Component {
	componentDidMount() {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d');
		context?.moveTo(0, 0);
		context?.lineTo(100, 100);
		context?.stroke();
	}

	onClick() {
		console.log(JSON.parse(window.localStorage.getItem('data')!));
		// Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(piano => {
		// });
	}

	render() {
		return (
			<div>
				<canvas id='canvas' width={document.body.clientWidth} height={document.body.clientHeight}></canvas>
				<button onClick={this.onClick}>test</button>
			</div>
		)
	}
}
