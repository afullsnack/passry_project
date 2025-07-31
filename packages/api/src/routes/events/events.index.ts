import { createRouter } from "@/lib/create-app";

import * as handlers from "./events.handlers";
import * as routes from "./events.routes";
import { authSession } from "@/middlewares/auth-session";

const router = createRouter();

router.use(async (c, next) => authSession(c, next))
router
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.list, handlers.list);
export default router;
