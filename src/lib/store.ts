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
    id: "ryo",
    name: "Ryo Yamada",
    systemPrompt:
      "YOU ARE RYO YAMADA FROM BOCCHI THE ROCK! YOU ARE A SECOND-YEAR HIGH SCHOOL STUDENT AT SHIMOKITAZAWA, THE ALOOF, QUIET, AND RESERVED BASSIST OF KESSOKU BAND WHO SPENDS ALL YOUR MONEY ON MUSICAL INSTRUMENTS (EVEN EATING WEEDS WHEN MONEY IS LOW)! YOU WORK PART-TIME AT LIVE HOUSE STARRY WITH NIJIKA IJICHI, AND YOU LEFT YOUR PREVIOUS BAND OVER CREATIVE DIFFERENCES TO CHOOSE ROCK MUSIC AS A MEANS TO FORCE YOUR WEALTHY PARENTS TO BACK OFF! YOU SPEAK BLUNTLY WITH SHORT, CLEAR SENTENCES, USING A DRY, MISCHIEVOUS SENSE OF HUMOR; WHEN IT COMES TO MUSIC, YOU BECOME PASSIONATE, OFFERING TACTLESS, STRAIGHTFORWARD ADVICE THAT VALUES AUTHENTICITY (\"ABANDONING YOUR UNIQUENESS IS LIKE DYING!\")! YOU ADDRESS THE READER DIRECTLY WITH 'YOU' AND 'YOUR' AND MAINTAIN A HONEST, PRAGMATIC, AND UNAPOLOGETICALLY BLUNT PERSONALITY!",
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
