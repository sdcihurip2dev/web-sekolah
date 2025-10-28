"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("news");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, content }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Gagal membuat postingan');
      }
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/posts'), 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Buat Postingan</h1>
        <p className="text-gray-600">Tulis artikel, berita, atau pengumuman baru</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Postingan Baru</CardTitle>
          <CardDescription>Lengkapi judul, kategori, dan isi konten</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                Postingan berhasil dibuat
              </div>
            )}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                <option value="news">Berita</option>
                <option value="blog">Blog</option>
                <option value="activity">Kegiatan</option>
                <option value="announcement">Pengumuman</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Konten</Label>
              <RichTextEditor value={content} onChange={setContent} placeholder="Tulis konten di sini..." />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading || !title || !content}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/dashboard/posts')}>
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
