"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

type PostRow = { id: string; title: string; category: string; createdAt: string };

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    const colors = {
      news: "bg-blue-100 text-blue-600",
      blog: "bg-purple-100 text-purple-600",
      activity: "bg-green-100 text-green-600",
      announcement: "bg-yellow-100 text-yellow-600",
    };
    return colors[category as keyof typeof colors] || colors.news;
  };

  // status column removed; using createdAt only

  async function deletePost(id: string) {
    if (!confirm('Hapus postingan ini?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manajemen Postingan</h1>
        <p className="text-gray-600">Kelola artikel, berita, dan pengumuman</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Daftar Postingan</CardTitle>
              <CardDescription>Total {posts.length} postingan</CardDescription>
            </div>
            <Link href="/dashboard/posts/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Buat Postingan
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="text-sm text-gray-500 mb-4">Memuat data...</div>
          )}
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari judul postingan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">Semua Kategori</option>
              <option value="news">Berita</option>
              <option value="blog">Blog</option>
              <option value="activity">Kegiatan</option>
              <option value="announcement">Pengumuman</option>
            </select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryBadge(post.category)}`}>
                      {post.category}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/posts/${post.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPosts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada postingan yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
