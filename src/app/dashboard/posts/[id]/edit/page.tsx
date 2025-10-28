"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("news");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Gagal memuat postingan');
        const data = await res.json();
        setTitle(data.title);
        setCategory(data.category);
        setContent(data.content);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`/api/posts/${id}` ,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, content }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Gagal memperbarui postingan');
      }
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/posts'), 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Postingan</h1>
        <p className="text-gray-600">Perbarui judul, kategori, dan isi konten</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Postingan</CardTitle>
          <CardDescription>Sesuaikan konten sesuai kebutuhan</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-gray-500">Memuat...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">Perubahan disimpan</div>
              )}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
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
                <RichTextEditor value={content} onChange={setContent} />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={saving || !title || !content}>
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push('/dashboard/posts')}>
                  Batal
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
