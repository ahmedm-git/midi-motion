import * as React from 'react';
import Button from '@mui/material/Button';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: File
        };
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        this.setState({ file: e.target.files[0] });
    }

    onUpload = async () => {
        const data = await this.state.file.text();
        const base64Data = btoa(unescape(encodeURIComponent(data)));
        console.log(data);
        fetch('/midi', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': base64Data.length.toString()
            },
            body: base64Data
        }).then(res => res.json())
        .then(res => {
            window.location.replace(`/visualization/${res.id}`);
        });
    }

    public render() {
        var buttonStyle = {
            margin: 25
        };

        return (
            <div style={{margin: 'auto'}}>
                <input
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    type='file'
                    onChange={this.onChange}
                />
                <label htmlFor='contained-button-file'>
                    <Button style={buttonStyle} variant='contained' color='primary' component='span'>
                        Choose a MIDI 
                    </Button>
                </label>
                <Button style={buttonStyle} variant='contained' color='primary' component='span' onClick={this.onUpload}>
                    Upload
                </Button>
            </div>
        );
    }
}

export default App;