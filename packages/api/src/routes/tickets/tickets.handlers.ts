import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { ticket } from "@/db/schema/app-schema";

import type { CreateTicket, GetOneTicket, ListTicket } from "./tickets.routes";

export const getOne: AppRouteHandler<GetOneTicket> = async (c) => {
  try {
    const id = c.req.param("id");

    const ticket = await db.query.ticket.findFirst({
      where(fields, ops) {
        return ops.eq(fields.id, id);
      },
    });
    if (!ticket) {
      return c.json({ message: "Ticket not found" }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json(ticket, HttpStatusCodes.OK);
  }
  catch (error: any) {
    return c.json({ ...error }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
export const list: AppRouteHandler<ListTicket> = async (c) => {
  try {
    const tickets = await db.query.ticket.findMany();
    return c.json(tickets, HttpStatusCodes.OK);
  }
  catch (error: any) {
    return c.json({ ...error }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
export const create: AppRouteHandler<CreateTicket> = async (c) => {
  try {
    const newTicketData = c.req.valid("json");

    const [newTicket] = await db.insert(ticket).values(newTicketData).returning();
    return c.json(newTicket, HttpStatusCodes.OK);
  }
  catch (error: any) {
    return c.json({ ...error }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
