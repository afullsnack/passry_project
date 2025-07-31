import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import { insertOrgSchema, patchOrgSchema, selectOrgSchema } from "@/db/schema/app-schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Organization"];

export const list = createRoute({
  path: "/orgs",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectOrgSchema),
      "The list of orgs",
    ),
  },
});

export const create = createRoute({
  path: "/orgs",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertOrgSchema,
      "The organization to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectOrgSchema,
      "The created organization",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertOrgSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/orgs/{id}",
  method: "get",
  request: {
    params: IdUUIDParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectOrgSchema,
      "The requested organization",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "organization not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/orgs/{id}",
  method: "patch",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(
      patchOrgSchema,
      "The organization updates",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectOrgSchema,
      "The updated organization",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "organization not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchOrgSchema)
        .or(createErrorSchema(IdUUIDParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/orgs/{id}",
  method: "delete",
  request: {
    params: IdUUIDParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "organization deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "organization not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListOrg = typeof list;
export type CreateOrg = typeof create;
export type GetOneOrg = typeof getOne;
export type PatchOrg = typeof patch;
export type RemoveOrg = typeof remove;
