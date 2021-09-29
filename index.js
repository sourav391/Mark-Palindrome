console.log('connected!')

const bDate = document.querySelector("#bDate")
const checkPalindromeBtn = document.querySelector(".checkPalindrome")
const outputMsg = document.querySelector('.outputMsg')

function reverseString (str) {
    let strChar = str.split('')
    let reversedChar = strChar.reverse()
    let reversedStr = reversedChar.join('');
    return reversedStr
}

function checkPalindrome (str) {
    let reverseStr = reverseString(str)
    if (str === reverseStr){
        return true
    }
    return false
}

function dateAsString(date){
    let dateInStr = {day: '', month: '', year: ''};
  
    if(date.day < 10){
      dateInStr.day = '0' + date.day;
     }
    else {
      dateInStr.day = date.day.toString();
    }
    
    if(date.month < 10){
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
    
    dateInStr.year = date.year.toString();
    return dateInStr;
}
  
function dateInAllFormats(date) {
    let dateStr = dateAsString(date);

    let ddmmyyyy = dateStr.day + dateStr.month+ dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllFormats(date) {
    let listofPanlindrome = dateInAllFormats(date)

    let isPalindrome = false;
    for (let i=0; i < listofPanlindrome.length; i++){
        if(checkPalindrome(listofPanlindrome[i])){
            isPalindrome = true
            break
        }
    }
    return isPalindrome
}

function checkLeapYear(year){
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0){
        return true
    }
    return false

}

function getNextDate(date) {
      let day = date.day + 1;
      let month = date.month 
      let year = date.year

      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30]

      if (month === 2){
        if (checkLeapYear(year)){
            if (day > 29){
                day = 1
                month++
            }
        }
        else {
            if (day > 28) {
                day = 1
                month++
            }
        }
      }
      else {
        if (day > daysInMonth[month - 1]) {
            day = 1
            month++
        }
      }

      if (month > 12) {
          month = 1
          year++
      }

      return {
          day : day,
          month : month,
          year : year
      }
}

function nextPalindromeDate(date) {
    let count = 0
    let nextDate = getNextDate(date)

    while(true){
        count++
        let isPalindrome = checkPalindromeForAllFormats(nextDate)
        if (isPalindrome){
            break
        }
        nextDate = getNextDate(nextDate)
    }
    return [count, nextDate]
}

function clickHandler(){
    let bDayStr = bDate.value
    if(bDayStr !== '') {
        let dateList = bDayStr.split('-')
        let dateObj = {
            day : Number(dateList[2]),
            month : Number(dateList[1]),
            year : Number(dateList[0])
        }
        
        // check if Panlindrome
        let isPalindrome = checkPalindromeForAllFormats(dateObj)

        if (isPalindrome){
            outputMsg.innerText = "YAYYYY! It's a Palindrome "
        }
        else {
            let [count, nextDate] = nextPalindromeDate(dateObj)
            outputMsg.innerText = `OHH SORRY, it is not  a Palindrome. 
            The next palindrome date is 
            ${nextDate.day}-${nextDate.month}-${nextDate.year}
             You missed it by ${count} days `
        }
    }
}

checkPalindromeBtn.addEventListener('click', clickHandler)