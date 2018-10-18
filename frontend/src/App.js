import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis,
    LineMarkSeries} from 'react-vis';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 1200,
            height: 800,
        };
    }



    componentDidMount() {
        this.getData();
        //setInterval(this.getData, 6500);
    }

    getData = () => {
        fetch('/api/impressions/for-each-hour')
            .then(response => response.json())
            .then(json => {
                this.setState({eachHourData: this.prepareChartData(json)});
            });
        fetch('/api/impressions/from-each-device')
            .then(response => response.json())
            .then(json => {
                this.setState({eachDeviceData: this.prepareChartData(json)});
            });
    };

    prepareChartData(json) {
        let data = [];
        for (const keyName in json) {
            let value = json[keyName];
            data.push({x: parseInt(keyName), y: value});
        }
        return data;
    };

    render() {

        const { eachHourData, eachDeviceData } = this.state;

        const data = eachHourData;

        if (!data) {
            return ( <div>
                <p>Loading ...</p>
                    <p>{data}</p>
                </div>
            );
        }else {
            return (

                <XYPlot width={this.state.width} height={this.state.height}><XAxis/><YAxis/>
                    <HorizontalGridLines/>
                    <VerticalGridLines/>
                    <LineMarkSeries data={data}/>
                </XYPlot>
            );
        }
    }
}

export default App;
