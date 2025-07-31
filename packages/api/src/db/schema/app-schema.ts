import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { user } from "./auth-schema";

// Organization
export const organization = sqliteTable("organization", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  followers: integer("followers"),
  likes: integer("likes"),
  coverImageUrl: text("cover_image"),
  coverImageKey: text("cover_image_key"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const selectOrgSchema = createSelectSchema(organization);
export const insertOrgSchema = createInsertSchema(organization, {
  name: schema => schema.name.min(6),
}).required({
  ownerId: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const patchOrgSchema = insertOrgSchema.partial();

export const event = sqliteTable("event", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  orgId: text("org_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  dateTime: integer("date_time", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  venueName: text("venue_name").notNull(),
  address: text("full_address").notNull(),
  coverUrlKey: text("cover_url_key"),
  coverUrl: text("cover_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const selectEventSchema = createSelectSchema(event);
export const insertEventSchema = createInsertSchema(event, {
  title: schema => schema.title.min(6),
}).required({
  title: true,
  orgId: true
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const patchEventSchema = insertEventSchema.partial();

export const ticket = sqliteTable("ticket", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  saleStart: integer("sale_start", { mode: "timestamp" }),
  saleEnd: integer("sale_end", { mode: "timestamp" }),
  isFree: integer("is_free", { mode: "boolean" }).default(false),
  imageKey: text("image_key"),
  imageUrl: text("image_url"),
  eventId: text("event_id").references(() => event.id, { onDelete: "cascade" }),
  orgId: text("org_id").references(() => organization.id, {onDelete: "cascade"}),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const selectTicketSchema = createSelectSchema(ticket);
export const insertTicketSchema = createInsertSchema(ticket, {
  name: schema => schema.name.min(6),
})
  .required({
    price: true,
    quantity: true,
    eventId: true,
    orgId: true
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export const patchTicketSchema = insertEventSchema.partial();

export const organizationRelations = relations(organization, ({ one, many }) => ({
  owner: one(user, {
    fields: [organization.ownerId],
    references: [user.id],
  }),
}));

export const eventRelations = relations(event, ({ one, many }) => ({
  organization: one(organization, {
    fields: [event.orgId],
    references: [organization.id],
  }),
}));
