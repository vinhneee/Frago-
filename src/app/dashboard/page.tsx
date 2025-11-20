"use client";

import { useState } from "react";
import SwipeInterface from "@/components/SwipeInterface";
import FilterSidebar from "@/components/FilterSidebar";
import AIRecommendations from "@/components/AIRecommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function DashboardPage() {
  const [userType, setUserType] = useState<"brand" | "investor">("investor");
  const [activeTab, setActiveTab] = useState<"discover" | "matches" | "profile">("discover");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // Mock user data
  const userData = {
    name: "John Doe",
    company: userType === "brand" ? "Burger Palace" : "Investment Partners LLC",
    profileComplete: 85,
    totalMatches: 12,
    activeChats: 3,
    profileViews: 156
  };

  const mockMatches = [
    {
      id: "1",
      name: "Sarah Johnson",
      company: "QuickBite Burgers",
      matchDate: "2024-01-15",
      status: "active",
      lastMessage: "Interested in discussing franchise terms..."
    },
    {
      id: "2",
      name: "Michael Chen", 
      company: "TechFix Solutions",
      matchDate: "2024-01-14",
      status: "new",
      lastMessage: "New match! Start the conversation."
    },
    {
      id: "3",
      name: "Lisa Rodriguez",
      company: "FitZone Studios", 
      matchDate: "2024-01-13",
      status: "active",
      lastMessage: "Let's schedule a call to discuss details."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Frago</h1>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="font-semibold text-gray-900">{userData.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Type Selector (Demo) */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={userType === "investor" ? "default" : "ghost"}
                onClick={() => setUserType("investor")}
                className="text-xs"
              >
                Investor View
              </Button>
              <Button
                size="sm"
                variant={userType === "brand" ? "default" : "ghost"}
                onClick={() => setUserType("brand")}
                className="text-xs"
              >
                Brand View
              </Button>
            </div>
            
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "discover" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("discover")}
            >
              <span className="mr-2">🔍</span>
              Discover
            </Button>
            <Button
              variant={activeTab === "matches" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("matches")}
            >
              <span className="mr-2">💕</span>
              Matches ({userData.totalMatches})
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <span className="mr-2">👤</span>
              Profile
            </Button>
          </nav>

          {/* Stats Card */}
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profile Complete</span>
                  <span className="font-medium">{userData.profileComplete}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${userData.profileComplete}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <div className="font-bold text-lg text-blue-600">{userData.profileViews}</div>
                  <div className="text-gray-500">Profile Views</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-green-600">{userData.activeChats}</div>
                  <div className="text-gray-500">Active Chats</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "discover" && (
            <div className="flex gap-6">
              <div className="flex-1 max-w-2xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Discover {userType === "brand" ? "Investors" : "Franchise Opportunities"}
                  </h2>
                  <p className="text-gray-600">
                    Swipe through potential matches in your area
                  </p>
                </div>
                <SwipeInterface userType={userType} />
              </div>
              
              {/* AI Recommendations Sidebar */}
              <aside className="w-80 space-y-4">
                <AIRecommendations userType={userType} userId="current-user" />
              </aside>
            </div>
          )}

          {activeTab === "matches" && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Matches</h2>
                <p className="text-gray-600">Connect with your potential business partners</p>
              </div>

              <div className="grid gap-4">
                {mockMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-600">
                              {match.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{match.name}</h3>
                            <p className="text-blue-600">{match.company}</p>
                            <p className="text-sm text-gray-500">{match.lastMessage}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={match.status === "new" ? "default" : "outline"}>
                            {match.status === "new" ? "New Match!" : "Active"}
                          </Badge>
                          <Link href="/chat">
                            <Button size="sm">
                              Start Chat
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Link href="/matches">
                  <Button variant="outline">
                    View All Matches
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                <p className="text-gray-600">Manage your {userType} profile information</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {userData.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{userData.name}</h3>
                    <p className="text-blue-600">{userData.company}</p>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      Edit Profile Information
                    </Button>
                    <Button className="w-full" variant="outline">
                      Upload Profile Photos
                    </Button>
                    <Button className="w-full" variant="outline">
                      Manage Preferences
                    </Button>
                    <Button className="w-full" variant="outline">
                      Privacy Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        userType={userType}
        onFiltersChange={setFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}