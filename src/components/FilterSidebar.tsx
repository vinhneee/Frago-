"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface FilterSidebarProps {
  userType: "brand" | "investor";
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ userType, onFiltersChange, isOpen, onClose }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    industry: "none",
    location: "none",
    budgetRange: [0, 1000000],
    experience: "none",
    franchiseModel: "none",
    storeCountRange: [0, 500],
    investmentTimeframe: "none"
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      industry: "none",
      location: "none", 
      budgetRange: [0, 1000000],
      experience: "none",
      franchiseModel: "none",
      storeCountRange: [0, 500],
      investmentTimeframe: "none"
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
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
    "Real Estate"
  ];

  const locations = [
    "California",
    "Texas", 
    "Florida",
    "New York",
    "Illinois",
    "Pennsylvania",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan"
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:relative lg:bg-transparent lg:inset-auto lg:z-auto">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg lg:relative lg:w-full lg:shadow-none overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              ✕
            </Button>
          </div>

          {/* Active Filters Count */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Filters</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Industry Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={filters.industry} onValueChange={(value) => handleFilterChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Any Industry</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Location Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Any Location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Budget/Investment Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  {userType === "brand" ? "Investment Range" : "Budget Range"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={filters.budgetRange}
                  onValueChange={(value) => handleFilterChange("budgetRange", value)}
                  max={1000000}
                  min={0}
                  step={25000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatCurrency(filters.budgetRange[0])}</span>
                  <span>{formatCurrency(filters.budgetRange[1])}</span>
                </div>
              </CardContent>
            </Card>

            {/* Brand-Specific Filters */}
            {userType === "brand" && (
              <>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Store Count Range</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Slider
                      value={filters.storeCountRange}
                      onValueChange={(value) => handleFilterChange("storeCountRange", value)}
                      max={500}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{filters.storeCountRange[0]} stores</span>
                      <span>{filters.storeCountRange[1]}+ stores</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Investor Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Any Experience</SelectItem>
                        <SelectItem value="first-time">First-Time Investor</SelectItem>
                        <SelectItem value="some">Some Experience (2-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                        <SelectItem value="veteran">Veteran (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Investor-Specific Filters */}
            {userType === "investor" && (
              <>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Franchise Model</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={filters.franchiseModel} onValueChange={(value) => handleFilterChange("franchiseModel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any franchise model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Any Model</SelectItem>
                        <SelectItem value="single-unit">Single Unit</SelectItem>
                        <SelectItem value="multi-unit">Multi-Unit Development</SelectItem>
                        <SelectItem value="area-development">Area Development</SelectItem>
                        <SelectItem value="master-franchise">Master Franchise</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Investment Timeframe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={filters.investmentTimeframe} onValueChange={(value) => handleFilterChange("investmentTimeframe", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Any Timeframe</SelectItem>
                        <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                        <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Popular Tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    High ROI
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Proven Model
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Low Investment
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Recession Resistant
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Growing Market
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Multi-Unit
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Apply Filters Button */}
            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onClose}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}