import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { IdUUIDParamsSchema } from "stoker/openapi/schemas";
import createErrorSchema from "stoker/openapi/schemas/create-error-schema";

import { insertEventSchema, patchEventSchema, selectEventSchema } from "@/db/schema/app-schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Event"];

export const getOne = createRoute({
  tags,
  path: "/event/{id}",
  method: "get",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectEventSchema,
      "Single event",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.any(),
      "Single event",
    ),
  },
});

export const list = createRoute({
  tags,
  path: "/event",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectEventSchema),
      "List of event",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.any(),
      "Create event",
    ),
  },
});

export const create = createRoute({
  tags,
  path: "/event",
  method: "post",
  request: {
    body: jsonContentRequired(insertEventSchema, "Event data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectEventSchema,
      "New event",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.any(),
      "Create event",
    ),
  },
});

export const update = createRoute({
  tags,
  path: "/event/{id}",
  method: "put",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(patchEventSchema, "Event patch data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectEventSchema),
      "List of event",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchEventSchema)
        .or(createErrorSchema(IdUUIDParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  tags,
  path: "/events/{id}",
  method: "delete",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Event deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Event not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Invalid id error",
    ),
  },
});

export type GetOneEvent = typeof getOne;
export type ListEvents = typeof list;
export type CreateEvent = typeof create;
export type UpdateEvent = typeof update;
export type RemoveEvent = typeof remove;
