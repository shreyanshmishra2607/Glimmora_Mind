"use client";

import { useRef, useEffect, useState } from "react";
import { useChat, useSendMessage } from "@/shared/hooks";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ChatView() {
  const { messages, isLoading, isError, error } = useChat();
  const { sendMessage, isPending } = useSendMessage();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isPending) return;
    setInput("");
    try {
      await sendMessage(text);
    } catch {
      // Error could be shown via toast
    }
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border p-4 text-destructive">
        {error?.message ?? "Failed to load conversation"}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] border border-border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Say hello to start the conversation.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isPending && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t border-border flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isPending}
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim() || isPending} loading={isPending}>
          Send
        </Button>
      </form>
    </div>
  );
}
