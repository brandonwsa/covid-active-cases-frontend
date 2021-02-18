/**
 * Takes a Date type and formats the date in a YYYYMMDD format as a number.
 * @param date the date to format in the YYYYMMDD format as a number.
 * @returns newDate number as YYYYMMDD.
 */
const makeDate = (date: Date) => {

    //get the year month and day of date
    let year = date.getFullYear();
    let month = date.getMonth() + 1; //starts at 0, so plus 1 gets correct calendar date.
    let day = date.getDate();


    //convert year month day into string to get proper date then back to a number.
    //also adds 0 infront of month
    let newDate:number = +(""+year+"0"+month+""+day);

    return newDate;

}

export default makeDate;