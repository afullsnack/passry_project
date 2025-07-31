import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";

// Organization
export const organization = sqliteTable("organization", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  name: text("name").notNull(),
  description: text("description").notNull(),
  followers: integer("followers"),
  likes: integer("likes"),
});

export const event = sqliteTable("event", {
  id: text("id").primaryKey(),
  orgId: text("org_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  dateTime: integer("date_time", { mode: "timestamp" }).$defaultFn(() => new Date()),
  venueName: text("venue_name").notNull(),
  address: text("full_address").notNull(),
  coverUrl: text("cover_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const ticket = sqliteTable("ticket", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  saleStart: integer("sale_start", { mode: "timestamp" }),
  saleEnd: integer("sale_end", { mode: "timestamp" }),
  isFree: integer("is_free", { mode: "boolean" }).default(false),
  imageUrl: text("image_url"),
  eventId: text("event_id").references(() => event.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const organizationRelations = relations(organization, ({ one, many }) => ({
  owner: one(user, {
    fields: [organization.ownerId],
    references: [user.id],
  }),
  events: many(event),
}));

export const eventRelations = relations(event, ({ one, many }) => ({
  tickets: many(ticket),
  organization: one(organization, {
    fields: [event.orgId],
    references: [organization.id],
  }),
}));
