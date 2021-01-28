import React, {Component, Props} from 'react';
import {Line} from 'react-chartjs-2';
import {Case} from "../interfaces/case"

/**
 * Uses class component to practice components
 */

class Chart extends React.Component<Case[], {chartData:any}>{

    constructor(props: any){
        super(props);

        //make the label array with dates. Have to use for loop since this.props.map and forEach are undefined.
        let dateLabels: number[] = [];
        let positiveIncreaseData: number[] = [];
        try{
            for (let i=13; i>=0; i--){
                dateLabels.push(this.props[i].date);
                positiveIncreaseData.push(this.props[i].positiveIncrease);
            }
        }catch(e){
            console.log(e);
        }
        
        //set state labels and data for graph
        this.state={
            chartData:{
                labels: dateLabels,
                datasets: [
                    {
                        label: 'New Positive Cases',
                        data: positiveIncreaseData,
                        backgroundColor: "rgba(255, 15, 15, 0.4)"
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
                        maintainAspectRatio: false,
                        responsive: true
                    }}
                    height={500}
                />

            </div>
        );
    };
}

export default Chart;