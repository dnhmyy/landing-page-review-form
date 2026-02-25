import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Roti Kebanggaan Gading Serpong - Toko roti terbaik di Tangerang | Fresh Setiap Hari",
  description: "Rasakan keaslian seni memanggang roti artisan. Sourdough buatan tangan, pastri segar, dan teknik tradisional. Pesan sekarang untuk kesegaran harian.",
  openGraph: {
    title: "Roti Kebanggaan Gading Serpong - Toko roti terbaik di Tangerang | Fresh Setiap Hari",
    description: "Momen berharga di setiap gigitan roti buatan tangan kami.",
    type: "website",
    url: "https://rotikebanggaan.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Hero Roti Kebanggaan",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent selection:text-white font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
