import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rotikebanggaan.com"),
  title: "Roti Kebanggaan Gading Serpong - Roti Jadul Hidden Gem Lembut & Fresh",
  description: "Menemukan kebahagiaan dalam kelembutan Roti Kebanggaan Gading Serpong. Legenda roti jadul hidden gem sejak 2018 dengan isian melimpah—fresh from the oven, 100% Halal Certified, made with premium ingredients and no preservatives added!",
  openGraph: {
    title: "Roti Kebanggaan Gading Serpong - Roti Jadul Hidden Gem Lembut & Fresh",
    description: "Merasakan nostalgia di setiap gigitan roti jadul terlembut di Gading Serpong—fresh from the oven, made with premium ingredients and no preservatives added.",
    type: "website",
    url: "https://rotikebanggaan.com",
    images: [
      {
        url: "/images/gambar1.png",
        width: 1200,
        height: 630,
        alt: "Hero Roti Kebanggaan",
      },
    ],
  },
  alternates: {
    canonical: "https://rotikebanggaan.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
