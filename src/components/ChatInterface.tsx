"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "document" | "system";
}

interface ChatContact {
  id: string;
  name: string;
  company: string;
  userType: "brand" | "investor";
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
  matchedDate: Date;
}

interface ChatInterfaceProps {
  currentUser: {
    id: string;
    name: string;
    userType: "brand" | "investor";
  };
}

export default function ChatInterface({ currentUser }: ChatInterfaceProps) {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock contacts data
  const [contacts] = useState<ChatContact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      company: "QuickBite Burgers",
      userType: "brand",
      lastMessage: "I'd like to discuss the franchise terms for the Seattle market.",
      lastMessageTime: new Date("2024-01-15T14:30:00"),
      unreadCount: 2,
      isOnline: true,
      matchedDate: new Date("2024-01-14T10:00:00")
    },
    {
      id: "2", 
      name: "Michael Chen",
      company: "TechFix Solutions",
      userType: "brand",
      lastMessage: "New match! Let's schedule a call to discuss opportunities.",
      lastMessageTime: new Date("2024-01-15T09:15:00"),
      unreadCount: 1,
      isOnline: false,
      matchedDate: new Date("2024-01-15T09:00:00")
    },
    {
      id: "3",
      name: "David Park", 
      company: "Park Investment Group",
      userType: "investor",
      lastMessage: "Thanks for the information. I'm interested in multi-unit development.",
      lastMessageTime: new Date("2024-01-14T16:45:00"),
      unreadCount: 0,
      isOnline: true,
      matchedDate: new Date("2024-01-13T14:20:00")
    }
  ]);

  // Mock messages for selected contact
  useEffect(() => {
    if (selectedContact) {
      const mockMessages: Message[] = [
        {
          id: "1",
          senderId: selectedContact.id,
          senderName: selectedContact.name,
          content: `Hi ${currentUser.name}! I'm interested in learning more about ${currentUser.userType === "brand" ? "your franchise opportunity" : "potential investment opportunities"}.`,
          timestamp: new Date("2024-01-15T10:00:00"),
          type: "text"
        },
        {
          id: "2",
          senderId: currentUser.id,
          senderName: currentUser.name,
          content: `Hello ${selectedContact.name}! I'd be happy to discuss this further. What specific aspects would you like to know more about?`,
          timestamp: new Date("2024-01-15T10:15:00"),
          type: "text"
        },
        {
          id: "3",
          senderId: selectedContact.id,
          senderName: selectedContact.name,
          content: selectedContact.lastMessage || "Looking forward to our conversation!",
          timestamp: selectedContact.lastMessageTime || new Date(),
          type: "text"
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedContact, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: message,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };

  return (
    <div className="flex h-[600px] bg-white border rounded-lg overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <p className="text-sm text-gray-600">
            {contacts.filter(c => c.unreadCount > 0).length} unread conversations
          </p>
        </div>
        
        <div className="overflow-y-auto h-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b cursor-pointer hover:bg-white transition-colors ${
                selectedContact?.id === contact.id ? "bg-white border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                    <div className="flex items-center space-x-2">
                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-500">
                          {formatTime(contact.lastMessageTime)}
                        </span>
                      )}
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm text-blue-600 truncate">{contact.company}</p>
                    <Badge variant="outline" className="text-xs">
                      {contact.userType === "brand" ? "Brand" : "Investor"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {contact.lastMessage || "Start a conversation..."}
                  </p>
                  
                  <p className="text-xs text-gray-400 mt-1">
                    Matched {formatDate(contact.matchedDate)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {selectedContact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-blue-600">{selectedContact.company}</p>
                      <span className="text-gray-400">•</span>
                      <span className={`text-xs ${selectedContact.isOnline ? "text-green-600" : "text-gray-400"}`}>
                        {selectedContact.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    Share Documents
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule Call
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === currentUser.id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-900 border"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === currentUser.id ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="resize-none border-gray-300"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Send
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>Press Enter to send</span>
                <Separator orientation="vertical" className="h-4" />
                <button className="hover:text-blue-600">Attach file</button>
                <button className="hover:text-blue-600">Add emoji</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600">
                Choose a contact from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}