/**
 * Formats a number to include commas.
 * 
 * @param num Number to format. Supports numbers from 0-999,999,999
 * 
 * @returns number in string form with commas. IE: 1000 => 1,000
 * 
 */

const formatNumber = (num: number) => {
    let formattedNum: string = "";
    let numStr: string = num.toString();


    // 1,000 - 999,999 formatter.
    if (numStr.length > 3 && numStr.length < 7){
        formattedNum = numStr.substring(0, numStr.length-3).concat(",").concat(numStr.substring(numStr.length-3, numStr.length));
        return formattedNum;
    }
    // 1,000,000 - 999,999,999
    else if (numStr.length >= 7 && numStr.length < 10){
        formattedNum = numStr.substring(0, numStr.length-6).concat(",").concat(numStr.substring(numStr.length-6, numStr.length-3))
        .concat(",").concat(numStr.substring(numStr.length-3, numStr.length));
        return formattedNum;
    }
    else {
        return numStr;
    }

    
    

    

    
}

export default formatNumber;