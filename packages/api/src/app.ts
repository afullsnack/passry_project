import { auth } from "@/lib/auth";
import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import events from "@/routes/events/events.index";
import index from "@/routes/index.route";
import orgs from "@/routes/organization/organization.index";
import tickets from "@/routes/tickets/tickets.index";

const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  orgs,
  events,
  tickets,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

app.on(["POST", "GET", "DELETE", "PUT"], "/api/auth/*", async c => await auth.handler(c.req.raw));

export type AppType = typeof routes[number];

export default app;
