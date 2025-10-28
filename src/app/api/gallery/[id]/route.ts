import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const gallery = await prisma.gallery.findUnique({ where: { id } });
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }
    return NextResponse.json(gallery);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, {params} : { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.gallery.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
