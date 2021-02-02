import React, {useEffect, useState } from 'react';
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

    //illinois 2019 population.
    //populations hash to store populations for each state
    const populationsHash: Record<string, number> = {
        "California": 39512223,
        "Texas": 28995881,
        "Florida": 21477737,
        "New York": 19453561,
        "Illinois": 12671821,
        "Pennsylvania": 12801989,
        "Ohio": 11689100,
        "Georgia": 10617423,
        "North Carolina": 10488084,
        "Michigan": 9986857,
        "New Jersey": 8882190,
        "Virginia": 8535519,
        "Washington": 7614893,
        "Arizona": 7278717,
        "Massachusetts": 6949503,
        "Tennessee": 6833174,
        "Indiana": 6732219,
        "Missouri": 6137428,
        "Maryland": 6045680,
        "Wisconsin": 5822434,
        "Colorado": 5758736,
        "Minnesota": 5639632,
        "South Carolina": 5148714,
        "Alabama": 4903185,
        "Louisiana": 4648794,
        "Kentucky": 4467673,
        "Oregon": 4217737,
        "Oklahoma": 3956971,
        "Connecticut": 3565287,
        "Utah": 3205958,
        "Iowa": 3155070,
        "Nevada": 3080156,
        "Arkansas": 3017825,
        "Mississippi": 2976149,
        "Kansas": 2913314,
        "New Mexico": 2096829,
        "Nebraska": 1934408,
        "West Virginia": 1792147,
        "Idaho": 1787065,
        "Hawaii": 1415872,
        "New Hampshire": 1359711,
        "Maine": 1344212,
        "Montana": 1068778,
        "Rhode Island": 1059361,
        "Delaware": 973764,
        "South Dakota": 884659,
        "North Dakota": 762062,
        "Alaska": 731545,
        "District of Columbia": 705749,
        "Vermont": 623989,
        "Wyoming": 578759,
        "": 0, //if no state selected
    }

    //get the population of the state
    let population: number = populationsHash[state];

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
                {population === 0 ? (
                    <h5>Percentage of recorded active cases, including propable cases, based on ____'s 2019 population of ____ people: {(totalActiveCases / population)*100+"%"}</h5>
                ) : (
                    <h5>Percentage of recorded active cases, including propable cases, based on {state}'s 2019 population of {population} people: {(totalActiveCases / population)*100+"%"}</h5>  
                )}
                <p>Population data is from: https://www.infoplease.com/us/states/state-population-by-rank</p>
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


 
