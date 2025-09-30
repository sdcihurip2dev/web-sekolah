"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    title: "Selamat Datang di SekolahKu Digital",
    subtitle: "Membangun Generasi Cerdas, Berakhlak Mulia, dan Berprestasi",
    image: "bg-gradient-to-r from-red-600 to-red-800",
    cta1: { text: "Tentang Kami", href: "/about" },
    cta2: { text: "Hubungi Kami", href: "/contact" },
  },
  {
    title: "Pendidikan Berkualitas untuk Masa Depan Cerah",
    subtitle: "Kurikulum modern dengan pendekatan pembelajaran yang inovatif",
    image: "bg-gradient-to-r from-orange-600 to-red-700",
    cta1: { text: "Lihat Kegiatan", href: "/activities" },
    cta2: { text: "Daftar Sekarang", href: "/contact" },
  },
  {
    title: "Prestasi Gemilang di Berbagai Kompetisi",
    subtitle: "Siswa kami meraih berbagai penghargaan tingkat nasional dan internasional",
    image: "bg-gradient-to-r from-pink-600 to-red-700",
    cta1: { text: "Lihat Prestasi", href: "/about" },
    cta2: { text: "Bergabung", href: "/contact" },
  },
  {
    title: "Fasilitas Modern & Guru Profesional",
    subtitle: "Lingkungan belajar yang nyaman dengan tenaga pengajar berpengalaman",
    image: "bg-gradient-to-r from-red-700 to-rose-800",
    cta1: { text: "Baca Blog", href: "/blog" },
    cta2: { text: "Kontak Kami", href: "/contact" },
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className={`${slide.image} text-white py-20 md:py-32 relative`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Link href={slide.cta1.href}>
                      <Button size="lg" variant="secondary" className="shadow-lg">
                        {slide.cta1.text}
                      </Button>
                    </Link>
                    <Link href={slide.cta2.href}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-red-600 shadow-lg"
                      >
                        {slide.cta2.text}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 md:left-8" />
      <CarouselNext className="right-4 md:right-8" />
    </Carousel>
  );
}
