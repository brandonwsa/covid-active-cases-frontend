import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component<{}, {chartData:any}>{

    constructor(props:any){
        super(props);
        this.state={
            chartData:{
                labels: [20210124, 20210125, 20210126],
                datasets: [
                    {
                        label: 'New Positive Cases',
                        data:[
                            3000,
                            4000,
                            5000
                        ]
                    }
                ]
            }
        }
    }

    render(){
        return(
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />

            </div>
        );
    };
}

export default Chart;