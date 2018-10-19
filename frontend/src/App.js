import React, {Component} from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {
    Borders,
    HexbinSeries,
    Hint,
    HorizontalGridLines,
    LineMarkSeries,
    RadialChart,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 1200,
            height: 800,
            hoveredNode: null,
            eachHourDataTitle: 'Impressions for each hour of the day(24h):',
            eachDeviceDataTitle: 'Impressions coming from each device:',
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch('/api/impressions/for-each-hour')
            .then(response => response.json())
            .then(json => {
                this.setState({eachHourData: this.PrepareRadialChart(json)});
            });
        fetch('/api/impressions/from-each-device')
            .then(response => response.json())
            .then(json => {
                this.setState({eachDeviceData: this.PrepareHexagonalChart(json)});
                this.setState({eachDeviceDataLinear: this.prepareLinearChart(json)});
            });
    };

    prepareLinearChart(json) {
        let data = [];
        for (const keyName in json) {
            let value = json[keyName];
            data.push({x: parseInt(keyName), y: value});
        }
        return data;
    };

    PrepareHexagonalChart(json) {
        let data = [];
        for (const keyName in json) {
            let value = json[keyName] % 10000;
            data.push({x: parseInt(keyName), y: value, deviceId: keyName, impressions: value});
        }
        return data;
    };

    PrepareRadialChart(json) {
        let data = [];
        for (const keyName in json) {
            let value = json[keyName] % 4000;
            data.push({impressions: value, label: keyName + 'h', subLabel: value + ' Imp.', hour: keyName});
        }
        return data;
    };

    render() {
        const {
            eachHourData, eachDeviceData, eachDeviceDataLinear, eachHourDataTitle,
            eachDeviceDataTitle, width, height, value, hoveredNode
        } = this.state;
        const notLoading = eachHourData && eachDeviceData && eachDeviceDataLinear;

        if (notLoading) {
            return (
                <div>
                    {/* RADIAL */}
                    <h1>{eachHourDataTitle}</h1>
                    <RadialChart
                        innerRadius={240}
                        radius={40}
                        getAngle={d => d.impressions}
                        data={eachHourData}
                        onValueMouseOver={v => {
                            this.setState({value: v})
                        }}
                        onSeriesMouseOut={v => this.setState({value: false})}
                        width={width}
                        height={height}
                        padAngle={0.01}
                        showLabels={true}
                        labelsRadiusMultiplier={7}
                    >
                        {value && <Hint value={value}/>}
                    </RadialChart>

                    {/* HEX SERIES */}
                    <h1>{eachDeviceDataTitle}</h1>
                    <XYPlot
                        xDomain={[0, 10000]}
                        yDomain={[0, 20]}
                        width={width}
                        height={height}
                        getX={d => d.x}
                        getY={d => d.y}
                        onMouseLeave={() => this.setState({hoveredNode: null})}
                    >
                        <HexbinSeries
                            className="hexbin-example"
                            style={{
                                stroke: '#125C77',
                                strokeLinejoin: 'round',
                            }}
                            onValueMouseOver={d => this.setState({hoveredNode: d})}
                            xOffset={0}
                            yOffset={0}
                            colorRange={['orange', 'cyan']}
                            radius={7}
                            data={eachDeviceData}
                            sizeHexagonsWithCount
                        />
                        <Borders style={{all: {fill: '#fff'}}}/>
                        <XAxis/>
                        <YAxis/>
                        {hoveredNode && (
                            <Hint
                                xType="literal"
                                yType="literal"
                                getX={d => d.x}
                                getY={d => d.y}
                                value={{
                                    x: hoveredNode.deviceId,
                                    y: hoveredNode.impressions,
                                }}
                            />
                        )}
                    </XYPlot>

                    {/*LINEMARK SERIES*/}
                    <h1>{eachDeviceDataTitle}</h1>
                    <XYPlot width={width} height={height}><XAxis/><YAxis/>
                        <HorizontalGridLines/>
                        <VerticalGridLines/>
                        <LineMarkSeries data={eachDeviceDataLinear}/>
                    </XYPlot>
                </div>
            );
        } else {
            return (<h1>Fetching data...</h1>);
        }
    }
}

export default App;
