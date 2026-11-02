import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  image: text("image").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  audience: text("audience").notNull(), // women | men | everyone
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  images: jsonb("images").$type<string[]>().notNull(),
  highlights: jsonb("highlights").$type<string[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  stock: integer("stock").notNull().default(25),
  featured: boolean("featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  shippingMethod: text("shipping_method").notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  productName: text("product_name").notNull(),
  productImage: text("product_image").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
