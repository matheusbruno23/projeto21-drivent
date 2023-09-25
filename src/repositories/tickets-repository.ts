import {prisma} from '@/config'
import { createTicket } from '@/protocols'

export function getTicketTypesDB(){
    return prisma.ticketType.findMany()
}


export function createTicketDB(dataticket: createTicket){
    return prisma.ticket.create({
        data:dataticket
    })
}


export function getTicketByEnrollmentIdDB(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where:{
            enrollmentId
        },
        include:{
            TicketType: true
        }
    })
}
const ticketRepository = {getTicketTypesDB, createTicketDB, getTicketByEnrollmentIdDB}

export default ticketRepository