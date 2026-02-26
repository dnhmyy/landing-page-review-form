"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
    { value: "20+", label: "Varian Rasa" },
    { value: "1275+", label: "Real Reviews" },
    { value: "2018", label: "Est. Year" },
    { value: "4.7★", label: "Avg. Rating" },
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

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center pt-8 pb-20">
                {/* ── Left column ── */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/10">
                            <Leaf className="w-4 h-4" />
                            Freshly Baked Every Morning
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-bold border border-emerald-500/10 shadow-sm">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="currentColor" fillOpacity="0.1" />
                            </svg>
                            100% Halal Certified
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0, ease: "easeOut" }}
                        className="text-[3.5rem] lg:text-[4.5rem] font-black leading-[1.0] text-foreground mb-8 tracking-tighter"
                    >
                        #Roti Kebanggaan <br />
                        <span className="italic text-primary font-extrabold text-[3rem] lg:text-[4rem]">
                            Gading Serpong.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
                        className="text-xl text-foreground/65 max-w-lg leading-relaxed mb-12"
                    >
                        Legenda "Hidden Gem" terlembut yang membuat Gading Serpong rela mengantre.
                        Roti klasik berisian melimpah, dipanggang fresh from the oven, menggunakan premium ingredients tanpa pengawet (no preservatives added).
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
                                <div className="text-xs text-foreground/70 font-semibold mt-0.5">
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
                    transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] rounded-[44px] overflow-hidden shadow-2xl shadow-primary/10 border-[10px] border-white ring-1 ring-primary/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-50" />
                        <Image
                            src="/images/gambar1.webp"
                            alt="Roti Kebanggaan — freshly baked artisan bread"
                            fill
                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 700px, 1000px"
                            quality={85}
                        />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl shadow-primary/10 border border-primary/10">
                        <div className="text-primary font-black text-3xl">4.7★</div>
                        <div className="text-foreground/50 text-xs font-semibold">
                            1.275+ reviews
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
