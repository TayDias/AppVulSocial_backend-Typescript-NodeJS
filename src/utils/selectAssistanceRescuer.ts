export default async function selectAssistanceRescuer(avaliableRescuers: any) {
    const rescuersIds = []

    while(avaliableRescuers.length) {
        const index = Math.floor(Math.random() * avaliableRescuers.length - 1)

        const [option] = avaliableRescuers.splice(index, 1)

        rescuersIds.push(option.rescuer_id)
    }

    const rescuerId = rescuersIds[0]

    return rescuerId
}