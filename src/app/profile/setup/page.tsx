"use client";

import { Suspense, useEffect, useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ProfileSetupContent() {
  const [userType, setUserType] = useState<"brand" | "investor" | null>(null);
  const [step, setStep] = useState<"select" | "form" | "complete">("select");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const preselectedType = searchParams.get("userType");

    if (preselectedType === "brand" || preselectedType === "investor") {
      setUserType(preselectedType);
      setStep("form");
    }
  }, [searchParams]);

  const handleUserTypeSelection = (type: "brand" | "investor") => {
    if (type === "brand") {
         router.push("/profile/contract-value");
    }
    setUserType(type);
    setStep("form");
  };

  const handleFormSubmit = async (data: any) => {
    console.log("Profile data:", data);
    
    try {
      // Get current user data
      const userData = localStorage.getItem('user');
      const userId = userData ? JSON.parse(userData).id : 'current-user';
      
      // Save profile data to backend
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          profileData: {
            ...data,
            userType: userType || 'investor'
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update user data with profile completion
        if (userData) {
          const user = JSON.parse(userData);
          user.profileComplete = 100;
          localStorage.setItem('user', JSON.stringify(user));
        }
        
        setStep("complete");
      } else {
        alert("Lỗi khi lưu thông tin profile. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error('Profile save error:', error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleComplete = () => {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #10B981; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; font-family: system-ui;">
        🎉 Profile setup hoàn tất! Bắt đầu matching ngay...
      </div>
    `;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      document.body.removeChild(successDiv);
      window.location.href = "/dashboard";
    }, 2000);
  };

  if (step === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="flex items-center space-x-2">
                <img src="/logo.svg" 
            alt="Frago Logo" 
            className="h-16 w-auto"/>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-gray-600">Select how you'll use Frago to get personalized matches</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Franchise Brand Owner */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500"
              onClick={() => handleUserTypeSelection("brand")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏢</span>
                </div>
                <CardTitle className="text-xl">Franchise Brand Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  I have a franchise brand and I'm looking for investors and franchisees to expand my business.
                </p>
                
                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold text-gray-900">What you'll do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Create your franchise brand profile</li>
                    <li>• Set franchise fees and investment requirements</li>
                    <li>• Browse and connect with potential investors</li>
                    <li>• Manage franchise applications and inquiries</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    I'm a Brand Owner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Investor/Franchisee */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-green-500"
              onClick={() => handleUserTypeSelection("investor")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💼</span>
                </div>
                <CardTitle className="text-xl">Investor / Franchisee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  I'm looking to invest in or purchase a franchise opportunity that matches my budget and goals.
                </p>
                
                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold text-gray-900">What you'll do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Set your investment budget and preferences</li>
                    <li>• Browse franchise opportunities</li>
                    <li>• Connect with franchise brands</li>
                    <li>• Evaluate and negotiate franchise deals</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    I'm an Investor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>
              You can change your role later in your profile settings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "form" && userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <ProfileForm userType={userType} onSubmit={handleFormSubmit} />
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Profile Complete!
            </h2>
            <p className="text-gray-600">
              Your {userType} profile has been created successfully. You can now start matching with potential partners.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">What's Next?</h3>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li>• Browse potential matches in your dashboard</li>
                <li>• Use filters to find the best fits</li>
                <li>• Start swiping and connecting</li>
                <li>• Engage in conversations with matches</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={handleComplete} className="w-full bg-blue-600 hover:bg-blue-700">
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => setStep("form")} className="w-full">
              Edit My Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
export default function ProfileSetupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileSetupContent />
    </Suspense>);}