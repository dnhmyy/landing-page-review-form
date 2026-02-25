"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
    { value: "6", label: "Cabang" },
    { value: "1750+", label: "Happy Customers" },
    { value: "8+", label: "Years Baking" },
    { value: "4.9★", label: "Avg. Rating" },
];

export function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20"
        >
            {/* ── Decorative accents ── */}
            <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-20">
                {/* ── Left column ── */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/10">
                            <Leaf className="w-4 h-4" />
                            Freshly Baked Every Morning
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
                        className="text-[3.5rem] lg:text-[5rem] font-black leading-[1.0] text-foreground mb-8 tracking-tighter"
                    >
                        Roti Kebanggaan.{" "}
                        <span className="italic text-primary font-extrabold">
                            Crafted with Passion.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
                        className="text-xl text-foreground/65 max-w-lg leading-relaxed mb-12"
                    >
                        Dibuat dengan bahan premium pilihan & dipanggang setiap pagi dengan
                        cinta. Taste the warmth in every bite — authentic artisan creations
                        for your daily joy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-wrap gap-5 mb-16"
                    >
                        <Link
                            href="#menu"
                            className="inline-flex items-center gap-2 h-14 px-10 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Explore Menu <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#about"
                            className="inline-flex items-center h-14 px-10 rounded-2xl border-2 border-primary text-primary font-bold text-lg hover:bg-primary/5 transition-all"
                        >
                            Our Story
                        </Link>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.55, ease: "easeOut" }}
                        className="grid grid-cols-4 gap-4"
                    >
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-2xl font-black text-primary">{s.value}</div>
                                <div className="text-xs text-foreground/45 font-semibold mt-0.5">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Right column — image ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] rounded-[44px] overflow-hidden shadow-2xl shadow-primary/10 border-[10px] border-white ring-1 ring-primary/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-50" />
                        <Image
                            src="/images/gambar1.png"
                            alt="Roti Kebanggaan — freshly baked artisan bread"
                            fill
                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                            quality={100}
                        />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl shadow-primary/10 border border-primary/10">
                        <div className="text-primary font-black text-3xl">4.9★</div>
                        <div className="text-foreground/50 text-xs font-semibold">
                            2,500+ reviews
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
