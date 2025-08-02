import { auth } from "@/lib/auth";
import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import events from "@/routes/events/events.index";
import index from "@/routes/index.route";
import orgs from "@/routes/organization/organization.index";
import tickets from "@/routes/tickets/tickets.index";
import uploads from "@/routes/uploads.index";

const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  orgs,
  events,
  tickets,
  uploads,
] as const;

app.on(["POST", "GET", "DELETE", "PUT"], "/api/auth/*", async c => await auth.handler(c.req.raw));

routes.forEach((route) => {
  app.route("/", route);
});


export type AppType = typeof routes[number];

export default app;
