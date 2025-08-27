
import type { CreateCommunityRouter } from "./community.routes"
import type {AppRouteHandler} from "../../lib/types"
import * as HttpStatusCodes from "stoker/http-status-codes"
import db from "../../db"
import { community } from "../../db/schema/app-schema"

export const create: AppRouteHandler<CreateCommunityRouter> = async (c) => {
  const body = c.req.valid("json")

  try {
    const [newCommunity] = await db.insert(community).values({
      ...body,
    }).returning()
    console.log("New community created:", newCommunity)
    return c.json(newCommunity, HttpStatusCodes.OK)
  }
  catch(error: any) {
    console.log("Error creating community", error)
    return c.json({
      success: false,
      message: error?.message || "failed to create community"
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR)
  }
}
