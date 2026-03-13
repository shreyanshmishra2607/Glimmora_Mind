"use client";

import { useRef, useEffect, useState } from "react";
import { useChat, useSendMessage, useAuth } from "@/shared/hooks";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Sparkles, Send } from "lucide-react";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );
}

export function ChatView() {
  const { messages, isLoading, isError, error } = useChat();
  const { sendMessage, isPending } = useSendMessage();
  const { user } = useAuth();
  const [input, setInput]   = useState("");
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isPending) return;
    setInput("");
    try {
      await sendMessage(text);
    } catch {
      // error handled via toast
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive text-sm">
        {error?.message ?? "Failed to load conversation"}
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-border rounded-xl overflow-hidden shadow-sm bg-card"
      style={{ height: "calc(100dvh - 8rem)" }}
    >
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card shrink-0">
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">Glimmora AI</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
            Always here for you
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
            <span className="h-3 w-3 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin" />
            Loading conversation…
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">Hello! I&apos;m your AI companion.</p>
              <p className="text-xs text-muted-foreground mt-1">
                How are you feeling today?
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2 animate-slide-up",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Avatar */}
              {msg.role === "assistant" ? (
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0 mb-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              ) : (
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-0.5 text-primary text-xs font-semibold">
                  {user ? getInitials(user.name) : "U"}
                </div>
              )}

              {/* Bubble */}
              <div
                className={cn(
                  "max-w-[78%] sm:max-w-[68%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {isPending && (
          <div className="flex items-end gap-2">
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-border bg-card shrink-0"
      >
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            disabled={isPending}
            className="flex-1 rounded-xl"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isPending}
            loading={isPending}
            className="h-10 w-10 rounded-xl shrink-0"
          >
            {!isPending && <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
