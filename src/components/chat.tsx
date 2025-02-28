"use client";

import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/lib/store";
import { useEffect } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatNavbar } from "./chat-navbar";

export function Chat() {
  const { currentPreset } = useChatStore();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      systemPrompt: currentPreset?.systemPrompt,
    },
  });

  // Reset chat when currentPreset changes
  useEffect(() => {
    setMessages([]);
  }, [currentPreset, setMessages]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatNavbar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4">
          <ChatMessages
            messages={messages}
            isLoading={status === "submitted"}
          />
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={status !== "ready"}
          />
        </div>
      </div>
    </div>
  );
}
