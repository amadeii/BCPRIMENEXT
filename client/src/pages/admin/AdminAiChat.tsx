import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, AlertCircle, Loader2, Trash2 } from "lucide-react";
import type { AiSetting } from "@shared/schema";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AdminAiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: settings = [] } = useQuery<AiSetting[]>({
    queryKey: ["/api/admin/ai-settings"],
  });

  const active = settings.find(s => s.active);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const allMessages = [...messages, userMsg];
      const res = await apiRequest("POST", "/api/admin/ai-chat", { messages: allMessages });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "❌ Erro ao conectar com a IA. Verifique as configurações." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <AdminLayout title="Assistente de IA">
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-4">
          {active ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white">
                <Bot className="w-3 h-3 mr-1" />
                {active.label} — {active.model}
              </Badge>
              <span className="text-xs text-muted-foreground">Ativo</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Nenhum provedor ativo. </span>
              <Link href="/admin/ai-settings" className="text-sm underline">Configurar IA</Link>
            </div>
          )}
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setMessages([])} data-testid="button-clear-chat">
              <Trash2 className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-4 bg-muted/20">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-3">
              <Bot className="w-12 h-12 opacity-40" />
              <div>
                <p className="font-medium">Assistente BcprimeNEXT</p>
                <p className="text-sm mt-1">Pergunte sobre textos, sugestões de conteúdo, blog, planos e mais.</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {[
                    "Crie um texto para o hero da home",
                    "Sugira um post para o blog sobre Simples Nacional",
                    "Melhore a descrição do plano Growth",
                    "Crie um título SEO para a página de contabilidade",
                  ].map(s => (
                    <button
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-full border hover:bg-muted transition-colors"
                      onClick={() => setInput(s)}
                      data-testid={`suggestion-${s.slice(0, 10)}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} data-testid={`message-${i}`} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-green-600" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-background border"
              }`}>
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-green-600" />
              </div>
              <div className="bg-background border rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Pensando...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <Textarea
            data-testid="input-chat-message"
            placeholder={active ? "Digite sua mensagem... (Enter para enviar)" : "Configure um provedor de IA primeiro"}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={!active || loading}
            className="resize-none min-h-[52px] max-h-32"
            rows={2}
          />
          <Button
            data-testid="button-send-message"
            onClick={sendMessage}
            disabled={!active || loading || !input.trim()}
            className="self-end"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
