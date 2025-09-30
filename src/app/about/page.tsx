import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-xl text-red-100">
            Mengenal lebih dekat SekolahKu Digital
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Sejarah Sekolah</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg mb-4">
              SekolahKu Digital didirikan pada tahun 2000 dengan visi menjadi lembaga pendidikan terdepan yang menghasilkan generasi cerdas, berakhlak mulia, dan berprestasi. Selama lebih dari dua dekade, kami telah melayani ribuan siswa dan menghasilkan lulusan yang sukses di berbagai bidang.
            </p>
            <p className="text-gray-600 text-lg">
              Dengan fasilitas modern dan tenaga pengajar profesional, kami terus berinovasi dalam metode pembelajaran untuk memastikan setiap siswa mendapatkan pendidikan terbaik.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Eye className="w-12 h-12 text-red-600 mb-4" />
                <CardTitle className="text-2xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Menjadi lembaga pendidikan unggulan yang menghasilkan generasi cerdas, berakhlak mulia, berprestasi, dan siap menghadapi tantangan global.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle className="text-2xl">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Menyelenggarakan pendidikan berkualitas tinggi</li>
                  <li>Mengembangkan karakter dan akhlak mulia siswa</li>
                  <li>Memfasilitasi pengembangan bakat dan minat siswa</li>
                  <li>Menerapkan teknologi dalam proses pembelajaran</li>
                  <li>Membangun kerjasama dengan berbagai pihak</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Prestasi Kami</h2>
            <p className="text-gray-600 text-lg">
              Berbagai penghargaan yang telah diraih
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { year: "2024", title: "Juara 1 Olimpiade Matematika Nasional" },
              { year: "2023", title: "Sekolah Adiwiyata Tingkat Provinsi" },
              { year: "2023", title: "Juara 2 Lomba Karya Ilmiah Remaja" },
              { year: "2022", title: "Sekolah Sehat Tingkat Nasional" },
              { year: "2022", title: "Juara 1 Kompetisi Robotika Regional" },
              { year: "2021", title: "Akreditasi A dari BAN-S/M" },
            ].map((achievement, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="text-red-600 font-bold text-lg mb-2">
                    {achievement.year}
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Kepala Sekolah</h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Drs. Ahmad Suryanto, M.Pd</h3>
                  <p className="text-gray-600 mb-4">Kepala Sekolah</p>
                  <p className="text-gray-600">
                    &quot;Pendidikan adalah investasi terbaik untuk masa depan. Kami berkomitmen untuk memberikan pendidikan berkualitas yang tidak hanya mengembangkan kecerdasan intelektual, tetapi juga membentuk karakter dan akhlak mulia siswa.&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
