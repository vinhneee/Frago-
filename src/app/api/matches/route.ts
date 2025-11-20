import { NextRequest, NextResponse } from 'next/server';

// Mock data storage (shared across API routes)
const matches = new Map();
const profiles = new Map();
const messages = new Map();

// Mock data initialization
const mockMatches = [
  {
    id: "match-1",
    user1Id: "current-user",
    user2Id: "user-1", 
    user1Profile: {
      id: "current-user",
      name: "John Doe",
      company: "Doe Investments",
      userType: "investor"
    },
    user2Profile: {
      id: "user-1",
      name: "Sarah Johnson", 
      company: "QuickBite Burgers",
      userType: "brand"
    },
    createdAt: new Date("2024-01-15T14:30:00"),
    status: "active",
    lastActivity: new Date("2024-01-15T16:45:00"),
    compatibility: 92,
    lastMessage: "I'd like to discuss franchise terms for the Seattle market.",
    unreadCount: 2
  },
  {
    id: "match-2",
    user1Id: "current-user",
    user2Id: "user-2",
    user1Profile: {
      id: "current-user", 
      name: "John Doe",
      company: "Doe Investments",
      userType: "investor"
    },
    user2Profile: {
      id: "user-2",
      name: "Michael Chen",
      company: "TechFix Solutions", 
      userType: "brand"
    },
    createdAt: new Date("2024-01-15T09:00:00"),
    status: "new",
    lastActivity: new Date("2024-01-15T09:15:00"),
    compatibility: 88,
    lastMessage: "New match! Let's discuss opportunities.",
    unreadCount: 1
  }
];

// Initialize mock data
mockMatches.forEach(match => {
  matches.set(match.id, match);
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status'); // 'active', 'new', 'archived'
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let userMatches = Array.from(matches.values())
      .filter((match: any) => 
        match.user1Id === userId || match.user2Id === userId
      );

    // Apply status filter
    if (status && status !== 'all') {
      userMatches = userMatches.filter((match: any) => match.status === status);
    }

    // Sort by last activity (most recent first)
    userMatches.sort((a: any, b: any) => 
      new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    );

    // Apply pagination
    const totalCount = userMatches.length;
    const paginatedMatches = userMatches.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      matches: paginatedMatches,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    });

  } catch (error) {
    console.error('Matches API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, updates, userId } = body;

    const match = matches.get(matchId);
    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }

    // Verify user is part of this match
    if (match.user1Id !== userId && match.user2Id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const updatedMatch = {
      ...match,
      ...updates,
      lastActivity: new Date()
    };

    matches.set(matchId, updatedMatch);

    return NextResponse.json({
      success: true,
      match: updatedMatch
    });

  } catch (error) {
    console.error('Match update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, userId } = body;

    const match = matches.get(matchId);
    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }

    // Verify user is part of this match
    if (match.user1Id !== userId && match.user2Id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Archive the match instead of deleting
    const archivedMatch = {
      ...match,
      status: 'archived',
      archivedAt: new Date(),
      archivedBy: userId
    };

    matches.set(matchId, archivedMatch);

    return NextResponse.json({
      success: true,
      message: 'Match archived successfully'
    });

  } catch (error) {
    console.error('Match deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}