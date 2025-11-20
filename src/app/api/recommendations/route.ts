import { NextRequest, NextResponse } from 'next/server';

// Mock AI recommendation engine
interface RecommendationRequest {
  userId: string;
  userType: 'brand' | 'investor';
  profileData?: any;
  activityData?: any;
}

const generateRecommendations = (request: RecommendationRequest): any[] => {
  const { userType } = request;
  
  // Mock recommendation algorithms based on user type
  const brandRecommendations: any[] = [
    {
      id: "rec-1",
      type: "profile_optimization",
      title: "Add Financial Performance Metrics",
      description: "Profiles with detailed financial data receive 34% more investor interest. Consider adding revenue figures and growth percentages.",
      confidence: 92,
      impact: "high",
      category: "Profile",
      action: "Add metrics to profile",
      reasoning: "Analysis shows investors prioritize financial transparency. Your profile lacks specific revenue data.",
      suggestedFields: ["annualRevenue", "growthPercentage", "profitMargins"]
    },
    {
      id: "rec-2", 
      type: "matching_strategy",
      title: "Target Multi-Unit Investors",
      description: "Based on your franchise model, focus on investors with multi-unit development experience. They show 67% higher conversion rates for your industry.",
      confidence: 87,
      impact: "high",
      category: "Strategy",
      reasoning: "Your business model aligns with multi-unit development. Historical data shows better match outcomes.",
      targetCriteria: {
        experience: "multi-unit",
        minBudget: 400000,
        preferredIndustries: ["Food & Beverage", "Retail"]
      }
    },
    {
      id: "rec-3",
      type: "conversation_starter",
      title: "Personalized Opening Messages",
      description: "Use location-specific data in your initial messages. Mentioning local market insights increases response rates by 45%.",
      confidence: 78,
      impact: "medium",
      category: "Communication",
      data: {
        suggestedMessage: "Hi! I noticed you're interested in the Seattle market. Our brand has seen 23% growth in the Pacific Northwest this year, with particularly strong performance in urban areas like yours. I'd love to discuss how our proven model could work in your target locations.",
        personalizations: ["location", "market_trends", "demographic_data"]
      }
    },
    {
      id: "rec-4",
      type: "market_insight",
      title: "Emerging Market Opportunity",
      description: "AI analysis shows increased investor interest in your industry in Texas and Florida. Consider expanding your target regions.",
      confidence: 85,
      impact: "medium",
      category: "Market Intelligence",
      data: {
        recommendedMarkets: ["Austin, TX", "Miami, FL", "Tampa, FL", "Dallas, TX"],
        growthProjections: { texas: 0.31, florida: 0.28 },
        competitionLevel: "moderate"
      }
    }
  ];

  const investorRecommendations: any[] = [
    {
      id: "rec-5",
      type: "profile_optimization", 
      title: "Highlight Industry Experience",
      description: "Investors with specific industry experience mentioned get 41% more brand matches. Add your restaurant/retail background details.",
      confidence: 89,
      impact: "high",
      category: "Profile",
      action: "Update experience section",
      reasoning: "Your profile shows general business experience but lacks industry specifics. Brands prefer experienced operators.",
      suggestedFields: ["restaurant_operations", "retail_management", "multi_unit_oversight"],
      suggestedContent: {
        experienceAreas: ["restaurant_operations", "retail_management", "multi_unit_oversight"],
        successMetrics: ["stores_operated", "revenue_generated", "team_size_managed"]
      }
    },
    {
      id: "rec-6",
      type: "matching_strategy",
      title: "Adjust Budget Range Display",
      description: "Brands in your target range prefer investors showing $400K-600K budgets. Consider updating your investment range visibility.",
      confidence: 82,
      impact: "high",
      category: "Strategy",
      reasoning: "Analysis of successful matches shows optimal budget alignment. Your current range may be limiting visibility.",
      recommendedRange: {
        min: 400000,
        max: 600000,
        sweetSpot: 500000
      }
    },
    {
      id: "rec-7",
      type: "conversation_starter",
      title: "Lead with Market Knowledge",
      description: "Start conversations by discussing local market conditions. Brands respond 52% more often to location-aware messages.",
      confidence: 76,
      impact: "medium", 
      category: "Communication",
      data: {
        suggestedMessage: "Hello! I'm very interested in your franchise concept. I've been researching the Chicago market and see strong potential for your business model here. The demographics align well with your target customer base, and there's limited direct competition in my target areas. I'd love to discuss how we could work together to establish a successful presence.",
        marketInsights: {
          demographics: "favorable", 
          competition: "limited",
          growth_potential: "high"
        }
      }
    },
    {
      id: "rec-8",
      type: "market_insight",
      title: "Timing Optimization",
      description: "Brands are most active on the platform Tuesday-Thursday, 2-5 PM EST. Schedule your swiping sessions accordingly for better visibility.",
      confidence: 71,
      impact: "low",
      category: "Timing",
      data: {
        optimalTimes: [
          { day: "Tuesday", hours: "14:00-17:00" },
          { day: "Wednesday", hours: "14:00-17:00" },
          { day: "Thursday", hours: "14:00-17:00" }
        ],
        activityLevels: {
          tuesday: 0.85,
          wednesday: 0.92,
          thursday: 0.88
        }
      }
    }
  ];

  return userType === 'brand' ? brandRecommendations : investorRecommendations;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userType = searchParams.get('userType') as 'brand' | 'investor';
    const category = searchParams.get('category'); // Filter by category
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!userId || !userType) {
      return NextResponse.json(
        { error: 'User ID and user type are required' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate recommendations
    let recommendations = generateRecommendations({
      userId,
      userType,
      profileData: {}, // In production: fetch from database
      activityData: {}  // In production: fetch user activity
    });

    // Apply category filter
    if (category && category !== 'all') {
      recommendations = recommendations.filter(rec => rec.category === category);
    }

    // Apply limit
    recommendations = recommendations.slice(0, limit);

    // Add personalization metadata
    const metadata = {
      userId,
      userType,
      generatedAt: new Date(),
      algorithmsUsed: [
        'collaborative_filtering',
        'content_based_matching', 
        'behavioral_analysis',
        'market_trend_analysis'
      ],
      confidence: {
        avg: recommendations.reduce((acc, rec) => acc + rec.confidence, 0) / recommendations.length,
        high: recommendations.filter(rec => rec.impact === 'high').length,
        medium: recommendations.filter(rec => rec.impact === 'medium').length,
        low: recommendations.filter(rec => rec.impact === 'low').length
      }
    };

    return NextResponse.json({
      success: true,
      recommendations,
      metadata,
      count: recommendations.length
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for tracking recommendation interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, 
      recommendationId, 
      action, // 'view', 'click', 'dismiss', 'apply'
      feedback 
    } = body;

    // Record interaction for ML model training
    const interaction = {
      id: `interaction-${Date.now()}`,
      userId,
      recommendationId,
      action,
      feedback,
      timestamp: new Date()
    };

    // In production: save to analytics database for model improvement
    console.log('Recommendation interaction:', interaction);

    return NextResponse.json({
      success: true,
      interactionId: interaction.id,
      message: 'Interaction recorded successfully'
    });

  } catch (error) {
    console.error('Recommendation interaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}