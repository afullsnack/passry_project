import { createRouter } from "@/lib/create-app";

import * as handlers from "./tickets.handlers";
import * as routes from "./tickets.routes";

const router = createRouter()
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.list, handlers.list);

export default router;
