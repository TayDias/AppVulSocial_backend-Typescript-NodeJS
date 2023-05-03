export default function convertMinutesToHours(time: number) {
    const hours = (time / 60)
    const minutes = time % 60
    let correctedHours = ''

    if(hours > 9 ) {
        correctedHours = hours.toString().charAt(0) + hours.toString().charAt(1)
    }
    else {
        correctedHours = "0" + hours.toString().charAt(0)
    }

    let timeInMinutes = correctedHours + ":" + minutes

    if(minutes === 0) {
        timeInMinutes = timeInMinutes + "0"
    }

    return timeInMinutes
}