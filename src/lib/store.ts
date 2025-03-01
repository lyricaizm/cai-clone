import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Preset = {
  id: string;
  name: string;
  description?: string;
  systemPrompt: string;
};

export const models = [
  {
    id: "gemini",
    name: "Gemini 2.0 Flash Lite",
    model: "google/gemini-2.0-flash-lite-preview-02-05:free",
  },
  {
    id: "dolphin",
    name: "Dolphin 3.0 Mistral",
    model: "cognitivecomputations/dolphin3.0-mistral-24b:free",
  },
  {
    id: "mistral",
    name: "Mistral Nemo",
    model: "mistralai/mistral-nemo:free",
  },
] as const;

interface ChatStore {
  messages: Message[];
  presets: Preset[];
  currentPreset: Preset | null;
  addMessage: (message: Message) => void;
  setCurrentPreset: (preset: Preset) => void;
  addPreset: (preset: Preset) => void;
  clearMessages: () => void;
  selectedModel: (typeof models)[number];
  setSelectedModel: (model: (typeof models)[number]) => void;
  updatePreset: (id: string, updates: Partial<Preset>) => void;
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
      clearMessages: () => set({ messages: [] }),
      selectedModel: models[0],
      setSelectedModel: (model) => set({ selectedModel: model }),
      updatePreset: (id, updates) =>
        set((state) => ({
          presets: state.presets.map((preset) =>
            preset.id === id ? { ...preset, ...updates } : preset
          ),
          // Update currentPreset if it's being edited
          currentPreset:
            state.currentPreset?.id === id
              ? { ...state.currentPreset, ...updates }
              : state.currentPreset,
        })),
    }),
    {
      name: "chat-store",
    }
  )
);
