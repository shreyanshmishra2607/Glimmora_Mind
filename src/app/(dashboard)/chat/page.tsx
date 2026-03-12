import { ChatView } from "@/components/chat/ChatView";

export default function ChatPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">AI Emotional Companion</h1>
      <ChatView />
    </div>
  );
}
