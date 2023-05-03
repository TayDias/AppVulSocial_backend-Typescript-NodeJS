export default function convertHoursToMinutes(time: string) {
    //Divisão em um array e conversão em number
    const [hour, minutes] = time.split(':').map(Number)

    const timeInMinutes = (hour * 60) + minutes

    return timeInMinutes
}