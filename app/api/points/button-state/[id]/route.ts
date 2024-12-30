import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const telegramId = req.nextUrl.searchParams.get('telegramId');  // Use get to fetch the query parameter

  if (!telegramId) {
    return NextResponse.json({ error: 'telegramId is required' }, { status: 400 });
  }

  try {
    // Convert to BigInt since telegramId is stored as BigInt in the database
    const buttonState = await prisma.buttonState.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });

    return NextResponse.json({ clicked: buttonState?.hasClicked || false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving button state' }, { status: 500 });
  }
}

