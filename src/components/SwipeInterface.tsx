"use client";

import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration
const mockBrands = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "QuickBite Burgers",
    location: "San Francisco, CA",
    industry: "Fast Food",
    description: "Proven fast-casual burger concept with 15+ years of success. Looking for expansion partners in key metropolitan areas.",
    franchiseFee: 45000,
    minInvestment: 250000,
    storeCount: 127,
    tags: ["Fast Casual", "Proven Model", "High ROI", "Training Included"]
  },
  {
    id: "2", 
    name: "Michael Chen",
    company: "TechFix Solutions",
    location: "Austin, TX",
    industry: "Technology Services",
    description: "Mobile device repair franchise with proprietary training system. Growing market with recession-resistant revenue streams.",
    franchiseFee: 35000,
    minInvestment: 180000,
    storeCount: 89,
    tags: ["Tech Services", "Growing Market", "Low Overhead", "Flexible Model"]
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    company: "FitZone Studios",
    location: "Miami, FL", 
    industry: "Fitness & Wellness",
    description: "Boutique fitness studio concept focusing on small group training. Turnkey operation with comprehensive support system.",
    franchiseFee: 55000,
    minInvestment: 320000,
    storeCount: 64,
    tags: ["Fitness", "Boutique", "High Margins", "Community Focus"]
  }
];

const mockInvestors = [
  {
    id: "4",
    name: "David Park",
    company: "Park Investment Group",
    location: "Seattle, WA",
    industry: "Multi-Unit Development",
    description: "Experienced multi-unit operator seeking scalable franchise opportunities in the Pacific Northwest region.",
    budget: 500000,
    experience: "10+ years",
    tags: ["Multi-Unit", "Experienced", "Pacific NW", "Growth Focused"]
  },
  {
    id: "5",
    name: "Jennifer Smith",
    company: "Smith Capital Partners",
    location: "Chicago, IL",
    industry: "Food & Beverage",
    description: "Private investor with restaurant industry background. Looking for established food franchise opportunities in Midwest markets.",
    budget: 750000,
    experience: "15+ years",
    tags: ["Food Industry", "Established Brands", "Midwest", "Restaurant Expert"]
  }
];

interface SwipeInterfaceProps {
  userType: "brand" | "investor";
}

export default function SwipeInterface({ userType }: SwipeInterfaceProps) {
  const [currentProfiles, setCurrentProfiles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [swipeCount, setSwipeCount] = useState(0);

  useEffect(() => {
    // Set profiles based on user type - brands see investors, investors see brands
    const profiles = userType === "brand" ? mockInvestors : mockBrands;
    setCurrentProfiles(profiles);
  }, [userType]);

  const handleSwipe = (direction: "left" | "right", profileId: string) => {
    setSwipeCount(prev => prev + 1);
    
    if (direction === "right") {
      setMatches(prev => [...prev, profileId]);
      // In real app, this would check for mutual match
      console.log(`Liked ${profileId}`);
    }

    // Move to next profile
    if (currentIndex < currentProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // No more profiles - could load more or show completion
      setCurrentIndex(0); // Reset for demo
    }
  };

  const currentProfile = currentProfiles[currentIndex];

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>No More Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You've viewed all available {userType === "brand" ? "investors" : "brands"} in your area.
            </p>
            <Button onClick={() => setCurrentIndex(0)}>
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} of {currentProfiles.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / currentProfiles.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Swipe Card */}
      <SwipeCard
        type={userType === "brand" ? "investor" : "brand"}
        profile={currentProfile}
        onSwipe={handleSwipe}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-900">{swipeCount}</div>
          <div className="text-sm text-gray-500">Profiles Viewed</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{matches.length}</div>
          <div className="text-sm text-gray-500">Matches</div>
        </Card>
      </div>

      {/* Swipe Instructions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-center text-sm text-blue-800">
          <p className="font-medium mb-1">How to use:</p>
          <p>Tap ✕ to pass • Tap ❤ to show interest</p>
        </div>
      </Card>
    </div>
  );
}