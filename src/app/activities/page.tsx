import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Palette, Trophy, Code, Book, Heart } from "lucide-react";

const activities = [
  {
    icon: Music,
    title: "Musik dan Seni",
    description: "Paduan suara, band, tari tradisional, dan seni rupa",
    color: "text-purple-600",
  },
  {
    icon: Trophy,
    title: "Olahraga",
    description: "Sepak bola, basket, bulu tangkis, renang, dan atletik",
    color: "text-red-600",
  },
  {
    icon: Code,
    title: "Teknologi",
    description: "Robotika, coding, desain grafis, dan multimedia",
    color: "text-orange-600",
  },
  {
    icon: Book,
    title: "Akademik",
    description: "Olimpiade sains, matematika, bahasa, dan karya ilmiah",
    color: "text-yellow-600",
  },
  {
    icon: Palette,
    title: "Kreativitas",
    description: "Teater, jurnalistik, fotografi, dan sinematografi",
    color: "text-pink-600",
  },
  {
    icon: Heart,
    title: "Sosial",
    description: "PMR, Pramuka, relawan lingkungan, dan bakti sosial",
    color: "text-red-600",
  },
];

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kegiatan Sekolah</h1>
          <p className="text-xl text-red-100">
            Berbagai kegiatan dan ekstrakurikuler untuk mengembangkan bakat siswa
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ekstrakurikuler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className={`w-12 h-12 ${activity.color} mb-4`} />
                    <CardTitle>{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {activity.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Kegiatan Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Lomba Sains Tingkat Provinsi",
                date: "15 Januari 2025",
                description: "Siswa kami meraih juara 1 dalam Olimpiade Sains Nasional tingkat provinsi kategori Matematika dan Fisika.",
              },
              {
                title: "Pentas Seni Akhir Tahun",
                date: "20 Desember 2024",
                description: "Pertunjukan seni yang menampilkan berbagai bakat siswa dari paduan suara, tari, hingga drama.",
              },
              {
                title: "Bakti Sosial ke Panti Asuhan",
                date: "10 Desember 2024",
                description: "Kegiatan sosial yang melibatkan siswa dalam berbagi dengan sesama dan peduli terhadap lingkungan.",
              },
              {
                title: "Kompetisi Robotika Regional",
                date: "5 Desember 2024",
                description: "Tim robotika sekolah berhasil masuk final dan meraih juara 2 dalam kompetisi robotika tingkat regional.",
              },
            ].map((event, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Jadwal Ekstrakurikuler</h2>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { day: "Senin", activities: "Pramuka, Robotika" },
                  { day: "Selasa", activities: "Musik, Basket" },
                  { day: "Rabu", activities: "Tari, Coding" },
                  { day: "Kamis", activities: "PMR, Sepak Bola" },
                  { day: "Jumat", activities: "Teater, Bulu Tangkis" },
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                    <span className="font-semibold text-lg">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.activities}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
