import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to set a test value
    await kv.set('test-key', 'Hello from Circuit!');
    
    // Try to get the test value
    const value = await kv.get('test-key');
    
    return NextResponse.json({ 
      success: true, 
      message: 'KV connection successful!',
      value 
    });
  } catch (error) {
    console.error('KV test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 