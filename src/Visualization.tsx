import * as React from 'react';

export class Visualization extends React.Component {
	componentDidMount() {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d');
		context?.moveTo(0, 0);
		context?.lineTo(100, 100);
		context?.stroke();
	}

	render() {
		return (
			<div>
				<canvas id='canvas' width={document.body.clientWidth} height={document.body.clientHeight}></canvas>
			</div>
		)
	}
}
