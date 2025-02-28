"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store";
import { CreatePresetDialog } from "./create-preset-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SettingsDialog } from "./settings-dialog";

function ChatSidebar({ onToggle }: { onToggle: () => void }) {
  const { presets, currentPreset, setCurrentPreset, clearMessages } =
    useChatStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/";

  const handlePresetChange = (preset: (typeof presets)[0]) => {
    clearMessages();
    setCurrentPreset(preset);
    // Create new URLSearchParams object to modify the query
    const params = new URLSearchParams(searchParams);
    params.set("preset", preset.id);
    // Update the URL without refreshing the page
    router.replace(`/chat?${params.toString()}`);
  };

  return (
    <div className="w-64 border-r h-screen p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Chatbots</h2>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <X size={20} />
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <CreatePresetDialog />
        <div className="h-px bg-border my-2" />
        {presets.map((preset) =>
          isHomePage ? (
            <Link
              key={preset.id}
              href={`/chat?preset=${preset.id}`}
              className="w-full"
            >
              <Button variant="ghost" className="w-full justify-start">
                {preset.name}
              </Button>
            </Link>
          ) : (
            <Button
              key={preset.id}
              variant={currentPreset?.id === preset.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handlePresetChange(preset)}
            >
              {preset.name}
            </Button>
          )
        )}
      </div>
      <div className="h-px bg-border my-2" />
      <SettingsDialog />
    </div>
  );
}

export interface CollapsibleSidebarProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export function CollapsibleSidebar({ onOpenChange }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Set initial state based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const shouldBeOpen = window.innerWidth >= 1024;
      setIsOpen(shouldBeOpen);
      onOpenChange?.(shouldBeOpen);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [onOpenChange]);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  return (
    <>
      {/* Open button - only visible when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => handleToggle(true)}
        >
          <Menu size={20} />
        </Button>
      )}

      <aside
        className={cn(
          "shrink-0 transition-[width] duration-200 ease-in-out overflow-hidden",
          isOpen ? "w-64" : "w-0"
        )}
      >
        <div className="w-64">
          <ChatSidebar onToggle={() => handleToggle(false)} />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => handleToggle(false)}
        />
      )}
    </>
  );
}
