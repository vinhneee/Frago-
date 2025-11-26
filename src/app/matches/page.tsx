"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Match {
  id: string;
  name: string;
  company: string;
  userType: "brand" | "investor";
  location: string;
  industry: string;
  matchDate: Date;
  status: "new" | "active" | "archived";
  compatibility: number;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  profileImage?: string;
  keyMetrics: {
    budget?: number;
    franchiseFee?: number;
    experience?: string;
    storeCount?: number;
  };
  tags: string[];
}

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const [matches] = useState<Match[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      company: "QuickBite Burgers", 
      userType: "brand",
      location: "San Francisco, CA",
      industry: "Fast Food",
      matchDate: new Date("2024-01-15T14:30:00"),
      status: "active",
      compatibility: 92,
      lastMessage: "I'd like to discuss franchise terms for the Seattle market.",
      lastMessageTime: new Date("2024-01-15T16:45:00"),
      unreadCount: 2,
      keyMetrics: {
        franchiseFee: 45000,
        storeCount: 127
      },
      tags: ["Fast Casual", "Proven Model", "High ROI"]
    },
    {
      id: "2",
      name: "Michael Chen",
      company: "TechFix Solutions",
      userType: "brand", 
      location: "Austin, TX",
      industry: "Technology Services",
      matchDate: new Date("2024-01-15T09:00:00"),
      status: "new",
      compatibility: 88,
      lastMessage: "New match! Let's discuss opportunities.",
      lastMessageTime: new Date("2024-01-15T09:15:00"),
      unreadCount: 1,
      keyMetrics: {
        franchiseFee: 35000,
        storeCount: 89
      },
      tags: ["Tech Services", "Growing Market", "Low Overhead"]
    },
    {
      id: "3",
      name: "David Park",
      company: "Park Investment Group", 
      userType: "investor",
      location: "Seattle, WA",
      industry: "Multi-Unit Development",
      matchDate: new Date("2024-01-13T14:20:00"),
      status: "active",
      compatibility: 85,
      lastMessage: "Thanks for the information. I'm interested in multi-unit development.",
      lastMessageTime: new Date("2024-01-14T16:45:00"),
      unreadCount: 0,
      keyMetrics: {
        budget: 500000,
        experience: "10+ years"
      },
      tags: ["Multi-Unit", "Experienced", "Pacific NW"]
    },
    {
      id: "4",
      name: "Jennifer Smith",
      company: "Smith Capital Partners",
      userType: "investor",
      location: "Chicago, IL", 
      industry: "Food & Beverage",
      matchDate: new Date("2024-01-12T11:30:00"),
      status: "archived",
      compatibility: 78,
      unreadCount: 0,
      keyMetrics: {
        budget: 750000,
        experience: "15+ years"
      },
      tags: ["Food Industry", "Established Brands", "Midwest"]
    }
  ]);

  const filteredMatches = matches
    .filter(match => {
      const matchesSearch = match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          match.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || match.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.matchDate.getTime() - a.matchDate.getTime();
        case "compatibility":
          return b.compatibility - a.compatibility;
        case "activity":
          return (b.lastMessageTime?.getTime() || 0) - (a.lastMessageTime?.getTime() || 0);
        default:
          return 0;
      }
    });

  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FG</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Frago</h1>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="sm">
                Messages
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Matches</h2>
              <p className="text-gray-600">
                {matches.length} total matches • {matches.filter(m => m.unreadCount > 0).length} with new messages
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                Export Matches
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View All Conversations
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search matches by name or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Matches</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="compatibility">Compatibility</SelectItem>
                  <SelectItem value="activity">Last Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Matches Grid */}
        <div className="grid gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {match.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
                          <p className="text-blue-600 font-medium">{match.company}</p>
                          <p className="text-sm text-gray-500">{match.location} • {match.industry}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getCompatibilityColor(match.compatibility)}`}>
                            {match.compatibility}%
                          </div>
                          <p className="text-xs text-gray-500">Compatibility</p>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {match.userType === "brand" ? (
                          <>
                            {match.keyMetrics.franchiseFee && (
                              <div>
                                <p className="text-xs text-gray-500">Franchise Fee</p>
                                <p className="font-semibold">{formatCurrency(match.keyMetrics.franchiseFee)}</p>
                              </div>
                            )}
                            {match.keyMetrics.storeCount && (
                              <div>
                                <p className="text-xs text-gray-500">Store Count</p>
                                <p className="font-semibold">{match.keyMetrics.storeCount}+</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {match.keyMetrics.budget && (
                              <div>
                                <p className="text-xs text-gray-500">Budget</p>
                                <p className="font-semibold">{formatCurrency(match.keyMetrics.budget)}</p>
                              </div>
                            )}
                            {match.keyMetrics.experience && (
                              <div>
                                <p className="text-xs text-gray-500">Experience</p>
                                <p className="font-semibold">{match.keyMetrics.experience}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {match.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {match.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Last Message */}
                      {match.lastMessage && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-700 mb-1">"{match.lastMessage}"</p>
                          <p className="text-xs text-gray-500">
                            {match.lastMessageTime && formatDate(match.lastMessageTime)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(match.status)}>
                        {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                      </Badge>
                      {match.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white">
                          {match.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 text-right">
                      Matched {formatDate(match.matchDate)}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Link href="/chat">
                        <Button size="sm" className="w-full">
                          Message
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMatches.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Start swiping to find your first matches"
                }
              </p>
              <Link href="/dashboard">
                <Button>
                  {matches.length === 0 ? "Start Swiping" : "Clear Filters"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}