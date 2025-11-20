import { NextRequest, NextResponse } from 'next/server';

// Mock data storage
const conversations = new Map();
const messages = new Map();

// Mock conversation data
const mockConversations = [
  {
    id: "conv-1",
    participants: ["current-user", "user-1"],
    matchId: "match-1",
    createdAt: new Date("2024-01-15T14:30:00"),
    lastActivity: new Date("2024-01-15T16:45:00"),
    lastMessage: "I'd like to discuss franchise terms for the Seattle market."
  }
];

const mockMessages = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-1",
    recipientId: "current-user",
    content: "Hi John! I'm interested in learning more about your investment criteria for the Seattle market.",
    timestamp: new Date("2024-01-15T14:30:00"),
    type: "text",
    isRead: true
  },
  {
    id: "msg-2", 
    conversationId: "conv-1",
    senderId: "current-user",
    recipientId: "user-1",
    content: "Hello Sarah! I'd be happy to discuss this further. What specific aspects would you like to know more about?",
    timestamp: new Date("2024-01-15T15:00:00"),
    type: "text",
    isRead: true
  },
  {
    id: "msg-3",
    conversationId: "conv-1", 
    senderId: "user-1",
    recipientId: "current-user",
    content: "I'd like to discuss franchise terms for the Seattle market. We're seeing strong growth potential there.",
    timestamp: new Date("2024-01-15T16:45:00"),
    type: "text",
    isRead: false
  }
];

// Initialize mock data
mockConversations.forEach(conv => conversations.set(conv.id, conv));
mockMessages.forEach(msg => messages.set(msg.id, msg));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'conversations' | 'messages'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (type === 'conversations') {
      // Get user's conversations
      const userConversations = Array.from(conversations.values())
        .filter((conv: any) => conv.participants.includes(userId))
        .sort((a: any, b: any) => 
          new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        );

      return NextResponse.json({
        success: true,
        conversations: userConversations,
        count: userConversations.length
      });
    }

    if (conversationId) {
      // Get messages for a specific conversation
      const conversation = conversations.get(conversationId);
      if (!conversation || !conversation.participants.includes(userId)) {
        return NextResponse.json(
          { error: 'Conversation not found or unauthorized' },
          { status: 404 }
        );
      }

      const conversationMessages = Array.from(messages.values())
        .filter((msg: any) => msg.conversationId === conversationId)
        .sort((a: any, b: any) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

      // Apply pagination
      const paginatedMessages = conversationMessages.slice(offset, offset + limit);

      return NextResponse.json({
        success: true,
        messages: paginatedMessages,
        conversation,
        pagination: {
          total: conversationMessages.length,
          limit,
          offset,
          hasMore: offset + limit < conversationMessages.length
        }
      });
    }

    return NextResponse.json(
      { error: 'Conversation ID or type parameter is required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Messages API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      conversationId, 
      senderId, 
      recipientId, 
      content, 
      type = 'text',
      matchId 
    } = body;

    let targetConversationId = conversationId;

    // If no conversation exists, create one
    if (!targetConversationId && matchId) {
      targetConversationId = `conv-${Date.now()}`;
      const newConversation = {
        id: targetConversationId,
        participants: [senderId, recipientId],
        matchId,
        createdAt: new Date(),
        lastActivity: new Date(),
        lastMessage: content
      };
      conversations.set(targetConversationId, newConversation);
    }

    // Create the message
    const messageId = `msg-${Date.now()}`;
    const newMessage = {
      id: messageId,
      conversationId: targetConversationId,
      senderId,
      recipientId,
      content,
      type,
      timestamp: new Date(),
      isRead: false
    };

    messages.set(messageId, newMessage);

    // Update conversation last activity
    const conversation = conversations.get(targetConversationId);
    if (conversation) {
      conversation.lastActivity = new Date();
      conversation.lastMessage = content;
      conversations.set(targetConversationId, conversation);
    }

    return NextResponse.json({
      success: true,
      message: newMessage,
      conversationId: targetConversationId
    });

  } catch (error) {
    console.error('Message creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { messageId, isRead, userId } = body;

    const message = messages.get(messageId);
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    // Verify user is the recipient
    if (message.recipientId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const updatedMessage = {
      ...message,
      isRead: isRead,
      readAt: isRead ? new Date() : undefined
    };

    messages.set(messageId, updatedMessage);

    return NextResponse.json({
      success: true,
      message: updatedMessage
    });

  } catch (error) {
    console.error('Message update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}