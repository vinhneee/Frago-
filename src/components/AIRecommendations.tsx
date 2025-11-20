"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Recommendation {
  id: string;
  type: "profile_optimization" | "matching_strategy" | "conversation_starter" | "market_insight";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  category: string;
  action?: string;
  data?: any;
}

interface AIRecommendationsProps {
  userType: "brand" | "investor";
  userId: string;
}

export default function AIRecommendations({ userType, userId }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock AI recommendations based on user type
  useEffect(() => {
    // Simulate AI processing delay
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = userType === "brand" ? [
        {
          id: "1",
          type: "profile_optimization",
          title: "Add Financial Performance Metrics",
          description: "Profiles with detailed financial data receive 34% more investor interest. Consider adding revenue figures and growth percentages.",
          confidence: 92,
          impact: "high",
          category: "Profile",
          action: "Add metrics to profile"
        },
        {
          id: "2", 
          type: "matching_strategy",
          title: "Target Multi-Unit Investors",
          description: "Based on your franchise model, focus on investors with multi-unit development experience. They show 67% higher conversion rates for your industry.",
          confidence: 87,
          impact: "high",
          category: "Strategy"
        },
        {
          id: "3",
          type: "conversation_starter",
          title: "Personalized Opening Messages",
          description: "Use location-specific data in your initial messages. Mentioning local market insights increases response rates by 45%.",
          confidence: 78,
          impact: "medium",
          category: "Communication",
          data: {
            suggestedMessage: "Hi! I noticed you're interested in the Seattle market. Our brand has seen 23% growth in the Pacific Northwest this year..."
          }
        },
        {
          id: "4",
          type: "market_insight",
          title: "Emerging Market Opportunity",
          description: "AI analysis shows increased investor interest in your industry in Texas and Florida. Consider expanding your target regions.",
          confidence: 85,
          impact: "medium",
          category: "Market Intelligence"
        }
      ] : [
        {
          id: "1",
          type: "profile_optimization", 
          title: "Highlight Industry Experience",
          description: "Investors with specific industry experience mentioned get 41% more brand matches. Add your restaurant/retail background details.",
          confidence: 89,
          impact: "high",
          category: "Profile",
          action: "Update experience section"
        },
        {
          id: "2",
          type: "matching_strategy",
          title: "Adjust Budget Range Display",
          description: "Brands in your target range prefer investors showing $400K-600K budgets. Consider updating your investment range visibility.",
          confidence: 82,
          impact: "high",
          category: "Strategy"
        },
        {
          id: "3",
          type: "conversation_starter",
          title: "Lead with Market Knowledge",
          description: "Start conversations by discussing local market conditions. Brands respond 52% more often to location-aware messages.",
          confidence: 76,
          impact: "medium",
          category: "Communication",
          data: {
            suggestedMessage: "Hello! I'm very interested in your franchise concept. I've been researching the Chicago market and see strong potential for your business model here..."
          }
        },
        {
          id: "4",
          type: "market_insight",
          title: "Timing Optimization",
          description: "Brands are most active on the platform Tuesday-Thursday, 2-5 PM EST. Schedule your swiping sessions accordingly for better visibility.",
          confidence: 71,
          impact: "low",
          category: "Timing"
        }
      ];

      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  }, [userType, userId]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "profile_optimization": return "👤";
      case "matching_strategy": return "🎯";
      case "conversation_starter": return "💬";
      case "market_insight": return "📊";
      default: return "🤖";
    }
  };

  const categories = ["all", ...Array.from(new Set(recommendations.map(r => r.category)))];
  const filteredRecommendations = selectedCategory === "all" 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4">AI is analyzing your profile and activity...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI Recommendations</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {recommendations.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category === "all" ? "All" : category}
            </Button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getTypeIcon(recommendation.type)}</span>
                  <h3 className="font-semibold text-gray-900">{recommendation.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getImpactColor(recommendation.impact)}>
                    {recommendation.impact} impact
                  </Badge>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3">{recommendation.description}</p>

              {/* Confidence Score */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">AI Confidence</span>
                  <span className="font-medium">{recommendation.confidence}%</span>
                </div>
                <Progress value={recommendation.confidence} className="h-2" />
              </div>

              {/* Suggested Message (if available) */}
              {recommendation.data?.suggestedMessage && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                  <p className="text-sm font-medium text-blue-900 mb-1">Suggested Message:</p>
                  <p className="text-sm text-blue-800 italic">"{recommendation.data.suggestedMessage}"</p>
                </div>
              )}

              {/* Action Button */}
              {recommendation.action && (
                <Button size="sm" className="w-full mt-2">
                  {recommendation.action}
                </Button>
              )}
            </div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <p className="text-gray-600">No recommendations available for this category.</p>
          </div>
        )}

        {/* AI Learning Notice */}
        <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <p className="text-sm text-gray-700">
            <strong>AI Learning:</strong> These recommendations improve as you use the platform. 
            The more you interact, the more personalized insights you'll receive.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}