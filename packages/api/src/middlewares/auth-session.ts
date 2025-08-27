import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";
import * as HttpStatusCodes from "stoker/http-status-codes"


export const authSession = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  console.log("Session", session)

  if(!session && !(c.req.path.includes('event') || c.req.path.includes('upload') && c.req.method === 'GET')) {
    return c.json({message: "Not Authorized"}, HttpStatusCodes.UNAUTHORIZED)
  }

  await next()
})
