import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import NotFound from "@/pages/not-found";

interface BlockData {
  title?: string;
  subtitle?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[];
  align?: "left" | "center" | "right";
  bgColor?: "white" | "muted" | "primary";
}

interface Block {
  id: string;
  type: string;
  data: string;
  displayOrder: string;
}

interface DynamicPageData {
  id: string;
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  published: boolean;
  blocks: Block[];
}

const alignClass: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const bgClass: Record<string, string> = {
  white: "bg-white",
  muted: "bg-muted/40",
  primary: "bg-primary text-primary-foreground",
};

function RenderBlock({ block }: { block: Block }) {
  let data: BlockData = {};
  try { data = JSON.parse(block.data); } catch {}
  const align = alignClass[data.align ?? "left"];
  const bg = bgClass[data.bgColor ?? "white"];

  if (block.type === "divider") {
    return <div className="py-4"><hr /></div>;
  }

  if (block.type === "hero") {
    return (
      <section className={`${bg} py-20 px-4`}>
        <div className={`max-w-3xl mx-auto ${align}`}>
          {data.title && <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>}
          {data.subtitle && <p className="text-lg md:text-xl mb-8 opacity-90">{data.subtitle}</p>}
          {data.buttonLabel && data.buttonHref && (
            <Link href={data.buttonHref}>
              <Button size="lg">{data.buttonLabel}</Button>
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (block.type === "text") {
    return (
      <section className={`${bg} py-12 px-4`}>
        <div className={`max-w-3xl mx-auto ${align}`}>
          {data.title && <h2 className="text-2xl font-bold mb-4">{data.title}</h2>}
          {data.text && <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{data.text}</p>}
        </div>
      </section>
    );
  }

  if (block.type === "image_text") {
    return (
      <section className={`${bg} py-12 px-4`}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {data.imageUrl && (
            <img src={data.imageUrl} alt={data.imageAlt ?? ""} className="rounded-xl w-full object-cover" />
          )}
          <div className={align}>
            {data.title && <h2 className="text-2xl font-bold mb-3">{data.title}</h2>}
            {data.text && <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{data.text}</p>}
            {data.buttonLabel && data.buttonHref && (
              <Link href={data.buttonHref}>
                <Button className="mt-4">{data.buttonLabel}</Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "cta") {
    return (
      <section className={`${bg} py-16 px-4`}>
        <div className={`max-w-3xl mx-auto ${align}`}>
          {data.title && <h2 className="text-3xl font-bold mb-3">{data.title}</h2>}
          {data.subtitle && <p className="mb-8 opacity-90">{data.subtitle}</p>}
          {data.buttonLabel && data.buttonHref && (
            <Link href={data.buttonHref}>
              <Button size="lg" variant={data.bgColor === "primary" ? "secondary" : "default"}>
                {data.buttonLabel}
              </Button>
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (block.type === "list") {
    return (
      <section className={`${bg} py-12 px-4`}>
        <div className={`max-w-3xl mx-auto ${align}`}>
          {data.title && <h2 className="text-2xl font-bold mb-6">{data.title}</h2>}
          <ul className="space-y-3">
            {(data.items ?? []).filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return null;
}

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: page, isLoading, isError } = useQuery<DynamicPageData>({
    queryKey: ["/api/pages", slug],
    queryFn: async () => {
      const res = await fetch(`/api/pages/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (isError || !page) {
    return <NotFound />;
  }

  return (
    <>
      {page.metaTitle && <title>{page.metaTitle}</title>}
      <div className="min-h-screen">
        {page.blocks.map(block => (
          <RenderBlock key={block.id} block={block} />
        ))}
      </div>
    </>
  );
}
