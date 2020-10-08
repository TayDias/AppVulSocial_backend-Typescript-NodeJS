export default function convertMinutesToHours(time: number) {
    const hours = (time / 60).toString()
    const minutes = time % 60

    let correctedHours = hours.charAt(0) + hours.charAt(1)

    let timeInMinutes = correctedHours + ":" + minutes

    if(minutes === 0) {
        timeInMinutes = timeInMinutes + "0"
    }

    return timeInMinutes
}