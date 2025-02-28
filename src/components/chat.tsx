"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/store";
import { useEffect, useRef } from "react";
import { LoadingDots } from "./loading-dots";

export function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat when currentPreset changes
  useEffect(() => {
    setMessages([]);
  }, [currentPreset, setMessages]);

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto px-4 lg:px-0 h-full">
      <ScrollArea className="flex-1 pt-16 lg:pt-4 pb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === "assistant" ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {status === "submitted" && (
            <div className="flex flex-col items-start">
              <div className="rounded-lg px-4 py-2 bg-muted">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 border-t p-4 flex items-center gap-2 bg-background z-10"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          disabled={status !== "ready"}
        />
        <Button type="submit" disabled={status !== "ready"}>
          Send
        </Button>
      </form>
    </div>
  );
}
