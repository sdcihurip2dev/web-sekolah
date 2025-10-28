import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const item = await prisma.student.findUnique({
      where: { id: id },
      select: { id: true, name: true, class: true, parentContact: true, createdAt: true },
    });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params:   Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const { name, class: className, parentContact } = await req.json();
    const updated = await prisma.student.update({
      where: { id: id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(className !== undefined ? { class: className } : {}),
        ...(parentContact !== undefined ? { parentContact } : {}),
      },
      select: { id: true, name: true, class: true, parentContact: true, createdAt: true },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    await prisma.student.delete({ where: { id: id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
