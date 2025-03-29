"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Upload } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceInput?: () => void;
  onFileUpload?: () => void;
}

export function ChatInput({ onSend, onVoiceInput, onFileUpload }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-card p-4">
      <div className="flex items-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={onFileUpload}
        >
          <Upload className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={onVoiceInput}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[60px]"
          rows={1}
        />
        <Button
          className="shrink-0"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}