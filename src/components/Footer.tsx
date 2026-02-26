"use client";

import Link from "next/link";
import { MapPin, Clock, Instagram } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

import { branches } from "@/lib/branches";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.21, 1, 0.36, 1] }}
                className="max-w-7xl mx-auto px-6 py-12"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1 & 2: Brand Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 relative flex-shrink-0">
                                <Image
                                    src="/images/logo.webp"
                                    alt="Logo Roti Kebanggaan"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100px, 120px"
                                    quality={85}
                                />
                            </div>
                            <span className="font-black text-xl tracking-tight leading-tight">
                                Roti Kebanggaan <br /> Gading Serpong
                            </span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-sm max-w-md">
                            Legenda roti jadul terlembut di Gading Serpong sejak 2018.
                            Dipanggang fresh from the oven setiap pagi dengan premium ingredients dan tanpa pengawet (no preservatives added) untuk rasa yang membangkitkan nostalgia.
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <h4 className="font-bold text-white/40 text-[10px] uppercase tracking-widest">Follow us</h4>
                            <div className="h-px w-8 bg-white/10" />
                            <a
                                href="https://www.instagram.com/rotikebanggaanofficial/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on Instagram"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:scale-110 transition-all duration-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Branches */}
                    <div id="contact">
                        <h4 className="font-black text-white/90 text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            Branches
                        </h4>
                        <ul className="space-y-3">
                            {branches.map((b) => (
                                <li key={b.name}>
                                    <a
                                        href={`https://wa.me/${b.wa}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/50 text-sm font-medium hover:text-white transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all" />
                                        {b.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Hours */}
                    <div>
                        <h4 className="font-black text-white/90 text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent" />
                            Opening Hours
                        </h4>
                        <div className="space-y-5 text-sm">
                            <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-wider">All Outlets</span>
                                <div className="flex justify-between items-baseline text-white/60">
                                    <span className="text-xs">Open Daily</span>
                                    <span className="font-black text-white/90">07:00 – 21:00</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-wider">Mall Kelapa Gading</span>
                                <div className="flex justify-between items-baseline text-white/60">
                                    <span className="text-xs">Open Daily</span>
                                    <span className="font-black text-white/90">07:00 – 22:00</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-wider">Mall Grand Indonesia</span>
                                <div className="flex justify-between items-baseline text-white/60">
                                    <span className="text-xs">Open Daily</span>
                                    <span className="font-black text-white/90">09:00 – 22:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internal Dashboard Link (Discrete) */}
                <div className="mb-12 flex justify-start">
                    <Link
                        href="/admin/reviews"
                        className="text-[10px] text-white/10 hover:text-white/30 transition-colors uppercase tracking-widest font-bold border border-white/5 px-3 py-1 rounded-md"
                    >
                        Review Dashboard →
                    </Link>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/35 text-sm">
                        © {new Date().getFullYear()} Roti Kebanggaan. All rights reserved.
                    </p>
                    <p className="text-white/25 text-xs">
                        Powered by DnnTech
                    </p>
                </div>
            </motion.div>
        </footer>
    );
}
