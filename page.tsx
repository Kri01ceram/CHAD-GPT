"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  category: string;
  timestamp: string;
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const currentChat = chats.find((chat) => chat.id === activeChat);

  const handleNewChat = (category: string = "General Chat") => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      category,
      timestamp: new Date().toISOString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 ? content.slice(0, 30) : chat.title,
            }
          : chat
      )
    );

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a simulated AI response. The Python backend with MCP will be implemented soon.",
        timestamp: new Date().toISOString(),
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChat}
        onDeleteChat={handleDeleteChat}
      />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {activeChat ? (
          <div className="flex flex-col w-full max-w-2xl h-full justify-between">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto w-full">
              <ChatMessages messages={currentChat?.messages || []} />
            </div>

            {/* Chat Input */}
            <div className="w-full">
              <ChatInput onSend={handleSendMessage} onVoiceInput={() => {}} onFileUpload={() => {}} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome to AI Assistant</h2>
              <p className="text-muted-foreground mb-4">Start a new chat to begin the conversation</p>
              <Button onClick={() => handleNewChat()}>Start New Chat</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
