import React, {Component} from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {
    HexbinSeries,
    Hint,
    HorizontalGridLines,
    LineMarkSeries,
    RadialChart,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,Borders
} from 'react-vis';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 800,
            height: 600,
            value: {angle: 2, label: "tests"},
            hoveredNode: null,
            radius: 5,
            offset: 0,
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
                debugger
                this.setState({eachHourData: this.PrepareRadialChart(json)});
            });
        fetch('/api/impressions/from-each-device')
            .then(response => response.json())
            .then(json => {
                this.setState({eachDeviceData: this.PrepareHexagonalChart(json)});
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

    PrepareRadialChart(json) {
        let data = [];
        for (const keyName in json) {
            let value = json[keyName];
            data.push({angle: value, label: keyName, subLabel: parseInt(keyName), value: value});
        }
        return data;
    };

    PrepareHexagonalChart(json) {
        let data = [];
        for (const keyName in json) {
            let value = json[keyName];
            data.push({x: value, y: parseInt(keyName), deviceId: keyName, impressions: value,});
        }
        return data;
    };

    render() {
        const {eachHourData, eachDeviceData, width, height, value, radius, hoveredNode, offset} = this.state;
        debugger;

        if (eachHourData) {

            return (
                <div>
                    <RadialChart
                        /*className={'donut-chart-example'}*/
                        innerRadius={200}
                        radius={40}
                        getAngle={d => d.angle}
                        data={eachHourData}
                        onValueMouseOver={v => {
                            this.setState({value: v})
                        }}
                        onSeriesMouseOut={v => this.setState({value: false})}
                        width={width}
                        height={height}
                        padAngle={0.01}
                        showLabels={true}
                        //labelsStyle={}
                        labelsRadiusMultiplier={6}
                        labelsAboveChildren={false}
                    >
                        {value && <Hint value={value}/>}
                    </RadialChart>

{/*LineMarkSeries*/}
                 {/*   <XYPlot width={width} height={height}><XAxis/><YAxis/>
                        <HorizontalGridLines/>
                        <VerticalGridLines/>
                        <LineMarkSeries data={eachHourData}/>
                    </XYPlot>*/}
{/* HEXBIN */}
                    <XYPlot
                        xDomain={[0, 20]}
                        yDomain={[0, 10000]}
                        width={width}
                        height={height}
                        getX={d => d.x}
                        getY={d => d.y}
                        onMouseLeave={() => this.setState({hoveredNode: null})}
                    >
                        <HexbinSeries
                            animation
                            className="hexbin-example"
                            style={{
                                stroke: '#125C77',
                                strokeLinejoin: 'round'
                            }}
                            onValueMouseOver={d => this.setState({hoveredNode: d})}
                            xOffset={offset}
                            yOffset={offset}
                            colorRange={['orange', 'cyan']}
                            radius={radius}
                            data={eachDeviceData}
                            sizeHexagonsWithCount
                        />
                        <Borders style={{all: {fill: '#fff'}}} />
                        <XAxis />
                        <YAxis />
                        {hoveredNode && (
                            <Hint
                                xType="literal"
                                yType="literal"
                                getX={d => d.x}
                                getY={d => d.y}
                                value={{
                                    x: hoveredNode.x,
                                    y: hoveredNode.y,
                                    deviceId: hoveredNode.deviceId,
                                    impressions: hoveredNode.impressions
                                }}
                            />
                        )}
                    </XYPlot>


                </div>
            );
        } else {
            return (<p>Loading...</p>);
        }

        /*      return (
                  <XYPlot width={width} height={height}><XAxis/><YAxis/>
                      <HorizontalGridLines/>
                      <VerticalGridLines/>
                      <LineMarkSeries data={data}/>
                  </XYPlot>
              );*/

        /*
        return (
            <XYPlot width={width} height={height} stackBy="x">
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis/>
                <YAxis/>
                <BarSeries data={data}/>
                {/!*<BarSeries data={data} />*!/}
            </XYPlot>
        );*/

    }
}

export default App;
