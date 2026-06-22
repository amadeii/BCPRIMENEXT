import { 
  type User, type InsertUser,
  type Lead, type InsertLead,
  type BlogPost, type InsertBlogPost,
  type Keyword, type InsertKeyword,
  type TeamMember, type InsertTeamMember,
  type Plan, type InsertPlan,
  type Redirect, type InsertRedirect,
  type SiteContent, type InsertSiteContent,
  type Page, type InsertPage,
  type PageBlock, type InsertPageBlock,
  type AiSetting, type InsertAiSetting,
  users, leads, blogPosts, seoKeywords, teamMembers, plans,
  redirects, siteContent, pages, pageBlocks, aiSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<void>;
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  
  createKeyword(keyword: InsertKeyword): Promise<Keyword>;
  deleteKeyword(id: string): Promise<void>;
  getKeywords(): Promise<Keyword[]>;

  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<void>;

  getPlans(): Promise<Plan[]>;
  getActivePlans(): Promise<Plan[]>;
  getPlan(id: string): Promise<Plan | undefined>;
  createPlan(plan: InsertPlan): Promise<Plan>;
  updatePlan(id: string, plan: Partial<InsertPlan>): Promise<Plan | undefined>;
  deletePlan(id: string): Promise<void>;

  getRedirects(): Promise<Redirect[]>;
  getRedirect(id: string): Promise<Redirect | undefined>;
  getRedirectBySlug(slug: string): Promise<Redirect | undefined>;
  createRedirect(r: InsertRedirect): Promise<Redirect>;
  updateRedirect(id: string, r: Partial<InsertRedirect>): Promise<Redirect | undefined>;
  deleteRedirect(id: string): Promise<void>;

  getSiteContent(section: string): Promise<SiteContent | undefined>;
  getAllSiteContent(): Promise<SiteContent[]>;
  upsertSiteContent(section: string, data: string): Promise<SiteContent>;

  getPages(): Promise<Page[]>;
  getPage(id: string): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: string): Promise<void>;

  getPageBlocks(pageId: string): Promise<PageBlock[]>;
  getPageBlock(id: string): Promise<PageBlock | undefined>;
  createPageBlock(block: InsertPageBlock): Promise<PageBlock>;
  updatePageBlock(id: string, block: Partial<InsertPageBlock>): Promise<PageBlock | undefined>;
  deletePageBlock(id: string): Promise<void>;
  deletePageBlocks(pageId: string): Promise<void>;

  getAiSettings(): Promise<AiSetting[]>;
  getAiSetting(id: string): Promise<AiSetting | undefined>;
  getActiveAiSetting(): Promise<AiSetting | undefined>;
  upsertAiSetting(setting: InsertAiSetting & { id?: string }): Promise<AiSetting>;
  deleteAiSetting(id: string): Promise<void>;
  setActiveAiSetting(id: string): Promise<void>;

  getStats(): Promise<{ posts: number; keywords: number; leads: number; team: number; plans: number; redirects: number; pages: number }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createKeyword(keyword: InsertKeyword): Promise<Keyword> {
    const [newKeyword] = await db.insert(seoKeywords).values(keyword).returning();
    return newKeyword;
  }

  async deleteKeyword(id: string): Promise<void> {
    await db.delete(seoKeywords).where(eq(seoKeywords.id, id));
  }

  async getKeywords(): Promise<Keyword[]> {
    return db.select().from(seoKeywords).orderBy(desc(seoKeywords.createdAt));
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).orderBy(asc(teamMembers.order));
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  async updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [updated] = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return updated;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  async getPlans(): Promise<Plan[]> {
    return db.select().from(plans).orderBy(asc(plans.displayOrder));
  }

  async getActivePlans(): Promise<Plan[]> {
    return db.select().from(plans).where(eq(plans.active, true)).orderBy(asc(plans.displayOrder));
  }

  async getPlan(id: string): Promise<Plan | undefined> {
    const [plan] = await db.select().from(plans).where(eq(plans.id, id));
    return plan;
  }

  async createPlan(plan: InsertPlan): Promise<Plan> {
    const [newPlan] = await db.insert(plans).values(plan).returning();
    return newPlan;
  }

  async updatePlan(id: string, plan: Partial<InsertPlan>): Promise<Plan | undefined> {
    const [updated] = await db.update(plans).set(plan).where(eq(plans.id, id)).returning();
    return updated;
  }

  async deletePlan(id: string): Promise<void> {
    await db.delete(plans).where(eq(plans.id, id));
  }

  // Redirects
  async getRedirects(): Promise<Redirect[]> {
    return db.select().from(redirects).orderBy(asc(redirects.slug));
  }

  async getRedirect(id: string): Promise<Redirect | undefined> {
    const [r] = await db.select().from(redirects).where(eq(redirects.id, id));
    return r;
  }

  async getRedirectBySlug(slug: string): Promise<Redirect | undefined> {
    const [r] = await db.select().from(redirects).where(eq(redirects.slug, slug));
    return r;
  }

  async createRedirect(r: InsertRedirect): Promise<Redirect> {
    const [newR] = await db.insert(redirects).values(r).returning();
    return newR;
  }

  async updateRedirect(id: string, r: Partial<InsertRedirect>): Promise<Redirect | undefined> {
    const [updated] = await db.update(redirects).set(r).where(eq(redirects.id, id)).returning();
    return updated;
  }

  async deleteRedirect(id: string): Promise<void> {
    await db.delete(redirects).where(eq(redirects.id, id));
  }

  // Site Content
  async getSiteContent(section: string): Promise<SiteContent | undefined> {
    const [sc] = await db.select().from(siteContent).where(eq(siteContent.section, section));
    return sc;
  }

  async getAllSiteContent(): Promise<SiteContent[]> {
    return db.select().from(siteContent);
  }

  async upsertSiteContent(section: string, data: string): Promise<SiteContent> {
    const existing = await this.getSiteContent(section);
    if (existing) {
      const [updated] = await db
        .update(siteContent)
        .set({ data, updatedAt: new Date() })
        .where(eq(siteContent.section, section))
        .returning();
      return updated;
    }
    const [created] = await db.insert(siteContent).values({ section, data }).returning();
    return created;
  }

  // Pages
  async getPages(): Promise<Page[]> {
    return db.select().from(pages).orderBy(asc(pages.displayOrder));
  }

  async getPage(id: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page | undefined> {
    const [updated] = await db.update(pages).set({ ...page, updatedAt: new Date() }).where(eq(pages.id, id)).returning();
    return updated;
  }

  async deletePage(id: string): Promise<void> {
    await db.delete(pageBlocks).where(eq(pageBlocks.pageId, id));
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Page Blocks
  async getPageBlocks(pageId: string): Promise<PageBlock[]> {
    return db.select().from(pageBlocks).where(eq(pageBlocks.pageId, pageId)).orderBy(asc(pageBlocks.displayOrder));
  }

  async getPageBlock(id: string): Promise<PageBlock | undefined> {
    const [block] = await db.select().from(pageBlocks).where(eq(pageBlocks.id, id));
    return block;
  }

  async createPageBlock(block: InsertPageBlock): Promise<PageBlock> {
    const [newBlock] = await db.insert(pageBlocks).values(block).returning();
    return newBlock;
  }

  async updatePageBlock(id: string, block: Partial<InsertPageBlock>): Promise<PageBlock | undefined> {
    const [updated] = await db.update(pageBlocks).set(block).where(eq(pageBlocks.id, id)).returning();
    return updated;
  }

  async deletePageBlock(id: string): Promise<void> {
    await db.delete(pageBlocks).where(eq(pageBlocks.id, id));
  }

  async deletePageBlocks(pageId: string): Promise<void> {
    await db.delete(pageBlocks).where(eq(pageBlocks.pageId, pageId));
  }

  // AI Settings
  async getAiSettings(): Promise<AiSetting[]> {
    return db.select().from(aiSettings);
  }

  async getAiSetting(id: string): Promise<AiSetting | undefined> {
    const [s] = await db.select().from(aiSettings).where(eq(aiSettings.id, id));
    return s;
  }

  async getActiveAiSetting(): Promise<AiSetting | undefined> {
    const [s] = await db.select().from(aiSettings).where(eq(aiSettings.active, true));
    return s;
  }

  async upsertAiSetting(setting: InsertAiSetting & { id?: string }): Promise<AiSetting> {
    if (setting.id) {
      const { id, ...rest } = setting;
      const [updated] = await db.update(aiSettings).set({ ...rest, updatedAt: new Date() }).where(eq(aiSettings.id, id)).returning();
      return updated;
    }
    const [created] = await db.insert(aiSettings).values(setting).returning();
    return created;
  }

  async deleteAiSetting(id: string): Promise<void> {
    await db.delete(aiSettings).where(eq(aiSettings.id, id));
  }

  async setActiveAiSetting(id: string): Promise<void> {
    await db.update(aiSettings).set({ active: false });
    await db.update(aiSettings).set({ active: true }).where(eq(aiSettings.id, id));
  }

  async getStats(): Promise<{ posts: number; keywords: number; leads: number; team: number; plans: number; redirects: number; pages: number }> {
    const postsResult = await db.select().from(blogPosts);
    const keywordsResult = await db.select().from(seoKeywords);
    const leadsResult = await db.select().from(leads);
    const teamResult = await db.select().from(teamMembers);
    const plansResult = await db.select().from(plans);
    const redirectsResult = await db.select().from(redirects);
    const pagesResult = await db.select().from(pages);
    
    return {
      posts: postsResult.length,
      keywords: keywordsResult.length,
      leads: leadsResult.length,
      team: teamResult.length,
      plans: plansResult.length,
      redirects: redirectsResult.length,
      pages: pagesResult.length,
    };
  }
}

export const storage = new DatabaseStorage();
