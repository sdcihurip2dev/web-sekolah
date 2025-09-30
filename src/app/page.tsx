import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Trophy, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Keunggulan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="w-12 h-12 text-red-600 mb-4" />
                <CardTitle>Kurikulum Berkualitas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Kurikulum yang disesuaikan dengan standar nasional dan internasional
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Guru Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tenaga pengajar berpengalaman dan bersertifikat profesional
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="w-12 h-12 text-yellow-600 mb-4" />
                <CardTitle>Prestasi Gemilang</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Berbagai prestasi di tingkat lokal, nasional, dan internasional
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="w-12 h-12 text-pink-600 mb-4" />
                <CardTitle>Kegiatan Beragam</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ekstrakurikuler dan kegiatan yang mengembangkan bakat siswa
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Berita Terbaru</h2>
            <Link href="/blog">
              <Button variant="outline">Lihat Semua</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <CardTitle>Berita Sekolah {i}</CardTitle>
                  <CardDescription>12 Januari 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <Link href={`/blog/${i}`}>
                    <Button variant="link" className="px-0 mt-2">
                      Baca Selengkapnya →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Kami</h2>
          <p className="text-xl mb-8 text-red-100">
            Daftarkan putra-putri Anda untuk masa depan yang lebih cerah
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Hubungi Kami Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
