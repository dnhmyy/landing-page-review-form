"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { MapPin } from "lucide-react";

const branchesLocation = [
    {
        id: 1,
        name: "Roti Kebanggaan Sorrento",
        address: "Gading Serpong, Tangerang",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 2,
        name: "Roti Kebanggaan Beryl",
        address: "Gading Serpong, Tangerang",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 3,
        name: "Roti Kebanggaan Downtown",
        address: "Alam Sutera, Tangerang",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 4,
        name: "Roti Kebanggaan Greenlake",
        address: "Green Lake City, Tangerang",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 5,
        name: "Roti Kebanggaan Kelapa Gading",
        address: "Kelapa Gading, Jakarta",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 6,
        name: "Roti Kebanggaan Grand Indonesia",
        address: "Menteng, Jakarta",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
];

export default function LocationPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-semibold mb-6 tracking-wide uppercase">
                        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/70">Location</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                Our Locations
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Find the nearest branch and visit us today
                            </p>
                            <div className="mt-6 w-16 h-1 rounded-full bg-accent/60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Branch Section */}
            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.04 } }
                        }}
                        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6"
                    >
                        {branchesLocation.map((branch) => (
                            <motion.a
                                key={branch.id}
                                href={branch.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="group flex flex-col h-full bg-white rounded-[16px] md:rounded-[24px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            >
                                <div className="relative shrink-0 aspect-[4/3] w-full overflow-hidden bg-muted/10 flex items-center justify-center p-4">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={branch.image}
                                            alt={branch.name}
                                            fill
                                            className="object-contain group-hover:scale-110 transition-transform duration-700"
                                            quality={90}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                                        />
                                    </div>
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                        <span className="bg-white/90 backdrop-blur-md text-primary font-black text-[7px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full shadow-sm flex items-center gap-1">
                                            <MapPin className="w-2 h-2 md:w-3 md:h-3" /> Map
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 md:p-5 flex flex-col flex-1">
                                    <h3 className="text-sm md:text-xl font-black text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-1">
                                        {branch.name}
                                    </h3>
                                    <p className="hidden md:block text-foreground/50 text-xs leading-relaxed mb-2 line-clamp-2 italic flex-1">
                                        {branch.address}
                                    </p>
                                    <div className="mt-auto pt-2 md:pt-3 border-t border-muted/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-black text-sm md:text-sm">
                                                {branch.hours}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
