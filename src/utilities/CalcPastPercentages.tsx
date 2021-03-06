import {Percent} from "../interfaces/percent";
import {Case} from "../interfaces/case";

/**
 * Calculates the past percentage of active cases in the specified state based on population of the past two weeks.
 * @param pastCases Cases of type Case[] you wish to find past percentages of.
 * @param population The population of the selected state. Used to calc percent.
 * @returns perentages.reverse(), an array of percentages of type Percent[].
 */
const calcPastPercentages = (pastCases: Case[], population: number) => {
    let percentages: Percent[] = [];
    let totalPositiveCases: number = 0;
    //find most current 14 cases from current case and calc percent.
    //do this till at current date.

    try {
        for (let i=0; i<14; i++){ //goes through first two weeks of cases from beginning. newest to oldest.
            for (let j=i; j<14+i; j++){ //starts at current case in the foreach loop
                totalPositiveCases = totalPositiveCases + pastCases[j].new_case;
            }

            percentages.push({
                state: pastCases[i].state,
                submission_date: pastCases[i].submission_date,
                percent: Number(((totalPositiveCases / population)*100).toFixed(2)),
            });

            totalPositiveCases = 0;
        }
    } catch (error) {
        //do nothing. will give error when user has not selected a state yet. This is natural.
    }
    
        


    return percentages.reverse();
}

export default calcPastPercentages;