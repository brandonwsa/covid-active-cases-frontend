import react, { useEffect, useState } from 'react';
import {Case} from "../interfaces/case"

const Cases = () => {
    //illinois 2019 population
    const ILpopulation:number = 12670000;

    //cases in the past two weeks
    //will most likely use outside of this file.
    let pastCases: { state:string, date:number, positiveIncrease:number }[] = [];

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
    


    const [cases, setCases] = useState([])

    //get the cases with async
    useEffect(() => {
        const getCases = async () => {
            const url: string = "https://api.covidtracking.com/v1/states/il/daily.json";

            const response = await fetch(url);

            const data = await response.json();

            setCases(data);

            

        };

        getCases();

    }, []);

    //make an array with the pastCases from two weeks.
    cases.map(
        (c: Case) => {
            if (c.date >= date){
                let singleCase = {
                    state: c.state,
                    date: c.date,
                    positiveIncrease: c.positiveIncrease
                };

                pastCases.push(singleCase);

                //add case positiveIncrease to totalActiceCases.
                totalActiveCases = totalActiveCases + c.positiveIncrease;

            }
        }
    )
    

    return(
        <div>
            <h2>Total recorded active cases, include propable cases: {totalActiveCases}</h2>
            <h2>Percentage of recorded active cases based on Illinois 2019 population, including propable cases: {(totalActiveCases / ILpopulation)*100+"%"}</h2>
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
    );
};

export default Cases;