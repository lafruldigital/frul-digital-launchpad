import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Send, Lock, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  request_id: string;
  sender_id: string;
  sender_role: "admin" | "client";
  content: string;
  created_at: string;
}

interface Props {
  requestId: string;
  currentUserId: string;
  currentRole: "admin" | "client";
  closed: boolean;
  reopenedForSav: boolean;
  onReopenForSav?: () => Promise<void> | void;
}

export function ChatThread({
  requestId,
  currentUserId,
  currentRole,
  closed,
  reopenedForSav,
  onReopenForSav,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const readOnly = closed && !reopenedForSav;

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("request_id", requestId)
        .order("created_at", { ascending: true });
      if (active && data) setMessages(data as Message[]);
    };
    load();

    const channel = supabase
      .channel(`messages-${requestId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `request_id=eq.${requestId}` },
        (payload) => {
          setMessages((prev) =>
            prev.some((m) => m.id === (payload.new as Message).id)
              ? prev
              : [...prev, payload.new as Message],
          );
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [requestId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending || readOnly) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      request_id: requestId,
      sender_id: currentUserId,
      sender_role: currentRole,
      content: text,
    } as any);
    setSending(false);
    if (error) {
      toast.error("Impossible d'envoyer le message", { description: error.message });
    } else {
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[480px] rounded-2xl border border-primary/15 bg-surface-dark/70 backdrop-blur overflow-hidden">
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="font-medium text-surface-dark-foreground">Conversation projet</span>
          {readOnly && (
            <span className="ml-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-zinc-400">
              <Lock className="w-3 h-3" /> Lecture seule
            </span>
          )}
        </div>
        <span className="text-[11px] text-surface-dark-foreground/40">
          Historique préservé · preuve légale
        </span>
      </div>

      <div className={cn("flex-1 overflow-y-auto px-4 py-5 space-y-3", readOnly && "opacity-70")}>
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-sm text-surface-dark-foreground/40">
            Aucun message pour le moment.<br />Démarrez la conversation ci-dessous.
          </div>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === currentUserId;
          return (
            <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed border",
                  mine
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_18px_hsl(0_85%_50%/0.35)]"
                    : "bg-white/[0.04] text-surface-dark-foreground border-white/10",
                )}
              >
                <div className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">
                  {m.sender_role === "admin" ? "Frul'digital" : "Client"}
                </div>
                <div className="whitespace-pre-wrap break-words">{m.content}</div>
                <div className="text-[10px] opacity-60 mt-1 text-right">
                  {new Date(m.created_at).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {readOnly ? (
        <div className="border-t border-white/5 bg-black/40 px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-sm text-surface-dark-foreground/60 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Ce dossier est clôturé. L'historique reste consultable.
            </p>
            {currentRole === "client" && onReopenForSav && (
              <Button onClick={() => onReopenForSav()} variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                <RotateCcw className="w-4 h-4 mr-2" /> Rouvrir pour SAV
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="border-t border-white/5 bg-black/40 px-3 py-3">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Écrivez votre message…"
              className="flex-1 resize-none bg-surface-darker border border-white/10 rounded-xl px-4 py-3 text-sm text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
            <Button onClick={send} disabled={sending || !input.trim()} className="h-12 px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-surface-dark-foreground/30 mt-1.5 pl-1">
            Entrée pour envoyer · Maj+Entrée pour un saut de ligne
          </p>
        </div>
      )}
    </div>
  );
}