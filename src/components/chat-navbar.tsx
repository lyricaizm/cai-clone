"use client";

import { useChatStore } from "@/lib/store";

export function ChatNavbar() {
  const { currentPreset } = useChatStore();

  if (!currentPreset) return null;

  return (
    <div className="sticky top-0 left-0 right-0 min-h-16 border-b bg-background/80 backdrop-blur-sm z-10">
      <div className="h-full max-w-4xl mx-auto px-16 lg:px-0 flex items-center">
        <div>
          <h2 className="font-semibold">{currentPreset.name}</h2>
          <p className="text-sm text-muted-foreground">
            {currentPreset.description}
          </p>
        </div>
      </div>
    </div>
  );
}
