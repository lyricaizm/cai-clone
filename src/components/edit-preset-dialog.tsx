"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useChatStore, Preset } from "@/lib/store";
import { Pencil } from "lucide-react";

interface EditPresetDialogProps {
  preset: Preset;
}

export function EditPresetDialog({ preset }: EditPresetDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(preset.name);
  const [systemPrompt, setSystemPrompt] = useState(preset.systemPrompt);
  const [description, setDescription] = useState(preset.description || "");
  const { updatePreset } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !systemPrompt) return;

    updatePreset(preset.id, {
      name,
      description,
      systemPrompt,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Chatbot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Code Assistant"
              required
              className="break-words"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description for your chatbot..."
              className="h-20 resize-none break-words"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">System Instructions</label>
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter the instructions for your chatbot..."
              className="h-32 resize-none break-words"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
