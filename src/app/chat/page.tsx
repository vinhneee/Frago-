"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ChatPage() {
  const [currentUser] = useState({
    id: "current-user",
    name: "John Doe", 
    userType: "investor" as const
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">FranchiseSwipe</h1>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages</h2>
          <p className="text-gray-600">
            Communicate with your matched franchise partners
          </p>
        </div>

        <ChatInterface currentUser={currentUser} />
      </div>
    </div>
  );
}