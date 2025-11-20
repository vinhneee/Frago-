import { NextRequest, NextResponse } from 'next/server';

// Mock profile data storage
const profiles = new Map();
const swipeActions = new Map();
const matches = new Map();

// Mock profiles for demonstration
const mockProfiles = [
  {
    id: "brand-1",
    userId: "user-1",
    userType: "brand",
    name: "Sarah Johnson",
    company: "QuickBite Burgers",
    location: "San Francisco, CA",
    industry: "Fast Food",
    description: "Proven fast-casual burger concept with 15+ years of success. Looking for expansion partners in key metropolitan areas.",
    franchiseFee: 45000,
    minInvestment: 250000,
    storeCount: 127,
    tags: ["Fast Casual", "Proven Model", "High ROI", "Training Included"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"],
    createdAt: new Date("2024-01-10"),
    isActive: true
  },
  {
    id: "investor-1", 
    userId: "user-2",
    userType: "investor",
    name: "David Park",
    company: "Park Investment Group",
    location: "Seattle, WA",
    industry: "Multi-Unit Development",
    description: "Experienced multi-unit operator seeking scalable franchise opportunities in the Pacific Northwest region.",
    budget: 500000,
    experience: "10+ years",
    tags: ["Multi-Unit", "Experienced", "Pacific NW", "Growth Focused"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"],
    createdAt: new Date("2024-01-08"),
    isActive: true
  }
];

// Initialize mock data
mockProfiles.forEach(profile => {
  profiles.set(profile.id, profile);
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userType = searchParams.get('userType');
    const userId = searchParams.get('userId');
    const filters = searchParams.get('filters');

    let filteredProfiles = Array.from(profiles.values())
      .filter((profile: any) => profile.isActive);

    // Filter by opposite user type (brands see investors, investors see brands)
    if (userType) {
      const targetType = userType === 'brand' ? 'investor' : 'brand';
      filteredProfiles = filteredProfiles.filter((profile: any) => profile.userType === targetType);
    }

    // Apply additional filters if provided
    if (filters) {
      const filterObj = JSON.parse(filters);
      
      if (filterObj.industry && filterObj.industry !== 'none') {
        filteredProfiles = filteredProfiles.filter((profile: any) => 
          profile.industry === filterObj.industry
        );
      }

      if (filterObj.budgetRange) {
        const [min, max] = filterObj.budgetRange;
        filteredProfiles = filteredProfiles.filter((profile: any) => {
          const amount = profile.budget || profile.minInvestment || 0;
          return amount >= min && amount <= max;
        });
      }
    }

    // Exclude profiles that have already been swiped on
    if (userId) {
      const userSwipes = Array.from(swipeActions.values())
        .filter((swipe: any) => swipe.swiperId === userId);
      const swipedProfileIds = userSwipes.map((swipe: any) => swipe.swipedId);
      
      filteredProfiles = filteredProfiles.filter((profile: any) => 
        !swipedProfileIds.includes(profile.id) && profile.userId !== userId
      );
    }

    return NextResponse.json({
      success: true,
      profiles: filteredProfiles,
      count: filteredProfiles.length
    });

  } catch (error) {
    console.error('Profiles API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, profileData } = body;

    const profileId = `${profileData.userType}-${Date.now()}`;
    const newProfile = {
      id: profileId,
      userId,
      ...profileData,
      createdAt: new Date(),
      isActive: true,
      verified: false
    };

    profiles.set(profileId, newProfile);

    return NextResponse.json({
      success: true,
      profile: newProfile
    });

  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, updates } = body;

    const profile = profiles.get(profileId);
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const updatedProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date()
    };

    profiles.set(profileId, updatedProfile);

    return NextResponse.json({
      success: true,
      profile: updatedProfile
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}