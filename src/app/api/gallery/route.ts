import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const items = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      take: 24,
      select: { id: true, title: true, imageUrl: true, createdAt: true },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, imageUrl } = await req.json();
    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
    }

    const created = await prisma.gallery.create({
      data: { title: title ?? null, imageUrl },
      select: { id: true, title: true, imageUrl: true, createdAt: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
