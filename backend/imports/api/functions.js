/*
 * Parse a date object for the date in MMDDYY form and for the time in military form
 * Returns an array with the first element being the date and the second is the time.
 */
export function getDateTime (dateObject) {
    let aDate = dateObject;
    let month = String(aDate.getMonth() + 1) 
    let day = String(aDate.getDate())
    if (day.length === 1){
        day = "0" + day
    }
    let year = String(aDate.getFullYear()).slice(-2)
    let date = month + day + year;
    let time = (aDate.toTimeString()).slice(0,5);
    return [date, time];
  }