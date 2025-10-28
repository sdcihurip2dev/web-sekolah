import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const item = await prisma.teacher.findUnique({
      where: { id: id },
      select: { id: true, name: true, email: true, subject: true, role: true, createdAt: true },
    });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch teacher' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const { name, email, subject, role } = await req.json();
    const updated = await prisma.teacher.update({
      where: { id: id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(subject !== undefined ? { subject } : {}),
        ...(role !== undefined ? { role } : {}),
      },
      select: { id: true, name: true, email: true, subject: true, role: true, createdAt: true },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    await prisma.teacher.delete({ where: { id: id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 });
  }
}
