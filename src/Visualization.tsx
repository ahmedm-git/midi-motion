import * as React from 'react';
import Soundfont from 'soundfont-player';

export class Visualization extends React.Component {
	visualizationData: { note: number, time: number, duration: number, track: number }[];
	t0: number;
	private canvas!: HTMLCanvasElement;

	constructor(props: any) {
		super(props);
		this.visualizationData = [];
		this.t0 = 0;
	}
	
	componentDidMount() {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
	}

	onClick = () => {
		const midiData = JSON.parse(window.localStorage.getItem('data')!);
		let trackNumber = 0;
		Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(piano => {
			midiData.tracks.forEach((track: { notes: { midi: number, name: string, time: number, duration: number, velocity: number }[]; }) => {
				track.notes.forEach((note => {
					piano.play(note.name, note.time, { duration: note.duration });
					this.visualizationData.push({ note: note.midi, time: note.time, duration: note.duration, track: trackNumber });
				}));
				trackNumber++;
			});
		});

		this.t0 = Date.now();
		setInterval(this.tick, 50);
	}

	tick = () => {
		const t = (Date.now() - this.t0) / 1000;
		const context = this.canvas.getContext('2d');
		if (!context) throw new Error('Missing 2d context');

		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.visualizationData.forEach(note => {
			const height = this.canvas.height / 88;
			const width = note.duration * 100;
			context.fillStyle = note.track ? "magenta" : "cyan";
			context?.fillRect((note.time - t) * 100, height * (note.note - 21), width, height);
		});
	}

	render() {
		return (
			<div>
				<canvas id='canvas' width={document.body.clientWidth} height={document.body.clientHeight}></canvas>
				<button onClick={this.onClick}>Play</button>
			</div>
		)
	}
}
