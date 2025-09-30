import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, User, Tag } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Prestasi Gemilang di Olimpiade Sains Nasional",
    excerpt: "Siswa kami berhasil meraih medali emas dalam Olimpiade Sains Nasional kategori Matematika dan Fisika.",
    category: "Prestasi",
    author: "Admin",
    date: "15 Januari 2025",
  },
  {
    id: 2,
    title: "Tips Belajar Efektif untuk Siswa",
    excerpt: "Metode belajar yang efektif dapat meningkatkan pemahaman dan prestasi akademik siswa.",
    category: "Pendidikan",
    author: "Ibu Sarah",
    date: "12 Januari 2025",
  },
  {
    id: 3,
    title: "Kegiatan Bakti Sosial di Panti Asuhan",
    excerpt: "Siswa-siswi kami mengadakan kegiatan bakti sosial untuk berbagi kebahagiaan dengan anak-anak panti asuhan.",
    category: "Kegiatan",
    author: "Admin",
    date: "10 Januari 2025",
  },
  {
    id: 4,
    title: "Pentingnya Pendidikan Karakter di Sekolah",
    excerpt: "Pendidikan karakter menjadi fondasi penting dalam membentuk kepribadian siswa yang berakhlak mulia.",
    category: "Artikel",
    author: "Pak Ahmad",
    date: "8 Januari 2025",
  },
  {
    id: 5,
    title: "Pentas Seni Akhir Tahun 2024",
    excerpt: "Pertunjukan seni spektakuler yang menampilkan berbagai bakat siswa dari musik, tari, hingga teater.",
    category: "Kegiatan",
    author: "Admin",
    date: "20 Desember 2024",
  },
  {
    id: 6,
    title: "Teknologi dalam Pembelajaran Modern",
    excerpt: "Pemanfaatan teknologi digital dalam proses pembelajaran untuk meningkatkan kualitas pendidikan.",
    category: "Teknologi",
    author: "Ibu Rina",
    date: "15 Desember 2024",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Berita</h1>
          <p className="text-xl text-red-100">
            Informasi terbaru seputar kegiatan, prestasi, dan artikel pendidikan
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Tag size={14} />
                    <span>{post.category}</span>
                  </div>
                  <CardTitle className="hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="link" className="px-0">
                      Baca Selengkapnya →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <Button variant="outline">Previous</Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
