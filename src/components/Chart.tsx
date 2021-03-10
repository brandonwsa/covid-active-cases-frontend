import React from 'react';
import {Line} from 'react-chartjs-2';
import {Case} from "../interfaces/case";
import DateFormatter from "../utilities/DateFormatter";

/**
 * A chart that displays the states positive increase in numbers from the past two weeks.
 * Takes a Case[] and puts the data in a Line Chart.
 * 
 * Uses class component to practice components
 * 
 * @props Cases array of type Case[]
 */

class Chart extends React.Component<Case[], {chartData:{}, stateAbbr:string}>{

    constructor(props: Case[], chartLabel: string){
        super(props);

        //make the label array with dates. Have to use for loop since this.props.map and forEach are undefined.
        let dateLabels: string[] = [];
        let new_caseData: number[] = [];
        let state: string = ""; //the state abbreviation. IE: 'il'
        try{
            for (let i=0; i<14; i++){
                //break out of loop if props[i] is undefined.
                //prevents undefined error from occuring.
                if (this.props[i] === undefined){
                    break;
                }
                else {
                    dateLabels.push(DateFormatter.formatDate(this.props[i].submission_date));
                    new_caseData.push(this.props[i].new_case); 
                } 
            }
            //get the state abbreviation
            if (this.props[0] !== undefined){
                state = this.props[0].state
            }

            dateLabels.reverse();
            new_caseData.reverse();
            
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
                        data: new_caseData,
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
            let new_caseData: number[] = [];
            let state: string = ""; //the state abbreviation. IE: 'il'
            try{
                for (let i=0; i<14; i++){
                    //break out of loop if props[i] is undefined.
                    //prevents undefined error from occuring.
                    if (this.props[i] === undefined){
                        break;
                    }
                    else {
                        dateLabels.push(DateFormatter.formatDate(this.props[i].submission_date));
                        new_caseData.push(this.props[i].new_case); 
                    } 
                }
                //get the state abbreviation
                if (this.props[0] !== undefined){
                    state = this.props[0].state
                }

                dateLabels.reverse();
                new_caseData.reverse();
                
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
                            data: new_caseData,
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
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                    height={500}
                />

            </div>
        );
    };
}

export default Chart;