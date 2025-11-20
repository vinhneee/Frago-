import { NextRequest, NextResponse } from 'next/server';

// Mock user data storage (in production, use a database)
const users = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, userData } = body;

    switch (action) {
      case 'register':
        if (users.has(email)) {
          return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
          );
        }

        const newUser = {
          id: Date.now().toString(),
          email,
          password, // In production: hash the password
          ...userData,
          createdAt: new Date(),
          lastActive: new Date(),
          isVerified: false,
          profileComplete: 25
        };

        users.set(email, newUser);

        return NextResponse.json({
          success: true,
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            userType: newUser.userType,
            profileComplete: newUser.profileComplete
          },
          token: `mock-jwt-token-${newUser.id}` // In production: generate real JWT
        });

      case 'login':
        const user = users.get(email);
        if (!user || user.password !== password) {
          return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          );
        }

        // Update last active
        user.lastActive = new Date();
        users.set(email, user);

        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            profileComplete: user.profileComplete
          },
          token: `mock-jwt-token-${user.id}`
        });

      case 'verify-token':
        const { token } = body;
        const userId = token?.replace('mock-jwt-token-', '');
        const foundUser = Array.from(users.values()).find((u: any) => u.id === userId);
        
        if (!foundUser) {
          return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
          );
        }

        return NextResponse.json({
          success: true,
          user: {
            id: foundUser.id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userType: foundUser.userType,
            profileComplete: foundUser.profileComplete
          }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}