import {createRouter} from "../../lib/create-app"
import * as routes from "./community.routes"
import * as handlers from "./community.handlers"

const router = createRouter()
  .openapi(routes.create, handlers.create)

export default router;
