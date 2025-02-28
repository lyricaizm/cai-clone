import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Preset = {
  id: string;
  name: string;
  description: string | undefined;
  systemPrompt: string;
};

interface ChatStore {
  messages: Message[];
  presets: Preset[];
  currentPreset: Preset | null;
  addMessage: (message: Message) => void;
  setCurrentPreset: (preset: Preset) => void;
  addPreset: (preset: Preset) => void;
}

const defaultPresets: Preset[] = [
  {
    id: "default",
    name: "General Assistant",
    description: "General assistant for anything.",
    systemPrompt: "You are a helpful AI assistant.",
  },
];

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      presets: defaultPresets,
      currentPreset: defaultPresets[0],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setCurrentPreset: (preset) => set({ currentPreset: preset }),
      addPreset: (preset) =>
        set((state) => ({ presets: [...state.presets, preset] })),
    }),
    {
      name: "chat-store",
    }
  )
);
