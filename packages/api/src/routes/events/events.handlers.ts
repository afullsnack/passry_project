import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { event } from "@/db/schema/app-schema";
import { auth } from "@/lib/auth";

import type { CreateEvent, GetOneEvent, ListEvents } from "./events.routes";

export const getOne: AppRouteHandler<GetOneEvent> = async (c) => {
  // const { id } = c.req.valid("param");
  const id = c.req.param("id");

  try {
    const event = await db.query.event.findFirst({
      where(fields, ops) {
        return ops.eq(fields.id, id);
      },
    });

    return c.json(event, HttpStatusCodes.OK);
  }
  catch (error: any) {
    return c.json({ ...error }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const list: AppRouteHandler<ListEvents> = async (c) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    console.log("session", session);
    const events = await db.query.event.findMany({
      where(fields, operators) {
        if (!session?.org) {
          return operators.eq(event.orgId, "");
        }
        return operators.eq(event.orgId, session?.org?.id);
      },
    });
    return c.json(events, HttpStatusCodes.OK);
  }
  catch (error: any) {
    console.log("error geting events", error);
    return c.json({ ...error }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const create: AppRouteHandler<CreateEvent> = async (c) => {
  const eventBody = c.req.valid("json");

  try {
    const [newEvent] = await db.insert(event).values(eventBody).returning();
    return c.json(newEvent, HttpStatusCodes.OK);
  }
  catch (error: any) {
    return c.json({ ...error }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
