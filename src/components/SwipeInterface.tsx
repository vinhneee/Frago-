"use client";

import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import ConnectionFeeModal from "./ConnectionFeeModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const mockBrands = [
  {
    id: "1",
    name: "Emma Nguyen",
    company: "Hồng trà ngô gia",
    location: "Ho Chi Minh City, Vietnam",
    industry: "Tea & Milk",
    description: "Một thương hiệu trà sữa Việt Nam đang phát triển nhanh, nổi tiếng với mức giá phải chăng, hương vị trà rang đặc trưng và lượng khách hàng trung thành lớn. Hiện đang tìm kiếm đối tác nhượng quyền để mở rộng trên toàn quốc.",
    franchiseFee: 4000,
    minInvestment: 7000,
    storeCount: 80,
    tags: ["Milk Tea", "Affordable", "Popular", "Fast Expansion"]
  },
  {
    id: "2", 
    image: "thanh.png",
    name: "Le Minh Anh",
    company: "Mixue",
    location: "Hanoi, Vietnam",
    industry: "Ice Cream & Beverages",
    description: "Một thương hiệu trà và kem toàn cầu phát triển nhanh, nổi tiếng với mức giá rẻ và sức hút mạnh đối với thị trường đại chúng. Hiện đang mở rộng mạnh mẽ tại Việt Nam với mô hình vận hành ổn định và nhu cầu nhượng quyền cao.",
    franchiseFee: 2000,
    minInvestment: 18000,
    storeCount: 89,
    tags: ["Ice Cream", "Milk Tea", "Low Cost", "High Demand"]
  },
  {
    id: "3",
    name: "Trần Gia Bảo",
    company: "Cộng Cà Phê",
    location: "Hanoi, Vietnam", 
    industry: "Coffee & Beverages",
    description: "Một chuỗi cà phê Việt Nam có phong cách độc đáo, lấy cảm hứng từ thẩm mỹ thời chiến mang màu sắc hoài cổ. Thương hiệu nổi tiếng với món cà phê cốt dừa đặc trưng và bản sắc văn hóa mạnh mẽ. Hiện đang tìm kiếm các đối tác chiến lược để mở rộng tại Việt Nam và quốc tế.",
    franchiseFee: 11000,
    minInvestment: 110000,
    storeCount: 64,
    tags: ["Vietnamese Coffee", "Unique Concept", "Cultural Brand", "Strong Identity"]
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
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<any>(null);

  useEffect(() => {
    // Set profiles based on user type - brands see investors, investors see brands
    const profiles = userType === "brand" ? mockInvestors : mockBrands;
    setCurrentProfiles(profiles);
  }, [userType]);

  const handleSwipe = (direction: "left" | "right", profileId: string) => {
    setSwipeCount(prev => prev + 1);
    
    if (direction === "right") {
      setMatches(prev => [...prev, profileId]);
      // Store the matched profile and open fee modal
      const profile = currentProfiles.find(p => p.id === profileId);
      setMatchedProfile(profile);
      setIsFeeModalOpen(true);
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

  const handleFeeConfirm = (contractValue: number, fee: number) => {
    console.log(`Connection fee confirmed: Contract Value: ${contractValue}, Fee: ${fee}`);
    // In real app, this would process the payment and create the connection
    // For now, just log and close
  };

  const handleFeeModalClose = () => {
    setIsFeeModalOpen(false);
    setMatchedProfile(null);
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

      {/* Connection Fee Modal */}
      <ConnectionFeeModal
        isOpen={isFeeModalOpen}
        onClose={handleFeeModalClose}
        onConfirm={handleFeeConfirm}
        matchedCompany={matchedProfile?.company || "Business Partner"}
      />
    </div>
  );
}