import { createRoute, z } from "@hono/zod-openapi"
import {jsonContent, jsonContentRequired} from "stoker/openapi/helpers"
import { insertCommunitySchema, selectCommunitySchema } from "../../db/schema/app-schema"
import * as HttpStatusCodes from "stoker/http-status-codes";
import createErrorSchema from "stoker/openapi/schemas/create-error-schema";

const tags =["Community"]
export const create = createRoute({
  tags,
  method: "post",
  path: "/community",
  request: {
    body: jsonContentRequired(
      insertCommunitySchema,
      "Create ticket request",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCommunitySchema,
      "Created community response",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertCommunitySchema),
      "Invalid body data",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.any(),
      "Failed to create ticket",
    ),
  },
});

export type CreateCommunityRouter = typeof create;
