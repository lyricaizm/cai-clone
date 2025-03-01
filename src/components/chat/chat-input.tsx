import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Square } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
  status: string;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  status,
}: ChatInputProps) {
  const isGenerating = status === "streaming";

  return (
    <div className="sticky bottom-0 border-t bg-background z-10">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          disabled={isLoading}
          className="flex-1"
        />
        {isGenerating ? (
          <Button type="button" onClick={stop} variant="secondary">
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        )}
      </form>
    </div>
  );
}
