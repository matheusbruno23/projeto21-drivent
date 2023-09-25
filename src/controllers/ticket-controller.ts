import { Response, Request } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketService from '@/services/tickets-service'

export async function getTicketTypes(req:Request, res:Response){
    const ticketTypes = await ticketService.getTicketTypes()
    return res.status(httpStatus.OK).send(ticketTypes)
}

export async function getTicket(req:AuthenticatedRequest, res:Response){
    const {userId} = req.body as {userId: number} 
    const tickets = await ticketService.getTickets(userId)
    return res.status(httpStatus.OK).send(tickets)
}
export async function createTicket(req:Request, res:Response){
    const {userId, ticketTypeId} = req.body as {userId: number, ticketTypeId: number} 
    const ticket = await ticketService.createTicket(userId, ticketTypeId)
    return res.status(httpStatus.CREATED).send(ticket)
}