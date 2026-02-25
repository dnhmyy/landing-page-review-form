"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { positions } from "@/lib/jobs";
import { ChevronRight, Briefcase, CheckCircle2, ClipboardList } from "lucide-react";

export default function JobDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const job = positions.find(p => p.slug === slug);

    if (!job) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 pb-20 text-center px-6">
                    <h1 className="text-3xl font-black text-foreground mb-4">Posisi tidak ditemukan</h1>
                    <Link href="/careers" className="text-primary font-bold hover:underline">← Kembali ke Careers</Link>
                </div>
                <Footer />
            </main>
        );
    }

    const handleApply = () => {
        const email = "hr@rotikebanggaan.com";
        const subject = encodeURIComponent(`Job Application - ${job.title}`);
        const body = encodeURIComponent(`Hello, I would like to apply for the position of ${job.title}.`);
        window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
    };

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
                        <Link href="/careers" className="hover:text-white/70 transition-colors">Careers</Link>
                        <span>/</span>
                        <span className="text-white/70">{job.title}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <span className="bg-white/10 text-white/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    {job.type}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                {job.title}
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                {job.description}
                            </p>
                            <div className="mt-6 w-16 h-1 rounded-full bg-accent/60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto space-y-10">

                    {/* Responsibilities */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-black text-foreground">Tanggung Jawab</h2>
                        </div>
                        <div className="bg-white rounded-[20px] p-6 border border-primary/5 shadow-sm">
                            <ul className="space-y-3">
                                {job.responsibilities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-foreground/70 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Requirements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-black text-foreground">Persyaratan</h2>
                        </div>
                        <div className="bg-white rounded-[20px] p-6 border border-primary/5 shadow-sm">
                            <ul className="space-y-3">
                                {job.requirements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-foreground/70 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Apply Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="pt-4"
                    >
                        <button
                            onClick={handleApply}
                            className="w-full py-4 bg-primary text-white text-xl font-black rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Apply Now <ChevronRight className="w-6 h-6" />
                        </button>
                        <p className="text-center text-foreground/30 text-xs mt-3">
                            Klik tombol di atas untuk mengirim lamaran via email
                        </p>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
