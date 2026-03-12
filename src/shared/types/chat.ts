export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  sentAt: string; // ISO
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  updatedAt: string;
}
