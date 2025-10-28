import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const items = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, createdAt: true },
      take: 100,
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = (body?.title ?? '').trim();
    const content = (body?.content ?? '').toString();
    const category = (body?.category ?? 'news') as 'news' | 'activity' | 'announcement' | 'blog';

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const created = await prisma.post.create({
      data: { title, content, category },
      select: { id: true, title: true, category: true, createdAt: true },
    });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
