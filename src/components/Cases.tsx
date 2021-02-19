import React, {useEffect, useState, useMemo} from 'react';
import { stateContext } from '../contexts/stateContext';
import {Case} from "../interfaces/case";
import {Percent} from "../interfaces/percent";
import Chart from './Chart';
import PercentChart from './PercentChart';
import EmptyChart from './EmptyChart';
import formatDate from "../utilities/DateFormatter";
import formatNumber from "../utilities/NumberFormatter";
import makeDate from "../utilities/MakeDate";
import selectCases from "../utilities/SelectCases";
import calcTotalCases from "../utilities/CalcTotalCases";
import calcPastPercentages from '../utilities/CalcPastPercentages';


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

    let population: number = populationsHash[state]; //get the population of the state

    //make cases a state variable
    const [cases, setCases] = useState([])

    //get the cases with async
    useEffect(() => {
        const getCases = async () => {
            if (abbr.length===2){ //check to make sure a proper state is selected.
                const url: string = "https://api.covidtracking.com/v1/states/".concat(abbr.toLowerCase()).concat("/daily.json");

                const response = await fetch(url);

                const data = await response.json();

                setCases(data);
            }
        };

        getCases();

        
    }, [abbr]); //will re get data once abbr is changed. IE: user selects a different state.


    const [currentDate, setCurrentDate] = useState("MM-DD-YYYY");

    const [pastPercentages, setPastPercentages] = useState<Percent[]>([{
        state: "",
        date: 0,
        percent: 0,
    }]);

    const [pastTwoWeeksCases, setPastTwoWeeksCases] = useState<Case[]>([{
        state: "",
        date: 0,
        positiveIncrease: 0,
    }]);

    const [totalActiveCases, setTotalActiveCases] = useState(0);

    //Uses memo to only get cases when state is changed by user. This avoids getting this data with every render.
    useMemo(() => {

        //get date from two weeks ago from the last case two weeks ago, including that last case and the past cases in the past four weeks
        let fourWeeksAgo: Date = new Date((Date.now() - 12096e5) - 11232e5); //will be used to calc past two weeks active cases percentage.

        let fourWeeksAgoDate: number = makeDate(fourWeeksAgo); //put date in correct order and format as a number.

        let pastFourWeeksCases: Case[] = selectCases(cases, fourWeeksAgoDate, 28); //get the cases in the past four weeks.

        let pastPercentagesOfActiveCases: Percent[] = calcPastPercentages(pastFourWeeksCases, population); //get the past active cases percentage based of state population spanning back two weeks.
                                                                                                           //this list of percents are ordered oldest to newest.

        if (pastFourWeeksCases.length > 0){ //only get the current date when the array is filled. Avoids invalid index error.
            setCurrentDate(formatDate(pastFourWeeksCases[0].date)); //get most recent date of data.
        }
        

        
        //get date from two weeks ago, the past cases, and total active cases in the past two weeks.
        let twoWeeksAgo: Date = new Date(Date.now() - 12096e5);

        let twoWeeksAgoDate: number = makeDate(twoWeeksAgo); //put date in correct order and format as a number.
        
        let pastTwoWeeksCases: Case[] = selectCases(pastFourWeeksCases, twoWeeksAgoDate, 14);   //get the cases in the past two weeks
                                                                                                //will most likely use outside of this file.

        let totalActiveCases:number = calcTotalCases(pastTwoWeeksCases);    //get total active cases from past two weeks. 
                                                                            //used to monitor active cases.

        setPastPercentages(pastPercentagesOfActiveCases);
        setPastTwoWeeksCases(pastTwoWeeksCases);
        setTotalActiveCases(totalActiveCases);
    }, [cases, population]);
    


    //calc past percentages
    

    return(
        <div>
            <div>
                {pastTwoWeeksCases.length === 0 ? (
                    <div>
                        <h3>Select a state to see the data.</h3>
                        <EmptyChart />
                        <br />
                        <PercentChart percents = {[]}/>
                    </div>
                ) : (
                    <div>
                        <Chart {...pastTwoWeeksCases}/>
                        <br />
                        <PercentChart percents = {pastPercentages}/>
                    </div>
                )}
            </div>
            <br /><br />
            <div>
                
                
                {population === 0 ? (
                    <div>
                        <h4>Select a state to see:</h4>
                        <h5>
                            <ul>
                                <li>Total recorded active cases in the state.</li>
                                <li>Percentage of recorded active cases in the state based on the state's 2019 population.</li>
                            </ul>
                        </h5>
                    </div>
                ) : (
                    <div>
                        <p>These numbers include propable cases.</p>
                        <h5>Total recorded active cases as of {currentDate} in {state}: {formatNumber(totalActiveCases)}</h5>
                        <h5>Percentage of recorded active cases as of {currentDate} in {state} based on {state}'s 2019 population of {formatNumber(population)} people: {((totalActiveCases / population)*100).toFixed(2)+"%"}</h5>  
                    </div>
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
                            {pastTwoWeeksCases.map(
                                (c: Case) => {
                                    return (
                                        <tr key={c.date}>
                                            <td>{c.state}</td>
                                            <td>{formatDate(c.date)}</td>
                                            <td>{formatNumber(c.positiveIncrease)}</td>
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


 
