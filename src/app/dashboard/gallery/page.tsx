"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import NextImage from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type GalleryItem = {
  id: string;
  title: string | null;
  imageUrl: string;
  createdAt: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function fetchItems() {
    const res = await fetch('/api/gallery');
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.onload = () => {
          const maxWidth = 1920;
          const scale = Math.min(1, maxWidth / img.width);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas not supported'));
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Failed to compress'));
            resolve(blob);
          }, 'image/webp', 0.8);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const blob = await compressImage(file);
      const safeName = file.name.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9_.-]/g, '');
      const path = `gallery/${Date.now()}-${safeName.replace(/\.[^.]+$/, '')}.webp`;
      const { error: uploadError } = await supabase.storage.from('gallery').upload(path, blob, {
        contentType: 'image/webp',
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from('gallery').getPublicUrl(path);
      const imageUrl = pub?.publicUrl;
      if (!imageUrl) throw new Error('Failed to get public URL');

      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: file.name, imageUrl }),
      });

      await fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manajemen Galeri</h1>
        <p className="text-gray-600">Kelola foto dan dokumentasi kegiatan sekolah</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📸 Info Carousel Hero</h3>
        <p className="text-sm text-blue-800">
          4 foto terbaru yang Anda upload akan otomatis ditampilkan di carousel hero halaman utama. 
          Jika belum ada foto, akan ditampilkan placeholder warna sebagai default.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Galeri Foto</CardTitle>
              <CardDescription>Total {items.length} foto (4 terbaru untuk carousel)</CardDescription>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button onClick={openFilePicker} disabled={uploading}>
                <Plus className="w-4 h-4 mr-2" />
                {uploading ? 'Mengunggah...' : 'Upload Foto'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <Card key={item.id} className="overflow-hidden group">
                <Dialog>
                  <div className="relative">
                    <DialogTrigger asChild>
                      <button className="h-48 relative bg-gray-100 w-full">
                        <NextImage src={item.imageUrl} alt={item.title || 'Foto'} fill className="object-cover" />
                      </button>
                    </DialogTrigger>
                    {index < 4 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Carousel #{index + 1}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-1">{item.title || 'Tanpa judul'}</h3>
                    <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                  </CardContent>
                  <DialogContent className="max-w-5xl p-0 bg-black/90">
                    <div className="relative w-[90vw] max-w-5xl h-[70vh]">
                      <NextImage src={item.imageUrl} alt={item.title || 'Foto'} fill className="object-contain" />
                    </div>
                    <div className="px-6 py-4 text-white">
                      <h4 className="font-semibold">{item.title || 'Tanpa judul'}</h4>
                      <p className="text-sm text-white/70">{new Date(item.createdAt).toLocaleString('id-ID')}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
