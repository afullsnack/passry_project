import { createRouter } from "@/lib/create-app";

import * as handlers from "./organization.handlers";
import * as routes from "./organization.routes";
import { authSession } from "@/middlewares/auth-session";

const router = createRouter()
router.use(async (c, next) => authSession(c, next))
router
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
