import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const items = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, subject: true, role: true, createdAt: true },
      take: 500,
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, role } = await req.json();
    if (!name || !email || !subject) {
      return NextResponse.json({ error: 'name, email, and subject are required' }, { status: 400 });
    }

    const created = await prisma.teacher.create({
      data: { name, email, subject, role: role ?? 'teacher' },
      select: { id: true, name: true, email: true, subject: true, role: true, createdAt: true },
    });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}
