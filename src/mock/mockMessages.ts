import type { Message, Conversation } from "@/shared/types";

const defaultMessages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    role: "assistant",
    content: "Hello! I'm here to support you. How are you feeling today?",
    sentAt: "2025-03-12T09:00:00Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    role: "user",
    content: "A bit anxious about work.",
    sentAt: "2025-03-12T09:01:00Z",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    role: "assistant",
    content: "It's okay to feel that way. Would you like to talk about what's causing the anxiety, or would you prefer to try a short grounding exercise first?",
    sentAt: "2025-03-12T09:01:30Z",
  },
];

const conversations: Map<string, Conversation> = new Map([
  [
    "conv-1",
    {
      id: "conv-1",
      userId: "user-1",
      messages: defaultMessages,
      updatedAt: "2025-03-12T09:01:30Z",
    },
  ],
]);

export function getMockConversation(conversationId: string): Conversation | null {
  return conversations.get(conversationId) ?? null;
}

export function getOrCreateConversation(userId: string, conversationId: string): Conversation {
  const existing = conversations.get(conversationId);
  if (existing) return existing;
  const conv: Conversation = {
    id: conversationId,
    userId,
    messages: [],
    updatedAt: new Date().toISOString(),
  };
  conversations.set(conversationId, conv);
  return conv;
}

export function appendMockMessage(conversationId: string, message: Message): void {
  const conv = conversations.get(conversationId);
  if (conv) {
    conv.messages.push(message);
    conv.updatedAt = message.sentAt;
  }
}

export const MOCK_AI_REPLIES = [
  "I hear you. It's okay to feel that way. Would you like to explore that a bit more?",
  "Thank you for sharing. Many people experience something similar. What would feel most helpful right now?",
  "That makes sense. How has this been affecting your day-to-day?",
  "I'm here with you. Would you like to try a brief breathing exercise, or keep talking?",
  "It takes courage to open up. Is there one small step you could take today that might help?",
];
