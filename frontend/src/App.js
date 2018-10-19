import React, {Component} from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {Borders, HexbinSeries, Hint, RadialChart, XAxis, XYPlot, YAxis, HorizontalGridLines,
VerticalGridLines,
LineMarkSeries } from 'react-vis';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 1200,
            height: 800,
            hoveredNode: null,
        };
    }

    componentDidMount() {
        this.getData();
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
                this.setState({eachDeviceData2: this.prepareLinearChart(json)});
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
            data.push({x:parseInt(keyName) , y: value, deviceId: keyName, impressions: value,});
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
        const {eachHourData, eachDeviceData, eachDeviceData2, width, height, value, radius, hoveredNode, offset} = this.state;
        debugger;

        if (eachHourData) {

            return (
                <div>


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
                            animation
                            padding={28}
                            className="hexbin-example"
                            style={{
                                stroke: '#125C77',
                                strokeLinejoin: 'round',
                                padding: '20px'
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
                                    x: hoveredNode.x,
                                    y: hoveredNode.y,
                                }}
                            />
                        )}
                    </XYPlot>

                    {/* RADIAL */}
                    <RadialChart
                        /*className={'donut-chart-example'}*/
                        innerRadius={200}
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
                        //labelsStyle={}
                        labelsRadiusMultiplier={6}
                        labelsAboveChildren={false}
                    >
                        {value && <Hint value={value}/>}
                    </RadialChart>

                    {/*          LineMarkSeries*/}
                    <XYPlot width={width} height={height}><XAxis/><YAxis/>
                        <HorizontalGridLines/>
                        <VerticalGridLines/>
                        <LineMarkSeries data={eachDeviceData2}/>
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
