/**
 * Takes a date in number YYYYMMDD and converts it to a string form of MM-DD-YYYY.
 * 
 * @param date :number. Date in number form, passed in from user. Must be in YearMonthDay format. IE: 20210125
 * 
 * @returns date in MM-DD-YYYY form as string.
 * 
 */

const formatDate = (date: number) => {
    //get the year month day
    let dateStr: string = date.toString();
    let year: string = dateStr.substring(0, 4);
    let month: string = dateStr.substring(4, 6);
    let day: string = dateStr.substring(6, 8);

    //format and return
    return month.concat("-").concat(day).concat("-").concat(year);
}

export default formatDate;