import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { telegramId, clicked } = await request.json();

  if (!telegramId || clicked === undefined) {
    return NextResponse.json({ error: "Missing telegramId or clicked state" }, { status: 400 });
  }

  try {
    // Update the button state in the database
    await prisma.buttonState.upsert({
      where: { telegramId: BigInt(telegramId) },
      update: { hasClicked: clicked },
      create: { telegramId: BigInt(telegramId), hasClicked: clicked },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating button state' }, { status: 500 });
  }
}
