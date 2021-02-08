import React from 'react';
import {Line} from 'react-chartjs-2';
import {Case} from "../interfaces/case"
import formatDate from "../utilities/DateFormatter"

/**
 * A chart that displays the states positive increase in numbers from the past two weeks
 * 
 * Uses class component to practice components
 */

class Chart extends React.Component<Case[], {chartData:{}, stateAbbr:string}>{

    constructor(props: Case[]){
        super(props);

        //make the label array with dates. Have to use for loop since this.props.map and forEach are undefined.
        let dateLabels: string[] = [];
        let positiveIncreaseData: number[] = [];
        let state: string = ""; //the state abbreviation. IE: 'il'
        try{
            for (let i=13; i>=0; i--){
                dateLabels.push(formatDate(this.props[i].date));
                positiveIncreaseData.push(this.props[i].positiveIncrease);
            }
            //get the state abbreviation
            state = this.props[0].state
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
                
            },
            stateAbbr: state //use if needed
        }
    }


    /**
     * Override method to update the chart when new props are passed into component.
     * Gets the new data and sets the state with the data, will re-rendering to the component.
     * @param prevProps previous props from prev chart
     */
    componentDidUpdate(prevProps: Case[]){
        //check if user changed to look at a different state's data.
        if (this.props[0].state !== prevProps[0].state){
            //make the label array with dates. Have to use for loop since this.props.map and forEach are undefined.
            let dateLabels: string[] = [];
            let positiveIncreaseData: number[] = [];
            let state: string = ""; //the state abbreviation. IE: 'il'
            try{
                for (let i=13; i>=0; i--){
                    dateLabels.push(formatDate(this.props[i].date));
                    positiveIncreaseData.push(this.props[i].positiveIncrease);
                }
                //get the state abbreviation
                state = this.props[0].state
            }catch(e){
                console.log(e);
            }

            //set new labels and data for graph
            let newData: {} ={
                chartData:{
                    labels: dateLabels,
                    datasets: [
                        {
                            label: 'New Positive Cases',
                            data: positiveIncreaseData,
                            backgroundColor: "rgba(255, 15, 15, 0.4)"
                        }
                    ]
                    
                },
                stateAbbr: state //use if needed
            }

            this.setState(newData)
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