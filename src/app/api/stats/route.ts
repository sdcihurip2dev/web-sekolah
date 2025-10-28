import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

export async function GET() {
  try {
    const [students, teachers, posts, gallery] = await Promise.all([
      prisma.student.count(),
      prisma.user.count({ where: { role: 'teacher' } }),
      prisma.post.count(),
      prisma.gallery.count(),
    ]);

    const now = new Date();
    const start = new Date(now);
    start.setMonth(start.getMonth() - 5);
    start.setDate(1);

    const recentPosts = await prisma.post.findMany({
      where: { createdAt: { gte: start } },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, createdAt: true },
      take: 24,
    });

    const months: { name: string; key: string }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthKey(d);
      const name = d.toLocaleString('id-ID', { month: 'short' });
      months.push({ name, key });
    }

    const postsByMonth: Record<string, number> = {};
    for (const m of months) postsByMonth[m.key] = 0;
    for (const p of recentPosts) {
      const key = monthKey(new Date(p.createdAt));
      if (key in postsByMonth) postsByMonth[key]++;
    }

    const chart = months.map(m => ({ name: m.name, posts: postsByMonth[m.key] }));

    return NextResponse.json({
      counts: { students, teachers, posts, gallery },
      recentPosts,
      chart,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}
