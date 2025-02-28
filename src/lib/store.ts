import { create } from "zustand";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Preset = {
  id: string;
  name: string;
  systemPrompt: string;
};

interface ChatStore {
  messages: Message[];
  presets: Preset[];
  currentPreset: Preset | null;
  addMessage: (message: Message) => void;
  setCurrentPreset: (preset: Preset) => void;
}

const defaultPresets: Preset[] = [
  {
    id: "default",
    name: "General Assistant",
    systemPrompt: "You are a helpful AI assistant.",
  },
  {
    id: "code",
    name: "Code Assistant",
    systemPrompt:
      "You are a helpful programming assistant. You help with coding tasks, debugging, and explaining technical concepts.",
  },
  {
    id: "creative",
    name: "Creative Writing",
    systemPrompt:
      "You are a creative writing assistant. You help with storytelling, poetry, and creative content generation.",
  },
];

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  presets: defaultPresets,
  currentPreset: defaultPresets[0],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setCurrentPreset: (preset) => set({ currentPreset: preset }),
}));
