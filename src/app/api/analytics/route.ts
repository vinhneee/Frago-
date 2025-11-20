import { NextRequest, NextResponse } from 'next/server';

// Mock analytics data
const analyticsData = {
  overview: {
    totalUsers: 2847,
    totalBrands: 1023,
    totalInvestors: 1824,
    activeMatches: 456,
    totalMatches: 3672,
    successfulDeals: 89,
    monthlyGrowth: 23.5,
    revenueThisMonth: 124500
  },
  userActivity: {
    dailyActiveUsers: 1245,
    weeklyActiveUsers: 2156,
    monthlyActiveUsers: 2847,
    avgSessionTime: 18.5,
    swipesPerSession: 12.3,
    messagesSent: 8934,
    profileViews: 15672
  },
  matchingStats: {
    matchRate: 34.6,
    chatInitiationRate: 78.2,
    dealClosureRate: 12.4,
    avgTimeToMatch: 3.2,
    topIndustries: [
      { name: "Food & Beverage", percentage: 28.5, users: 812 },
      { name: "Retail", percentage: 22.1, users: 629 },
      { name: "Health & Fitness", percentage: 18.3, users: 521 },
      { name: "Business Services", percentage: 15.7, users: 447 },
      { name: "Technology", percentage: 15.4, users: 438 }
    ]
  },
  recentActivity: [
    {
      id: "1",
      type: "match",
      description: "Sarah Johnson (QuickBite) matched with David Park (Park Investment)",
      timestamp: new Date("2024-01-15T14:30:00"),
      status: "success",
      details: {
        brandName: "QuickBite Burgers",
        investorName: "Park Investment Group",
        industry: "Food & Beverage"
      }
    },
    {
      id: "2", 
      type: "signup",
      description: "New brand registration: TechFix Solutions",
      timestamp: new Date("2024-01-15T13:15:00"),
      status: "pending",
      details: {
        companyName: "TechFix Solutions",
        industry: "Technology Services",
        location: "Austin, TX"
      }
    },
    {
      id: "3",
      type: "deal",
      description: "Deal closed: FitZone Studios + Smith Capital Partners",
      timestamp: new Date("2024-01-15T11:45:00"),
      status: "success",
      details: {
        brandName: "FitZone Studios",
        investorName: "Smith Capital Partners",
        dealValue: 320000,
        industry: "Health & Fitness"
      }
    },
    {
      id: "4",
      type: "report",
      description: "User report: Inappropriate behavior by user ID 1847",
      timestamp: new Date("2024-01-15T10:20:00"),
      status: "warning",
      details: {
        reportedUserId: "user-1847",
        reportType: "inappropriate_message",
        severity: "medium"
      }
    }
  ],
  revenue: {
    monthly: 124500,
    breakdown: {
      premiumSubscriptions: 45600,
      successFees: 52900,
      featuredListings: 26000
    },
    growthRate: 12.3,
    projectedAnnual: 1494000
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'overview' | 'users' | 'matching' | 'revenue' | 'activity'
    const dateRange = searchParams.get('dateRange') || '30d';
    const includeDetails = searchParams.get('includeDetails') === 'true';

    // Simulate date range filtering (in production, filter actual data)
    let responseData: any = { ...analyticsData };

    // Apply date range multipliers for demo purposes
    const multipliers: { [key: string]: number } = {
      '7d': 0.25,
      '30d': 1,
      '90d': 3,
      '1y': 12
    };

    const multiplier = multipliers[dateRange] || 1;

    if (type) {
      // Return specific analytics type
      switch (type) {
        case 'overview':
          responseData = {
            ...responseData.overview,
            totalUsers: Math.round(responseData.overview.totalUsers * multiplier),
            totalMatches: Math.round(responseData.overview.totalMatches * multiplier),
            revenueThisMonth: Math.round(responseData.overview.revenueThisMonth * multiplier)
          };
          break;

        case 'users':
          responseData = {
            ...responseData.userActivity,
            monthlyActiveUsers: Math.round(responseData.userActivity.monthlyActiveUsers * multiplier),
            messagesSent: Math.round(responseData.userActivity.messagesSent * multiplier),
            profileViews: Math.round(responseData.userActivity.profileViews * multiplier)
          };
          break;

        case 'matching':
          responseData = responseData.matchingStats;
          break;

        case 'revenue':
          responseData = {
            ...responseData.revenue,
            monthly: Math.round(responseData.revenue.monthly * multiplier),
            breakdown: {
              premiumSubscriptions: Math.round(responseData.revenue.breakdown.premiumSubscriptions * multiplier),
              successFees: Math.round(responseData.revenue.breakdown.successFees * multiplier),
              featuredListings: Math.round(responseData.revenue.breakdown.featuredListings * multiplier)
            }
          };
          break;

        case 'activity':
          responseData = responseData.recentActivity;
          break;

        default:
          return NextResponse.json(
            { error: 'Invalid analytics type' },
            { status: 400 }
          );
      }
    }

    // Add metadata
    const response = {
      success: true,
      data: responseData,
      metadata: {
        dateRange,
        generatedAt: new Date(),
        includeDetails,
        ...(type && { type })
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for recording custom analytics events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      eventType, 
      userId, 
      data, 
      timestamp = new Date() 
    } = body;

    // In production, this would save to a analytics database
    const eventId = `event-${Date.now()}`;
    const analyticsEvent = {
      id: eventId,
      eventType,
      userId,
      data,
      timestamp: new Date(timestamp),
      sessionId: `session-${Date.now()}` // In production: get from request headers
    };

    // Mock storage (in production: save to database)
    console.log('Analytics event recorded:', analyticsEvent);

    return NextResponse.json({
      success: true,
      eventId,
      message: 'Analytics event recorded successfully'
    });

  } catch (error) {
    console.error('Analytics event recording error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}