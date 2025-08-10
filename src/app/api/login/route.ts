import { NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
        console.error('Admin credentials are not set in environment variables.');
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // In a real app, you'd generate a secure JWT. For now, a mock token is fine.
      const token = 'your_secure_auth_token'; 
      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred during login.' }, { status: 500 });
  }
}
