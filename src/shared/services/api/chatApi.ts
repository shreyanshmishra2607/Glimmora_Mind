import { delay } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import {
  getMockConversation,
  getOrCreateConversation,
  appendMockMessage,
  MOCK_AI_REPLIES,
} from "@/mock";
import type { Conversation, Message } from "@/shared/types";

const DEFAULT_CONVERSATION_ID = "conv-1";

export async function getConversation(
  conversationId: string,
  userId: string
): Promise<Conversation | null> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new Error("Network error");
    const conv = getMockConversation(conversationId) ?? getOrCreateConversation(userId, conversationId);
    return conv;
  });
}

export async function sendMessage(
  conversationId: string,
  userId: string,
  content: string
): Promise<{ userMessage: Message; assistantMessage: Message }> {
  await withDelay(async () => {
    if (shouldSimulateError()) throw new Error("Network error");
    return undefined;
  });

  const conv = getOrCreateConversation(userId, conversationId);
  const userMessage: Message = {
    id: `msg-u-${Date.now()}`,
    conversationId,
    role: "user",
    content,
    sentAt: new Date().toISOString(),
  };
  appendMockMessage(conversationId, userMessage);

  // Simulate AI reply delay (800–1500 ms)
  await delay();
  const aiContent =
    MOCK_AI_REPLIES[Math.floor(Math.random() * MOCK_AI_REPLIES.length)];
  const assistantMessage: Message = {
    id: `msg-a-${Date.now()}`,
    conversationId,
    role: "assistant",
    content: aiContent,
    sentAt: new Date().toISOString(),
  };
  appendMockMessage(conversationId, assistantMessage);

  return { userMessage, assistantMessage };
}

export { DEFAULT_CONVERSATION_ID };
