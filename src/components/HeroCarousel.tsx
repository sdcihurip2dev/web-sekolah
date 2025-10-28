"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const defaultSlides = [
  {
    title: "Selamat Datang di SekolahKu Digital",
    subtitle: "Membangun Generasi Cerdas, Berakhlak Mulia, dan Berprestasi",
    gradient: "bg-gradient-to-r from-red-600 to-red-800",
    cta1: { text: "Tentang Kami", href: "/about" },
    cta2: { text: "Hubungi Kami", href: "/contact" },
  },
  {
    title: "Pendidikan Berkualitas untuk Masa Depan Cerah",
    subtitle: "Kurikulum modern dengan pendekatan pembelajaran yang inovatif",
    gradient: "bg-gradient-to-r from-orange-600 to-red-700",
    cta1: { text: "Lihat Kegiatan", href: "/activities" },
    cta2: { text: "Daftar Sekarang", href: "/contact" },
  },
  {
    title: "Prestasi Gemilang di Berbagai Kompetisi",
    subtitle: "Siswa kami meraih berbagai penghargaan tingkat nasional dan internasional",
    gradient: "bg-gradient-to-r from-pink-600 to-red-700",
    cta1: { text: "Lihat Prestasi", href: "/about" },
    cta2: { text: "Bergabung", href: "/contact" },
  },
  {
    title: "Fasilitas Modern & Guru Profesional",
    subtitle: "Lingkungan belajar yang nyaman dengan tenaga pengajar berpengalaman",
    gradient: "bg-gradient-to-r from-red-700 to-rose-800",
    cta1: { text: "Baca Blog", href: "/blog" },
    cta2: { text: "Kontak Kami", href: "/contact" },
  },
];

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
}

type SlideData = typeof defaultSlides[0] | GalleryImage;

export function HeroCarousel() {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/carousel');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    }

    fetchImages();
  }, []);

  // Use real images if available, otherwise use default gradient slides
  const hasImages = images.length > 0;
  const slides: SlideData[] = hasImages ? images : defaultSlides;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => {
          const isImageSlide = hasImages && 'imageUrl' in slide;
          const defaultSlide = defaultSlides[index % defaultSlides.length];

          return (
            <CarouselItem key={isImageSlide ? slide.id : index}>
              <div className="relative text-white py-20 md:py-32 overflow-hidden">
                {/* Background Image or Gradient */}
                {isImageSlide ? (
                  <>
                    <Image
                      src={(slide as GalleryImage).imageUrl}
                      alt={(slide as GalleryImage).title || `Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40" />
                  </>
                ) : (
                  <div className={`absolute inset-0 ${(slide as typeof defaultSlides[0]).gradient}`} />
                )}

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-lg">
                      {isImageSlide ? ((slide as GalleryImage).title || defaultSlide.title) : (slide as typeof defaultSlides[0]).title}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 drop-shadow-md">
                      {defaultSlide.subtitle}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Link href={defaultSlide.cta1.href}>
                        <Button size="lg" variant="secondary" className="shadow-lg">
                          {defaultSlide.cta1.text}
                        </Button>
                      </Link>
                      <Link href={defaultSlide.cta2.href}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-transparent text-white border-white hover:bg-white hover:text-red-600 shadow-lg"
                        >
                          {defaultSlide.cta2.text}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4 md:left-8" />
      <CarouselNext className="right-4 md:right-8" />
    </Carousel>
  );
}
