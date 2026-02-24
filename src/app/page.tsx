import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Roti Kebanggaan",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200",
    "@id": "https://rotikebanggaan.com",
    "url": "https://rotikebanggaan.com",
    "telephone": "+622112345678",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gading Serpong",
      "addressLocality": "Tangerang",
      "postalCode": "15810",
      "addressCountry": "ID"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2500"
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <About />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
