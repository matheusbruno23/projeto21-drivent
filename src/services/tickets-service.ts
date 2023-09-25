import { notFoundError } from "@/errors"
import { createTicket } from "@/protocols"
import { enrollmentRepository } from "@/repositories"
import ticketRepository from "@/repositories/tickets-repository"
import { Ticket, TicketStatus, TicketType } from "@prisma/client"

export async function getTicketTypes(): Promise<Ticket | TicketType[]>{
    const ticketTypes = await ticketRepository.getTicketTypesDB()
    if(ticketTypes.length === 0 ) return []
    return ticketTypes 
}

export async function getTickets(userId: number): Promise<Ticket>{
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticket = await ticketRepository.getTicketByEnrollmentIdDB(enrollment.id)
    if(!ticket) throw notFoundError()
    return ticket
}

export async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket>{
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const dataticket: createTicket = {
        ticketTypeId,
        enrollmentId : enrollment.id,
        status: TicketStatus.RESERVED
    }

    await ticketRepository.createTicketDB(dataticket)
    const ticket = await ticketRepository.getTicketByEnrollmentIdDB(enrollment.id)

    return ticket
}

const ticketService = {getTicketTypes, getTickets, createTicket}

export default ticketService