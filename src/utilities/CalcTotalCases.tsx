import {Case} from "../interfaces/case"

/**
 * Calculates the total amount of cases that are in an array of Cases of type Case[].
 * @param pastCases Cases you wish to get the total amount of cases for.
 * @returns total cases as a number.
 */
const calcTotalCases = (pastCases: Case[]) => {

    let totalCases: number = 0;

    try {
        pastCases.forEach(
            (c: Case) => {
                totalCases = totalCases + c.new_case;
            }
        );
    } catch (error) {
        console.log("ERROR: "+error+" Custom Message: No cases to calc total cases for.");
    }
    

    return totalCases;
}

export default calcTotalCases;