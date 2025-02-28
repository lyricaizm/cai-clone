import { ChatSidebar } from "@/components/chat-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat App",
  description: "Chat with different AI personalities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ChatSidebar />
      {children}
    </div>
  );
}
