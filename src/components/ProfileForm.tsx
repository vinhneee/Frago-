"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface ProfileFormProps {
  userType: "brand" | "investor";
  onSubmit: (data: any) => void;
}

export default function ProfileForm({ userType, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "", 
    company: "",
    location: "",
    industry: "none",
    description: "",
    phone: "",
    website: "",
    
    // Brand-specific fields
    franchiseFee: "",
    minInvestment: "",
    storeCount: "",
    franchiseModel: "none",
    supportProvided: "",
    territories: "",
    
    // Investor-specific fields
    budget: "",
    experience: "",
    preferredIndustries: "",
    regionInterest: "",
    timeframe: "none",
    investmentType: "none"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const industries = [
    "Food & Beverage",
    "Retail",
    "Health & Fitness",
    "Business Services",
    "Automotive",
    "Education",
    "Home Services",
    "Technology",
    "Beauty & Personal Care",
    "Real Estate",
    "Other"
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Complete Your {userType === "brand" ? "Brand" : "Investor"} Profile
        </h2>
        <p className="text-gray-600">
          Help potential partners understand your {userType === "brand" ? "franchise opportunity" : "investment goals"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Tell us about yourself and your {userType === "brand" ? "business" : "investment interests"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Company & Contact */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Primary Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Industry & Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Primary Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select an industry</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  {userType === "brand" ? "Brand Description" : "Investment Profile"}
                </Label>
                <Textarea
                  id="description"
                  placeholder={
                    userType === "brand"
                      ? "Describe your franchise concept, unique value proposition, and what makes your brand special..."
                      : "Describe your investment experience, goals, and what you're looking for in a franchise opportunity..."
                  }
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Brand-Specific Fields */}
            {userType === "brand" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Franchise Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="franchiseFee">Franchise Fee ($)</Label>
                    <Input
                      id="franchiseFee"
                      type="number"
                      placeholder="45000"
                      value={formData.franchiseFee}
                      onChange={(e) => handleInputChange("franchiseFee", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minInvestment">Minimum Investment ($)</Label>
                    <Input
                      id="minInvestment"
                      type="number"
                      placeholder="250000"
                      value={formData.minInvestment}
                      onChange={(e) => handleInputChange("minInvestment", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeCount">Current Store Count</Label>
                    <Input
                      id="storeCount"
                      type="number"
                      placeholder="50"
                      value={formData.storeCount}
                      onChange={(e) => handleInputChange("storeCount", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="franchiseModel">Franchise Model</Label>
                    <Select value={formData.franchiseModel} onValueChange={(value) => handleInputChange("franchiseModel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Select a model</SelectItem>
                        <SelectItem value="single-unit">Single Unit</SelectItem>
                        <SelectItem value="multi-unit">Multi-Unit Development</SelectItem>
                        <SelectItem value="area-development">Area Development</SelectItem>
                        <SelectItem value="master-franchise">Master Franchise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="territories">Available Territories</Label>
                  <Textarea
                    id="territories"
                    placeholder="List the states, regions, or specific markets where you're seeking franchisees..."
                    value={formData.territories}
                    onChange={(e) => handleInputChange("territories", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Investor-Specific Fields */}
            {userType === "investor" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Investment Preferences</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Investment Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="500000"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Industry Experience</Label>
                    <Input
                      id="experience"
                      placeholder="15+ years"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Investment Timeframe</Label>
                    <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Select timeframe</SelectItem>
                        <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                        <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentType">Investment Type</Label>
                    <Select value={formData.investmentType} onValueChange={(value) => handleInputChange("investmentType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Select investment type</SelectItem>
                        <SelectItem value="owner-operator">Owner-Operator</SelectItem>
                        <SelectItem value="passive">Passive Investment</SelectItem>
                        <SelectItem value="semi-passive">Semi-Passive</SelectItem>
                        <SelectItem value="multi-unit">Multi-Unit Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regionInterest">Preferred Regions</Label>
                  <Textarea
                    id="regionInterest"
                    placeholder="Describe your preferred markets, regions, or territories for investment..."
                    value={formData.regionInterest}
                    onChange={(e) => handleInputChange("regionInterest", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            )}

            <div className="pt-6">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Save Profile & Start Matching
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}