import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {};

    componentDidMount() {
        setInterval(this.getData, 3500);
    }

    getData = () => {
        fetch('/api/impressions/for-each-hour')
            .then(response => response.text())
            .then(message => {
                this.setState({eachHourData: message});
            });
        fetch('/api/impressions/from-each-device')
            .then(response => response.text())
            .then(message => {
                this.setState({eachDeviceData: message});
            });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <p className="App-title">{this.state.eachHourData}</p>
                    <h1>TEST</h1>
                    <p className="App-title">{this.state.eachDeviceData}</p>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
