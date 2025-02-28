import { Chat } from "@/components/chat";
import { ChatSidebar } from "@/components/chat-sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <ChatSidebar />
      <Chat />
    </div>
  );
}
