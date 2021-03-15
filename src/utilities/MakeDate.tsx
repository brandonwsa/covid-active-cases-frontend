/**
 * Takes a Date type and formats the date in a YYYY-MM-DDT00:00:00.000 format as a string.
 * @param date the date to format in the YYYY-MM-DDT00:00:00.000 format as a string.
 * @returns newDate string as YYYY-MM-DDT00:00:00.000.
 */
const makeDate = (date: Date) => {

    //get the year month and day of date
    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1; //starts at 0, so plus 1 gets correct calendar date.
    let day: number = date.getDate();
    let newDate: string = "";

    //convert year month day into string to get proper date then concat T00:00:00.000.
    //also adds 0 infront of month if less than 10, and some with day.
    if (month < 10){
        if (day < 10){
            newDate = ""+year+"-0"+month+"-0"+day+"T00:00:00.000";
        }
        else {
            newDate = ""+year+"-0"+month+"-"+day+"T00:00:00.000";
        }
    }
    else if (day < 10){
        newDate = ""+year+"-"+month+"-0"+day+"T00:00:00.000";
    }
    else {
        newDate = ""+year+"-"+month+"-"+day+"T00:00:00.000";
    }
    

    return newDate;

}

export default makeDate;