/**
 * Takes a date in string form as YYYY-MM-DD and converts it to a string form of MM-DD-YYYY.
 * 
 * @param date :string. Date in string form, passed in from user. Must be in Year-Month-Day format. IE: 2021-01-25...
 * 
 * @returns date in MM-DD-YYYY form as string.
 * 
 */

const formatDate = (date: string) => {
    //get the year month day
    let year: string = date.substring(0, 4);
    let month: string = date.substring(5, 7);
    let day: string = date.substring(8, 10);

    //format and return
    return month.concat("-").concat(day).concat("-").concat(year);
}

/**
 * Takes a date in string form as YYYY-MM-DD and converts it to a number form of YYYYMMDD
 * @param date :string. Date in string form, passed in from user. Must be in Year-Month-Day format. IE: 2021-01-25...
 * @returns date in YYYYMMDD form as number.
 */
const formatDateNumber = (date: string) => {
    //get the year month day
    let year: string = date.substring(0, 4);
    let month: string = date.substring(5, 7);
    let day: string = date.substring(8, 10);

    //format and return as number
    return +(year.concat(month).concat(day));
}

export default {formatDate, formatDateNumber};