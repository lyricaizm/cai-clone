"use client";

import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/lib/store";
import { useEffect } from "react";
import { ChatMessages } from "./chat/chat-messages";
import { ChatInput } from "./chat/chat-input";
import { ChatNavbar } from "./chat/chat-navbar";

export function Chat() {
  const { currentPreset, selectedModel } = useChatStore();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    stop,
  } = useChat({
    api: "/api/chat",
    body: {
      systemPrompt: currentPreset?.systemPrompt,
      model: selectedModel.model,
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
            stop={stop}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}
