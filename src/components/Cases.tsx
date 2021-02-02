import React, { useContext, useEffect, useState } from 'react';
import { stateContext } from '../contexts/stateContext';
import {Case} from "../interfaces/case";
import Chart from './Chart';
import EmptyChart from './EmptyChart';

/**
 * Gets the cases from the provided state from user, displays the table, and calculates the total positive active cases and percentage of positive active cases in the state, based on 
 * state population.
 * 
 * Uses hooks to practice hooks
 */

const Cases: React.FC = () => {

    //get context
    const {state, abbr} = React.useContext(stateContext);
    console.log(abbr)

    //illinois 2019 population. Number will be dynamic in future when user can select state to view.
    const ILpopulation:number = 12670000;

    const populations: {} = {
        "": 1212
    }

    //cases in the past two weeks
    //will most likely use outside of this file.
    let pastCases: Case[] = [];

    //used to monitor active cases
    let totalActiveCases:number = 0;

    //get date from two weeks ago
    let twoWeeksAgo = new Date(Date.now() - 12096e5);

    //get the year month and day of date
    let year = twoWeeksAgo.getFullYear();
    let month = twoWeeksAgo.getMonth() + 1;
    let day = twoWeeksAgo.getDate();


    //convert year month day into string to get proper date then back to a number.
    //also adds 0 infront of month
    let date:number = +(""+year+"0"+month+""+day);
    

    //make cases a state variable
    const [cases, setCases] = useState([])

    //get the cases with async

    useEffect(() => {
        const getCases = async () => {
            if (abbr.length===2){
                const url: string = "https://api.covidtracking.com/v1/states/".concat(abbr.toLowerCase()).concat("/daily.json");

                const response = await fetch(url);

                const data = await response.json();

                setCases(data);
            }
        };

        getCases();

        
    }, [abbr]);

    

    

    //make an array with the pastCases from two weeks.
    let casesAdded:number = 0; //ensures that only the last 14 cases are obtained. Without this, sometimes 15 could be obtained when the new case is added for the day.
    cases.map(
        (c: Case) => {
            if (c.date >= date && casesAdded < 14){
                let singleCase = {
                    state: c.state,
                    date: c.date,
                    positiveIncrease: c.positiveIncrease
                };

                pastCases.push(singleCase);

                //add case positiveIncrease to totalActiceCases.
                totalActiveCases = totalActiveCases + c.positiveIncrease;

                //increase casesAdded
                casesAdded++;


            }
        }
    )

    

    return(
        <div>
            <div>
                {pastCases.length === 0 ? (
                    <div>
                        <h3>Select a state to see the data.</h3>
                        <EmptyChart />
                    </div>
                ) : (
                    <Chart {...pastCases}/>
                )}
            </div>
            <br /><br />
            <div>
                <h5>Total recorded active cases, include propable cases: {totalActiveCases}</h5>
                <br />
                <h5>Percentage of recorded active cases based on Illinois 2019 population, including propable cases: {(totalActiveCases / ILpopulation)*100+"%"}</h5>
                <br />
                <div className="table-responsive">
                    <h2>Past reported live positive cases spanning back two weeks:</h2>
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>State</th>
                                <th>Date</th>
                                <th>New Positive Cases Recorded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastCases.map(
                                (c: Case) => {
                                    return (
                                        <tr key={c.date}>
                                            <td>{c.state}</td>
                                            <td>{c.date}</td>
                                            <td>{c.positiveIncrease}</td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cases;


 
