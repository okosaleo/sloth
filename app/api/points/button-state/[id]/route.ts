import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest,  { params }: { params: { id: string }}) {
  const { id } = params;

    try {
    const telegramId = BigInt(id);
      const buttonState = await prisma.buttonState.findUnique({
        where: { telegramId },
      });

      // Return the button's state
      return NextResponse.json({ clicked: buttonState?.hasClicked || false }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error retrieving button state' }, { status: 500 });
    }

}
