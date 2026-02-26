"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight, Briefcase, Heart, TrendingUp, Gift, DollarSign } from "lucide-react";
import { positions } from "@/lib/jobs";

const benefits = [
    { id: 1, title: "Friendly Work Environment", icon: Heart },
    { id: 2, title: "Career Growth Opportunities", icon: TrendingUp },
    { id: 3, title: "Staff Discount", icon: Gift },
    { id: 4, title: "Competitive Salary", icon: DollarSign },
];

export default function CareersPage() {
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
                        <span className="text-white/70">Careers</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                Join Our Team
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Let&apos;s make happiness together
                            </p>
                            <div className="mt-6 w-16 h-1 rounded-full bg-accent/60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-12 px-6 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-black text-foreground">Why Join Us</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={benefit.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="bg-white rounded-[20px] p-5 flex flex-col items-center text-center border border-primary/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-foreground text-sm">{benefit.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-black text-foreground mb-3">Open Positions</h2>
                        <p className="text-foreground/50">Temukan peran yang cocok untuk Anda di tim kami.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {positions.map((pos, i) => (
                            <motion.div
                                key={pos.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group flex flex-col h-full bg-white rounded-[20px] md:rounded-[24px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 p-4 md:p-8"
                            >
                                <div className="flex items-start justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <span className="bg-primary/5 text-primary text-[9px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">
                                        {pos.type}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-2xl font-black text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors">
                                    {pos.title}
                                </h3>
                                <p className="hidden md:block text-foreground/60 leading-relaxed mb-6 flex-1 text-sm">
                                    {pos.shortDesc}
                                </p>
                                <Link
                                    href={`/careers/${pos.slug}`}
                                    className="w-fit flex items-center gap-1 md:gap-2 px-4 md:px-8 py-2.5 md:py-3.5 rounded-xl bg-primary text-white font-bold text-xs md:text-sm shadow-md shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Lihat Detail <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
