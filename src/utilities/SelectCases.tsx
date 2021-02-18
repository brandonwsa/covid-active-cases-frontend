import {Case} from "../interfaces/case";

/**
 * Selects a list of cases from a passed in list of cases based on the number of cases the user wants and the passed in date of the very last case they want.
 * @param cases An array of cases that holds information of a case state, date, and positiveincrease.
 * @param date the last date you want the cases to span back to.
 * @param numOfPastDays The amount of days you want cases for.
 * @returns pastCases, a Case[] that holds case information for the number of specified cases.
 */
const selectCases = (cases: Case[], date: number, numOfPastDays: number) => {

    //cases in the past.
    let pastCases: Case[] = [];

    //make an array with the pastCases.
    let casesAdded:number = 0; //ensures that only the last specified amount of cases are obtained. Without this, 
                                //sometimes 15 cases could be obtained when the new case is added for the day when user only wanted 14.

    try {
        cases.forEach(
            (c: Case) => {
                if (c.date >= date && casesAdded < numOfPastDays){
                    let singleCase = {
                        state: c.state,
                        date: c.date,
                        positiveIncrease: c.positiveIncrease
                    };

                    pastCases.push(singleCase);

                    //increase casesAdded
                    casesAdded++;
                }
            }
        )
    } catch (error) {
        console.log("ERROR: "+error+" Custom Message: No cases to get previous cases from.");
    }
    

    return pastCases;
}

export default selectCases;