import { NextRequest, NextResponse } from 'next/server';

// Mock data storage
const swipeActions = new Map();
const matches = new Map();
const notifications = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { swiperId, swipedId, direction, swiperType } = body;

    // Record the swipe action
    const swipeId = `${swiperId}-${swipedId}`;
    const swipeAction = {
      id: swipeId,
      swiperId,
      swipedId,
      direction,
      swiperType,
      timestamp: new Date()
    };

    swipeActions.set(swipeId, swipeAction);

    // Check if there's a mutual match (both users swiped right)
    let isMatch = false;
    let matchData = null;

    if (direction === 'right') {
      // Look for a reverse swipe (the other user swiping right on this user)
      const reverseSwipeId = `${swipedId}-${swiperId}`;
      const reverseSwipe = swipeActions.get(reverseSwipeId);

      if (reverseSwipe && reverseSwipe.direction === 'right') {
        // It's a match!
        isMatch = true;
        const matchId = `match-${Date.now()}`;
        
        matchData = {
          id: matchId,
          user1Id: swiperId,
          user2Id: swipedId,
          createdAt: new Date(),
          status: 'active',
          lastActivity: new Date()
        };

        matches.set(matchId, matchData);

        // Create notifications for both users
        const notification1 = {
          id: `notif-${Date.now()}-1`,
          userId: swiperId,
          type: 'match',
          title: 'New Match!',
          message: 'You have a new match. Start chatting now!',
          matchId,
          isRead: false,
          createdAt: new Date()
        };

        const notification2 = {
          id: `notif-${Date.now()}-2`,
          userId: swipedId,
          type: 'match',
          title: 'New Match!',
          message: 'You have a new match. Start chatting now!',
          matchId,
          isRead: false,
          createdAt: new Date()
        };

        notifications.set(notification1.id, notification1);
        notifications.set(notification2.id, notification2);
      }
    }

    return NextResponse.json({
      success: true,
      swipeId,
      isMatch,
      matchData,
      message: isMatch ? 'It\'s a match! 🎉' : 'Swipe recorded successfully'
    });

  } catch (error) {
    console.error('Swipe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get swipe history for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'sent' | 'received' | 'matches'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let data: any[] = [];

    switch (type) {
      case 'sent':
        data = Array.from(swipeActions.values())
          .filter((swipe: any) => swipe.swiperId === userId);
        break;

      case 'received':
        data = Array.from(swipeActions.values())
          .filter((swipe: any) => swipe.swipedId === userId);
        break;

      case 'matches':
        data = Array.from(matches.values())
          .filter((match: any) => 
            match.user1Id === userId || match.user2Id === userId
          );
        break;

      default:
        // Return all swipe actions for the user
        data = Array.from(swipeActions.values())
          .filter((swipe: any) => 
            swipe.swiperId === userId || swipe.swipedId === userId
          );
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length
    });

  } catch (error) {
    console.error('Swipe history API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}