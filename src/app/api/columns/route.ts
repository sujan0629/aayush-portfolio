import { NextResponse } from 'next/server';
import { columns } from '@/lib/data';

export async function GET(request: Request) {
  return NextResponse.json(columns);
}

export async function POST(request: Request) {
  const newColumn = await request.json();
  
  if (!newColumn.title || !newColumn.outlet) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  newColumn.id = columns.length + 1;
  console.log('Received new column:', newColumn);
  
  return NextResponse.json(newColumn, { status: 201 });
}
