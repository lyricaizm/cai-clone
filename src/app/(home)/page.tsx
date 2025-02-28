import { CreatePresetDialog } from "@/components/create-preset-dialog";
import { ChatbotGrid } from "@/components/chatbot-grid";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore Chatbots</h1>
        <CreatePresetDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChatbotGrid />
      </div>
    </div>
  );
}
