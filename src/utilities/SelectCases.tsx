import {Case} from "../interfaces/case";
import DateFormatter from "../utilities/DateFormatter";

/**
 * Selects a list of cases from a passed in list of cases based on the number of cases the user wants and the passed in date of the very last case they want.
 * @param cases An array of cases that holds information of a case state, date, and new_case.
 * @param date the last date you want the cases to span back to.
 * @param numOfPastDays The amount of days you want cases for.
 * @returns pastCases, a Case[] that holds case information for the number of specified cases.
 */
const selectCases = (cases: Case[], date: string, numOfPastDays: number) => {

    //cases in the past.
    let pastCases: Case[] = [];

    //make an array with the pastCases.
    let casesAdded:number = 0; //ensures that only the last specified amount of cases are obtained. Without this, 
                                //sometimes 15 cases could be obtained when the new case is added for the day when user only wanted 14.

    try {
        cases.forEach(
            (c: Case) => {
                //format date as a number then check which dates to grab
                if (DateFormatter.formatDateNumber(c.submission_date) >= DateFormatter.formatDateNumber(date) && casesAdded < numOfPastDays){
                    let singleCase: Case = {
                        state: c.state,
                        submission_date: c.submission_date,
                        new_case: Number(c.new_case)
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
    
    //sort pastCases in correct order, newest date to oldest date.
    pastCases.sort((a, b) => DateFormatter.formatDateNumber(b.submission_date) - DateFormatter.formatDateNumber(a.submission_date));

    return pastCases;
}

export default selectCases;