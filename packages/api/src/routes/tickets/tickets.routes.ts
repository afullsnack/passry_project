import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import { insertTicketSchema, selectTicketSchema } from "@/db/schema/app-schema";

const tags = ["Tickets"];

export const getOne = createRoute({
  tags,
  method: "get",
  path: "/tickets/{id}",
  request: {
    params: {
      IdUUIDParamsSchema,
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTicketSchema,
      "Single ticket response",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.any(),
      "Not found response",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Failed to retrieve ticket",
    ),
  },
});

export const list = createRoute({
  tags,
  method: "get",
  path: "/tickets",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTicketSchema),
      "List of ticket response",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.any(),
      "Failed to retrieve tickets",
    ),
  },
});

export const create = createRoute({
  tags,
  method: "post",
  path: "/tickets",
  request: {
    body: jsonContentRequired(
      insertTicketSchema,
      "Create ticket request",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTicketSchema,
      "Created ticket response",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTicketSchema),
      "Invalid body data",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.any(),
      "Failed to create ticket",
    ),
  },
});

export type GetOneTicket = typeof getOne;
export type ListTicket = typeof list;
export type CreateTicket = typeof create;
