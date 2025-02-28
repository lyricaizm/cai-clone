"use client";

import { Chat } from "@/components/chat";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useChatStore } from "@/lib/store";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const presetId = searchParams.get("preset");
  const { presets, setCurrentPreset } = useChatStore();

  useEffect(() => {
    if (presetId) {
      const preset = presets.find((p) => p.id === presetId);
      if (preset) {
        setCurrentPreset(preset);
      }
    }
  }, [presetId, presets, setCurrentPreset]);

  return <Chat />;
}
