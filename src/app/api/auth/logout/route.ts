import cookies from 'js-cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  cookies.remove('token');

  return NextResponse.json({ success: true });
}