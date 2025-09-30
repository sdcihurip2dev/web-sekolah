"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, FileText, Image } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", posts: 12 },
  { name: "Feb", posts: 19 },
  { name: "Mar", posts: 15 },
  { name: "Apr", posts: 25 },
  { name: "May", posts: 22 },
  { name: "Jun", posts: 30 },
];

const stats = [
  {
    title: "Total Siswa",
    value: "1,234",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Guru",
    value: "56",
    icon: GraduationCap,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Postingan",
    value: "123",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Galeri Foto",
    value: "456",
    icon: Image,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
];

const recentPosts = [
  { title: "Prestasi Olimpiade Sains", date: "15 Jan 2025", category: "Prestasi" },
  { title: "Kegiatan Bakti Sosial", date: "12 Jan 2025", category: "Kegiatan" },
  { title: "Tips Belajar Efektif", date: "10 Jan 2025", category: "Artikel" },
  { title: "Pentas Seni Akhir Tahun", date: "8 Jan 2025", category: "Kegiatan" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Selamat datang di admin dashboard SekolahKu Digital</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
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
              <BarChart data={data}>
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
              {recentPosts.map((post, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
