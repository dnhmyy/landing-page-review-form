"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";

const branches = [
    { name: "Roti Kebanggaan Sorrento", phone: "628112345678" },
    { name: "Roti Kebanggaan Beryl", phone: "628112345679" },
    { name: "Roti Kebanggaan Downtown", phone: "628112345680" },
    { name: "Roti Kebanggaan Greenlake", phone: "628112345681" },
    { name: "Roti Kebanggaan Kelapa Gading", phone: "628112345682" },
    { name: "Roti Kebanggaan Grand Indonesia", phone: "628112345683" },
];

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-12 h-12 relative">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo Roti Kebanggaan"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-black text-xl tracking-tight">
                                Roti Kebanggaan
                            </span>
                        </div>
                        <p className="text-white/60 leading-relaxed text-sm">
                            Artisan bakery since 2010. Dipanggang segar setiap pagi dengan
                            bahan premium pilihan — karena kualitas terbaik adalah
                            kebanggaan kami.
                        </p>
                    </div>

                    {/* Contact & Branches */}
                    <div id="contact">
                        <h4 className="font-black text-white/90 text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Contact & Branches
                        </h4>
                        <ul className="space-y-1.5">
                            {branches.map((b) => (
                                <li key={b.name}>
                                    <a
                                        href={`https://wa.me/${b.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/55 text-sm font-medium hover:text-white/90 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {b.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="font-black text-white/90 text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Opening Hours
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-white/60">
                                <span>Monday – Friday</span>
                                <span className="font-bold text-white/80">07:00 – 21:00</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Saturday</span>
                                <span className="font-bold text-white/80">07:00 – 22:00</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Sunday</span>
                                <span className="font-bold text-white/80">08:00 – 20:00</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-white/40 text-xs font-semibold">
                                Internal access
                            </p>
                            <Link
                                href="/admin/reviews"
                                className="text-white/30 text-xs hover:text-white/60 transition-colors"
                            >
                                Review Dashboard →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/35 text-sm">
                        © {new Date().getFullYear()} Roti Kebanggaan. All rights reserved.
                    </p>
                    <p className="text-white/25 text-xs">
                        Crafted with ❤️ in Jakarta
                    </p>
                </div>
            </div>
        </footer>
    );
}
