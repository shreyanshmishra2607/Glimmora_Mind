import { ChatView } from "@/components/chat/ChatView";

export default function ChatPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 shrink-0">AI Emotional Companion</h1>
      <div className="flex-1 min-h-0">
        <ChatView />
      </div>
    </div>
  );
}
