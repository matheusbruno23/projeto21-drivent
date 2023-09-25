import { createTicket, getTicket, getTicketTypes } from "@/controllers/ticket-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schemas";
import { Router } from "express";

const ticketsRouter = Router()

ticketsRouter
.all("/*", authenticateToken)
.get("tickets/types", getTicketTypes)
.get("/tickets", getTicket)
.post("/tickets" , validateBody(ticketSchema), createTicket)

export {ticketsRouter}