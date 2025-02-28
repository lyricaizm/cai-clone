import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 border-t p-4 flex items-center gap-2 bg-background z-10"
    >
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Say something..."
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        Send
      </Button>
    </form>
  );
}
