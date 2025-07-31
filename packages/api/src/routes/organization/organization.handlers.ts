import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { organization } from "@/db/schema/app-schema";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

import type { CreateOrg, GetOneOrg, ListOrg, PatchOrg, RemoveOrg } from "./organization.routes";

export const list: AppRouteHandler<ListOrg> = async (c) => {
  const orgs = await db.query.organization.findMany();
  return c.json(orgs);
};

export const create: AppRouteHandler<CreateOrg> = async (c) => {
  const org = c.req.valid("json");
  const [inserted] = await db.insert(organization).values(org).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneOrg> = async (c) => {
  const id = c.req.param("id");
  const org = await db.query.organization.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!org) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(org, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchOrg> = async (c) => {
  const updates = c.req.valid("json");
  const id = c.req.param("id");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  const [org] = await db.update(organization)
    .set(updates)
    .where(eq(organization.id, id))
    .returning();

  if (!org) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(org, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveOrg> = async (c) => {
  const id = c.req.param("id");
  const result = await db.delete(organization)
    .where(eq(organization.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
