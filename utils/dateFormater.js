const addDateSuffix = date => {
    let dateString = date.toString();

    const lastCharacter = dateString.charAt(dateString.length - 1);

    //1st
    if(lastCharacter === '1' && dateString != '11'){
        dateString = `${dateString}st`;
    //2nd
    }else if(lastCharacter === '2' && dateString != '12'){
        dateString = `${dateString}nd`;
    //3rd
    }else if(lastCharacter === '3' && dateString != '13'){
        dateString = `${dateString}rd`;
    //4th, 5th, 6th and etc
    }else{
        dateString = `${dateString}th`;
    }
        
    return dateString   
}

module.exports = (
    timestamp,
    {monthLength = 'short', dateSuffix = true} = {}
) => {
    let months; 

    if(monthLength === 'short'){
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
          };
    }else{
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
          };
    }

    const dateObject = new Date(timestamp);
    const formattedMonth = months[dateObject.getMonth()];

    let dayOfMonth;

    if(dateSuffix){
        dayOfMonth = addDateSuffix(dateObject.getDate());
    }else{
        dayOfMonth = dateObject.getDate();
    }

    const year = dateObject.getFullYear();

    let hour;

    if(dateObject.getHours > 12){
        hour = Math.floor(dateObject.getHours() / 2);
    }else{
        hour = dateObject.getHours();
    }

    if(hour === 0){
        hour = 12;
    }

    const minutes = dateObject.getMinutes();

    let periodOfDay; 

    if(dateObject.getHours() >= 12){
        periodOfDay = 'pm';
    }else{
        periodOfDay = 'am'
    }

    const formattedTime = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}: ${minutes} ${periodOfDay}`

    return formattedTime;
}