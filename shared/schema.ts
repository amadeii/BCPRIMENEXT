import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  photo: text("photo"),
  order: text("display_order").default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export const plans = pgTable("plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  billing: text("billing").default("/mês"),
  popular: boolean("popular").default(false).notNull(),
  features: text("features").notNull(),
  ctaLabel: text("cta_label").notNull(),
  ctaHref: text("cta_href").notNull(),
  displayOrder: text("display_order").default("0"),
  active: boolean("active").default(true).notNull(),
});

export const insertPlanSchema = createInsertSchema(plans).omit({
  id: true,
});

export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plans.$inferSelect;

export const redirects = pgTable("redirects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  destination: text("destination").notNull(),
  label: text("label").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRedirectSchema = createInsertSchema(redirects).omit({ id: true, createdAt: true });
export type InsertRedirect = z.infer<typeof insertRedirectSchema>;
export type Redirect = typeof redirects.$inferSelect;

export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull().unique(),
  data: text("data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true, updatedAt: true });
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;

export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  published: boolean("published").default(false).notNull(),
  displayOrder: text("display_order").default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageSchema = createInsertSchema(pages).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

export const pageBlocks = pgTable("page_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull(),
  type: text("type").notNull(),
  data: text("data").notNull(),
  displayOrder: text("display_order").default("0"),
});

export const insertPageBlockSchema = createInsertSchema(pageBlocks).omit({ id: true });
export type InsertPageBlock = z.infer<typeof insertPageBlockSchema>;
export type PageBlock = typeof pageBlocks.$inferSelect;

export const aiSettings = pgTable("ai_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  provider: text("provider").notNull(),
  model: text("model").notNull(),
  apiKey: text("api_key"),
  baseUrl: text("base_url"),
  active: boolean("active").default(false).notNull(),
  label: text("label").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiSettingSchema = createInsertSchema(aiSettings).omit({ id: true, updatedAt: true });
export type InsertAiSetting = z.infer<typeof insertAiSettingSchema>;
export type AiSetting = typeof aiSettings.$inferSelect;

export const seoKeywords = pgTable("seo_keywords", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keyword: text("keyword").notNull().unique(),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertKeywordSchema = createInsertSchema(seoKeywords).omit({
  id: true,
  createdAt: true,
});

export type InsertKeyword = z.infer<typeof insertKeywordSchema>;
export type Keyword = typeof seoKeywords.$inferSelect;
