import { NextResponse } from 'next/server';
import { tests } from '@/mockdata/data';

export async function GET() {
  return NextResponse.json(tests);
}
