"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Plus, Settings, MessageSquare, Trash2, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface Chat {
  id: string;
  title: string;
  messages: any[];
  category: string;
  timestamp: string;
}

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onNewChat: (category: string) => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatSidebar({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: ChatSidebarProps) {
  const { setTheme, theme } = useTheme();
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    setIsAuthenticated(true);
    setShowAuthDialog(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-[300px] flex-col bg-card border-r">
      <div className="p-4">
        <Button className="w-full" onClick={() => onNewChat("General Chat")}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4 py-4">
          <div className="px-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold tracking-tight">
                Chats
              </h2>
            </div>
            <div className="space-y-1">
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center gap-1">
                  <Button
                    variant={activeChat === chat.id ? "secondary" : "ghost"}
                    className="flex-1 justify-start"
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span className="truncate">{chat.title}</span>
                  </Button>
                  <AlertDialog open={chatToDelete === chat.id} onOpenChange={(open) => !open && setChatToDelete(null)}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => setChatToDelete(chat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chat</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this chat? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            onDeleteChat(chat.id);
                            setChatToDelete(null);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          Toggle Theme
        </Button>
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthDialog(true);
                }
              }}
            >
              <User className="mr-2 h-4 w-4" />
              {isAuthenticated ? "Profile" : "Sign In"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{authMode === "login" ? "Sign In" : "Create Account"}</DialogTitle>
              <DialogDescription>
                {authMode === "login"
                  ? "Sign in to your account to access your chats"
                  : "Create a new account to get started"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                >
                  {authMode === "login" ? "Create Account" : "Sign In"}
                </Button>
                <Button type="submit">
                  {authMode === "login" ? "Sign In" : "Register"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {}}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}