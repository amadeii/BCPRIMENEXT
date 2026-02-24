import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import type { BlogPost as BlogPostType } from "@shared/schema";

function convertPlainTextToHtml(text: string): string {
  if (text.trim().startsWith("<")) return text;

  return text
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("### ")) return `<h3>${trimmed.slice(4)}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1>${trimmed.slice(2)}</h1>`;
      if (trimmed.startsWith("- ")) return `<li>${trimmed.slice(2)}</li>`;
      const formatted = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      return `<p>${formatted}</p>`;
    })
    .join("\n");
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: ["/api/blog/posts", params.slug],
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Carregando artigo...</p>
      </div>
    );
  }

  const renderedContent = useMemo(() => {
    if (!post) return "";
    return convertPlainTextToHtml(post.content);
  }, [post]);

  if (error || !post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Artigo não encontrado.</p>
        <Link href="/blog">
          <Button variant="outline" data-testid="button-back-blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {post.coverImage && (
        <div className="relative h-[300px] w-full overflow-hidden bg-muted md:h-[400px]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
            data-testid="img-post-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <article className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Button>
          </Link>

          <Badge variant="secondary" className="mb-4">{post.category}</Badge>

          <h1 className="mb-6 font-heading text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl" data-testid="text-post-title">
            {post.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-md"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
            data-testid="text-post-content"
          />

          <div className="mt-12 border-t pt-8">
            <Link href="/blog">
              <Button variant="outline" data-testid="button-back-blog-bottom">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
