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
import { useChatStore } from "@/lib/store";

export function CreatePresetDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [description, setDescription] = useState("");
  const { addPreset } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !systemPrompt) return;

    // Create ID from name: convert to lowercase, replace spaces with hyphens, take first 20 chars
    const id = name.toLowerCase().replace(/\s+/g, "-").slice(0, 20);

    addPreset({
      id,
      name,
      description,
      systemPrompt,
    });

    setName("");
    setSystemPrompt("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Create New Chatbot
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Chatbot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Code Assistant"
              required
              maxLength={50}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description for your chatbot..."
              className="h-20 resize-none overflow-y-auto break-all"
              maxLength={500}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="systemPrompt" className="text-sm font-medium">
              System Instructions
            </label>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter the instructions for your chatbot..."
              className="h-32 resize-none break-all"
              required
              maxLength={32000}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Chatbot
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
