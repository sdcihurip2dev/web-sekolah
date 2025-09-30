"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const galleryItems = [
  { id: 1, title: "Upacara Bendera", date: "2025-01-15" },
  { id: 2, title: "Kegiatan Olahraga", date: "2025-01-12" },
  { id: 3, title: "Lomba Sains", date: "2025-01-10" },
  { id: 4, title: "Pentas Seni", date: "2024-12-20" },
  { id: 5, title: "Bakti Sosial", date: "2024-12-15" },
  { id: 6, title: "Kunjungan Museum", date: "2024-12-10" },
  { id: 7, title: "Pelatihan Guru", date: "2024-12-05" },
  { id: 8, title: "Wisuda Siswa", date: "2024-11-30" },
];

export default function GalleryPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manajemen Galeri</h1>
        <p className="text-gray-600">Kelola foto dan dokumentasi kegiatan sekolah</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Galeri Foto</CardTitle>
              <CardDescription>Total {galleryItems.length} foto</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Foto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
