import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const item = await prisma.post.findUnique({
      where: { id: id },
      select: { id: true, title: true, content: true, category: true, createdAt: true },
    });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const { title, content, category } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    const updated = await prisma.post.update({
      where: { id: id },
      data: { title, content, category },
      select: { id: true, title: true, content: true, category: true, createdAt: true },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    await prisma.post.delete({ where: { id: id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
