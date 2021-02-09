import React from 'react';
import {Line} from 'react-chartjs-2';

/**
 * Creates an empty chart to display before user selects a state.
 */

class EmptyChart extends React.Component<{}, {chartData:{}, stateAbbr:string}>{

    constructor(){
        super({});

        //make empty dateLabels and positiveIncreaseData
        let dateLabels: string[] = [];
        let positiveIncreaseData: number[] = [];
        let state: string = "";
        for (let i=13; i>=0; i--){
            dateLabels.push("Select State");
            positiveIncreaseData.push(i);
        }

        //set state labels and data for graph
        this.state={
            chartData:{
                labels: ["month-day-year", "month-day-year", "month-day-year"],
                datasets: [
                    {
                        label: 'New Positive Cases',
                        data: 0,
                        backgroundColor: "rgba(255, 15, 15, 0.4)"
                    }
                ]
                
            },
            stateAbbr: state //use if needed
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

export default EmptyChart;