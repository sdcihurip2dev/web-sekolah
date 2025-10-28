"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, FileText, Image } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type StatsResponse = {
  counts: { students: number; teachers: number; posts: number; gallery: number };
  recentPosts: { id: string; title: string; category: string; createdAt: string }[];
  chart: { name: string; posts: number }[];
};

export default function DashboardOverviewPage() {
  const [statsData, setStatsData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStatsData(data);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Selamat datang di admin dashboard SekolahKu Digital</p>
      </div>

      {loading && !statsData && (
        <div className="text-sm text-gray-500 mb-4">Memuat data...</div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {(() => {
          const cards = [
            { title: 'Total Siswa', value: statsData?.counts.students ?? '-', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: 'Total Guru', value: statsData?.counts.teachers ?? '-', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-100' },
            { title: 'Total Postingan', value: statsData?.counts.posts ?? '-', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
            { title: 'Galeri Foto', value: statsData?.counts.gallery ?? '-', icon: Image, color: 'text-yellow-600', bg: 'bg-yellow-100' },
          ];
          return cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{c.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${c.bg}`}>
                    <Icon className={`w-5 h-5 ${c.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{c.value}</div>
                </CardContent>
              </Card>
            );
          });
        })()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Postingan</CardTitle>
            <CardDescription>Jumlah postingan per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsData?.chart ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Postingan Terbaru</CardTitle>
            <CardDescription>Postingan yang baru dipublikasikan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(statsData?.recentPosts ?? []).map((post, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              ))}
              {(!statsData || statsData.recentPosts.length === 0) && (
                <div className="text-sm text-gray-500">Belum ada postingan</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
