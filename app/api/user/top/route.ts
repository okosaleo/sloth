import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Starting to fetch data...');
    const [topUsers, totalCount] = await Promise.all([
      prisma.user.findMany({
        orderBy: { points: 'desc' },
        take: 50,
      }),
      prisma.user.count(),
    ]);
    const sanitizedUsers = topUsers.map((user) => ({
        ...user,
        telegramId: user.telegramId.toString(), // Convert BigInt to string
      }));
  
      console.log('Fetched sanitized users:', sanitizedUsers);
      console.log('Total user count:', totalCount);
  
      return NextResponse.json({ topUsers: sanitizedUsers, totalCount });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

