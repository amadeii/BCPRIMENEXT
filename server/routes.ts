import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertBlogPostSchema, insertKeywordSchema, insertTeamMemberSchema, insertPlanSchema, insertRedirectSchema, insertPageSchema, insertPageBlockSchema, insertAiSettingSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo não permitido"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.use("/uploads", (await import("express")).default.static(uploadsDir));

  app.post("/api/admin/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const parsed = insertLeadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const lead = await storage.createLead(parsed.data);
      res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.published) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/admin/posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/admin/posts", async (req, res) => {
    try {
      const parsed = insertBlogPostSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const post = await storage.createBlogPost(parsed.data);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.patch("/api/admin/posts/:id", async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/admin/posts/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  app.get("/api/admin/keywords", async (req, res) => {
    try {
      const keywords = await storage.getKeywords();
      res.json(keywords);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      res.status(500).json({ error: "Failed to fetch keywords" });
    }
  });

  app.post("/api/admin/keywords", async (req, res) => {
    try {
      const parsed = insertKeywordSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const keyword = await storage.createKeyword(parsed.data);
      res.status(201).json(keyword);
    } catch (error) {
      console.error("Error creating keyword:", error);
      res.status(500).json({ error: "Failed to create keyword" });
    }
  });

  app.delete("/api/admin/keywords/:id", async (req, res) => {
    try {
      await storage.deleteKeyword(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting keyword:", error);
      res.status(500).json({ error: "Failed to delete keyword" });
    }
  });

  app.get("/api/team", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team:", error);
      res.status(500).json({ error: "Failed to fetch team" });
    }
  });

  app.get("/api/admin/team", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team:", error);
      res.status(500).json({ error: "Failed to fetch team" });
    }
  });

  app.get("/api/admin/team/:id", async (req, res) => {
    try {
      const member = await storage.getTeamMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error fetching member:", error);
      res.status(500).json({ error: "Failed to fetch member" });
    }
  });

  app.post("/api/admin/team", async (req, res) => {
    try {
      const parsed = insertTeamMemberSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const member = await storage.createTeamMember(parsed.data);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating member:", error);
      res.status(500).json({ error: "Failed to create member" });
    }
  });

  app.patch("/api/admin/team/:id", async (req, res) => {
    try {
      const member = await storage.updateTeamMember(req.params.id, req.body);
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error updating member:", error);
      res.status(500).json({ error: "Failed to update member" });
    }
  });

  app.delete("/api/admin/team/:id", async (req, res) => {
    try {
      await storage.deleteTeamMember(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ error: "Failed to delete member" });
    }
  });

  app.get("/api/admin/leads", async (req, res) => {
    try {
      const leadsList = await storage.getLeads();
      res.json(leadsList);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/plans", async (req, res) => {
    try {
      const plansList = await storage.getActivePlans();
      res.json(plansList);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ error: "Failed to fetch plans" });
    }
  });

  app.get("/api/admin/plans", async (req, res) => {
    try {
      const plansList = await storage.getPlans();
      res.json(plansList);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ error: "Failed to fetch plans" });
    }
  });

  app.get("/api/admin/plans/:id", async (req, res) => {
    try {
      const plan = await storage.getPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.json(plan);
    } catch (error) {
      console.error("Error fetching plan:", error);
      res.status(500).json({ error: "Failed to fetch plan" });
    }
  });

  app.post("/api/admin/plans", async (req, res) => {
    try {
      const parsed = insertPlanSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const plan = await storage.createPlan(parsed.data);
      res.status(201).json(plan);
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).json({ error: "Failed to create plan" });
    }
  });

  app.patch("/api/admin/plans/:id", async (req, res) => {
    try {
      const plan = await storage.updatePlan(req.params.id, req.body);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.json(plan);
    } catch (error) {
      console.error("Error updating plan:", error);
      res.status(500).json({ error: "Failed to update plan" });
    }
  });

  app.delete("/api/admin/plans/:id", async (req, res) => {
    try {
      await storage.deletePlan(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting plan:", error);
      res.status(500).json({ error: "Failed to delete plan" });
    }
  });

  // ── Redirects (public) ──────────────────────────────────────────
  app.get("/r/:slug", async (req, res) => {
    try {
      const r = await storage.getRedirectBySlug(req.params.slug);
      if (!r || !r.active) return res.status(404).json({ error: "Not found" });
      res.redirect(302, r.destination);
    } catch (error) {
      res.status(500).json({ error: "Failed" });
    }
  });

  // ── Redirects (admin CRUD) ───────────────────────────────────────
  app.get("/api/admin/redirects", async (_req, res) => {
    res.json(await storage.getRedirects());
  });

  app.get("/api/admin/redirects/:id", async (req, res) => {
    const r = await storage.getRedirect(req.params.id);
    if (!r) return res.status(404).json({ error: "Not found" });
    res.json(r);
  });

  app.post("/api/admin/redirects", async (req, res) => {
    const parsed = insertRedirectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const r = await storage.createRedirect(parsed.data);
    res.status(201).json(r);
  });

  app.patch("/api/admin/redirects/:id", async (req, res) => {
    const r = await storage.updateRedirect(req.params.id, req.body);
    if (!r) return res.status(404).json({ error: "Not found" });
    res.json(r);
  });

  app.delete("/api/admin/redirects/:id", async (req, res) => {
    await storage.deleteRedirect(req.params.id);
    res.status(204).send();
  });

  // ── Site Content ─────────────────────────────────────────────────
  app.get("/api/site-content", async (_req, res) => {
    res.json(await storage.getAllSiteContent());
  });

  app.get("/api/site-content/:section", async (req, res) => {
    const sc = await storage.getSiteContent(req.params.section);
    if (!sc) return res.status(404).json({ error: "Not found" });
    res.json(sc);
  });

  app.put("/api/admin/site-content/:section", async (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "data required" });
    const sc = await storage.upsertSiteContent(req.params.section, data);
    res.json(sc);
  });

  // ── Pages (public) ───────────────────────────────────────────────
  app.get("/api/pages", async (_req, res) => {
    const all = await storage.getPages();
    res.json(all.filter(p => p.published));
  });

  app.get("/api/pages/:slug", async (req, res) => {
    const page = await storage.getPageBySlug(req.params.slug);
    if (!page || !page.published) return res.status(404).json({ error: "Not found" });
    const blocks = await storage.getPageBlocks(page.id);
    res.json({ ...page, blocks });
  });

  // ── Pages (admin CRUD) ───────────────────────────────────────────
  app.get("/api/admin/pages", async (_req, res) => {
    res.json(await storage.getPages());
  });

  app.get("/api/admin/pages/:id", async (req, res) => {
    const page = await storage.getPage(req.params.id);
    if (!page) return res.status(404).json({ error: "Not found" });
    const blocks = await storage.getPageBlocks(page.id);
    res.json({ ...page, blocks });
  });

  app.post("/api/admin/pages", async (req, res) => {
    const parsed = insertPageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const page = await storage.createPage(parsed.data);
    res.status(201).json(page);
  });

  app.patch("/api/admin/pages/:id", async (req, res) => {
    const page = await storage.updatePage(req.params.id, req.body);
    if (!page) return res.status(404).json({ error: "Not found" });
    res.json(page);
  });

  app.delete("/api/admin/pages/:id", async (req, res) => {
    await storage.deletePage(req.params.id);
    res.status(204).send();
  });

  // ── Page Blocks ──────────────────────────────────────────────────
  app.get("/api/admin/pages/:pageId/blocks", async (req, res) => {
    res.json(await storage.getPageBlocks(req.params.pageId));
  });

  app.post("/api/admin/pages/:pageId/blocks", async (req, res) => {
    const parsed = insertPageBlockSchema.safeParse({ ...req.body, pageId: req.params.pageId });
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const block = await storage.createPageBlock(parsed.data);
    res.status(201).json(block);
  });

  app.patch("/api/admin/blocks/:id", async (req, res) => {
    const block = await storage.updatePageBlock(req.params.id, req.body);
    if (!block) return res.status(404).json({ error: "Not found" });
    res.json(block);
  });

  app.delete("/api/admin/blocks/:id", async (req, res) => {
    await storage.deletePageBlock(req.params.id);
    res.status(204).send();
  });

  app.put("/api/admin/pages/:pageId/blocks", async (req, res) => {
    const { blocks } = req.body as { blocks: Array<{ type: string; data: string; displayOrder: string }> };
    await storage.deletePageBlocks(req.params.pageId);
    const created = await Promise.all(
      blocks.map(b => storage.createPageBlock({ ...b, pageId: req.params.pageId }))
    );
    res.json(created);
  });

  // ── AI Settings ──────────────────────────────────────────────────
  app.get("/api/admin/ai-settings", async (_req, res) => {
    const settings = await storage.getAiSettings();
    res.json(settings.map(s => ({ ...s, apiKey: s.apiKey ? "***" : null })));
  });

  app.post("/api/admin/ai-settings", async (req, res) => {
    const parsed = insertAiSettingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const s = await storage.upsertAiSetting(parsed.data);
    res.status(201).json({ ...s, apiKey: s.apiKey ? "***" : null });
  });

  app.patch("/api/admin/ai-settings/:id", async (req, res) => {
    const s = await storage.upsertAiSetting({ ...req.body, id: req.params.id });
    res.json({ ...s, apiKey: s.apiKey ? "***" : null });
  });

  app.delete("/api/admin/ai-settings/:id", async (req, res) => {
    await storage.deleteAiSetting(req.params.id);
    res.status(204).send();
  });

  app.post("/api/admin/ai-settings/:id/activate", async (req, res) => {
    await storage.setActiveAiSetting(req.params.id);
    res.json({ ok: true });
  });

  // ── AI Chat (MCP-style agent) ─────────────────────────────────────
  app.post("/api/admin/ai-chat", async (req, res) => {
    try {
      const { messages } = req.body as { messages: Array<{ role: string; content: string }> };
      const activeSetting = await storage.getActiveAiSetting();
      if (!activeSetting) {
        return res.status(400).json({ error: "Nenhum provedor de IA configurado e ativo." });
      }

      const systemPrompt = `Você é um assistente especializado em gerenciar o site da BcprimeNEXT, uma empresa de contabilidade digital brasileira.
Você pode ajudar a:
- Criar e editar textos para páginas e seções do site
- Sugerir conteúdo para o blog sobre contabilidade, finanças e tributação
- Melhorar descrições de planos e serviços
- Responder dúvidas sobre gestão do conteúdo do site
Responda sempre em português brasileiro.`;

      let reply = "";

      if (activeSetting.provider === "openai") {
        const apiKey = (await storage.getAiSetting(activeSetting.id))?.apiKey;
        if (!apiKey) return res.status(400).json({ error: "Chave OpenAI não configurada." });
        const resp = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: activeSetting.model || "gpt-4o-mini",
            messages: [{ role: "system", content: systemPrompt }, ...messages],
          }),
        });
        const data = await resp.json() as any;
        reply = data.choices?.[0]?.message?.content ?? "Sem resposta.";
      } else if (activeSetting.provider === "gemini") {
        const apiKey = (await storage.getAiSetting(activeSetting.id))?.apiKey;
        if (!apiKey) return res.status(400).json({ error: "Chave Gemini não configurada." });
        const allMessages = [{ role: "user", content: systemPrompt }, ...messages];
        const contents = allMessages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${activeSetting.model || "gemini-1.5-flash"}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        });
        const data = await resp.json() as any;
        reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sem resposta.";
      } else if (activeSetting.provider === "ollama") {
        const baseUrl = activeSetting.baseUrl || "http://localhost:11434";
        const resp = await fetch(`${baseUrl}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: activeSetting.model || "llama3",
            messages: [{ role: "system", content: systemPrompt }, ...messages],
            stream: false,
          }),
        });
        const data = await resp.json() as any;
        reply = data.message?.content ?? "Sem resposta.";
      } else {
        return res.status(400).json({ error: `Provedor "${activeSetting.provider}" não suportado ainda.` });
      }

      res.json({ reply });
    } catch (error: any) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: "Erro ao conectar com IA: " + error.message });
    }
  });

  return httpServer;
}
