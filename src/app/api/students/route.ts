import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const items = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, class: true, parentContact: true, createdAt: true },
      take: 500,
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, class: className, parentContact } = await req.json();
    if (!name || !className) {
      return NextResponse.json({ error: 'name and class are required' }, { status: 400 });
    }

    const created = await prisma.student.create({
      data: { name, class: className, parentContact: parentContact ?? null },
      select: { id: true, name: true, class: true, parentContact: true, createdAt: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}
