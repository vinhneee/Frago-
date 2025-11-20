"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SwipeCardProps {
  type: "brand" | "investor";
  profile: {
    id: string;
    name: string;
    company: string;
    location: string;
    industry: string;
    description: string;
    image?: string;
    budget?: number;
    franchiseFee?: number;
    minInvestment?: number;
    storeCount?: number;
    experience?: string;
    tags: string[];
  };
  onSwipe: (direction: "left" | "right", profileId: string) => void;
}

export default function SwipeCard({ type, profile, onSwipe }: SwipeCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleSwipe = async (direction: "left" | "right") => {
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    // Animation delay
    setTimeout(() => {
      onSwipe(direction, profile.id);
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Card 
        className={`h-96 shadow-lg border-0 transform transition-all duration-300 ${
          isAnimating
            ? swipeDirection === "left" 
              ? "-translate-x-full rotate-12 opacity-0"
              : "translate-x-full -rotate-12 opacity-0"
            : "translate-x-0 rotate-0 opacity-100"
        }`}
      >
        {/* Profile Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
          <img 
            src={profile.image || `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3f23f2f7-55da-4ea7-9f6e-a07181116ba3.png === "brand" ? "Professional+franchise+brand+office+modern+corporate" : "Business+investor+professional+executive+office"}`}
            alt={`${profile.company} - ${type === "brand" ? "Franchise brand headquarters" : "Business investor profile"}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant={type === "brand" ? "default" : "secondary"} className="bg-white/90 text-gray-900">
              {type === "brand" ? "Franchise Brand" : "Investor"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-blue-600 font-medium">{profile.company}</p>
            <p className="text-sm text-gray-500">{profile.location} • {profile.industry}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {type === "brand" ? (
              <>
                {profile.franchiseFee && (
                  <div>
                    <span className="text-gray-500 block">Franchise Fee</span>
                    <span className="font-semibold">{formatCurrency(profile.franchiseFee)}</span>
                  </div>
                )}
                {profile.minInvestment && (
                  <div>
                    <span className="text-gray-500 block">Min Investment</span>
                    <span className="font-semibold">{formatCurrency(profile.minInvestment)}</span>
                  </div>
                )}
                {profile.storeCount && (
                  <div>
                    <span className="text-gray-500 block">Stores</span>
                    <span className="font-semibold">{profile.storeCount}+</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {profile.budget && (
                  <div>
                    <span className="text-gray-500 block">Investment Budget</span>
                    <span className="font-semibold">{formatCurrency(profile.budget)}</span>
                  </div>
                )}
                {profile.experience && (
                  <div>
                    <span className="text-gray-500 block">Experience</span>
                    <span className="font-semibold">{profile.experience}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">{profile.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {profile.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-2">
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={() => handleSwipe("left")}
              disabled={isAnimating}
            >
              <span className="text-2xl">✕</span>
            </Button>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleSwipe("right")}
              disabled={isAnimating}
            >
              <span className="text-2xl">❤</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}