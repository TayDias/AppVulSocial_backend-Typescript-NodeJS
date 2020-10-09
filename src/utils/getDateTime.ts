export default function getDateTime() {

    var date = new Date();

    const hour = date.getHours();
    const finalHour = ((hour < 10 ? "0" : "") + hour)

    const min  = date.getMinutes();
    const finalMin = (min < 10 ? "0" : "") + min;

    const sec  = date.getSeconds();
    const finalSec = (sec < 10 ? "0" : "") + sec;

    const year = date.getFullYear();

    const month = date.getMonth() + 1;
    const finalMonth = (month < 10 ? "0" : "") + month;

    const day  = date.getDate();
    const finalDay = (day < 10 ? "0" : "") + day;

    return year + ":" + finalMonth + ":" + finalDay + ":" + finalHour + ":" + finalMin + ":" + finalSec;

}